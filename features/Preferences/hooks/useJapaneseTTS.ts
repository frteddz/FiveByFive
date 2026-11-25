'use client';
import { useCallback, useState, useEffect, useRef } from 'react';
import { useAudioPreferences } from '@/features/Preferences';

// This hook used to be Japanese TTS; it now reads plain Latin text with en-US voices.

interface EnglishVoice {
  name: string;
  lang: string;
  voice: SpeechSynthesisVoice;
}

interface TTSState {
  isPlaying: boolean;
  isSupported: boolean;
  availableVoices: EnglishVoice[];
  currentVoice: EnglishVoice | null;
  hasJapaneseVoices: boolean;
}

const isEnUsVoice = (voice: SpeechSynthesisVoice) =>
  voice.lang === 'en-US' || voice.lang.startsWith('en-US-');

const toEnglishVoice = (voice: SpeechSynthesisVoice): EnglishVoice => ({
  name: voice.name,
  lang: voice.lang,
  voice,
});

const sortVoices = (a: EnglishVoice, b: EnglishVoice) =>
  a.name.localeCompare(b.name);

export const useJapaneseTTS = () => {
  const {
    pronunciationEnabled,
    pronunciationVoiceName,
    setPronunciationVoiceName,
  } = useAudioPreferences();
  const [state, setState] = useState<TTSState>({
    isPlaying: false,
    isSupported: false,
    availableVoices: [],
    currentVoice: null,
    hasJapaneseVoices: false,
  });

  // Use ref to store current voice for access in callbacks without stale closures
  const currentVoiceRef = useRef<EnglishVoice | null>(null);
  const speakRequestIdRef = useRef(0);

  // Update ref whenever currentVoice changes
  useEffect(() => {
    currentVoiceRef.current = state.currentVoice;
  }, [state.currentVoice]);

  // SSR-safe check for browser environment
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Detect Firefox for special handling
  const isFirefox = useRef(false);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      isFirefox.current = /Firefox/i.test(navigator.userAgent);
    }
  }, []);

  // Check browser support and load voices
  useEffect(() => {
    if (!isClient || !('speechSynthesis' in window)) return;

    // Assume TTS is supported in modern browsers
    const isSupported = true;

    if (isSupported) {
      // Load voices when they become available
      const loadVoices = () => {
        const voices = speechSynthesis.getVoices();

        // Firefox sometimes returns empty array initially, skip if so
        if (voices.length === 0) return;

        const englishVoices = voices
          .filter(isEnUsVoice)
          .map(toEnglishVoice)
          .sort(sortVoices);

        // Choose current voice by preference if available
        const preferred = pronunciationVoiceName
          ? englishVoices.find(v => v.name === pronunciationVoiceName) || null
          : null;

        const newCurrentVoice = preferred || englishVoices[0] || null;

        setState((prev: TTSState) => ({
          ...prev,
          isSupported: true,
          availableVoices: englishVoices,
          currentVoice: newCurrentVoice,
          hasJapaneseVoices: englishVoices.length > 0,
        }));

        // Update ref immediately to avoid race conditions
        currentVoiceRef.current = newCurrentVoice;

        // Fallback: if no en-US voices are available, use any voice
        if (voices.length > 0 && englishVoices.length === 0) {
          console.warn(
            'No en-US voices found. Using fallback voice. Pronunciation may not be accurate.',
          );
          const fallbackVoice = toEnglishVoice(voices[0]);
          setState((prev: TTSState) => ({
            ...prev,
            isSupported: true,
            availableVoices: [fallbackVoice],
            currentVoice: fallbackVoice,
            hasJapaneseVoices: false,
          }));
          currentVoiceRef.current = fallbackVoice;
        }
      };

      // Load voices immediately if available
      loadVoices();

      // Also listen for voice changes (some browsers load voices asynchronously)
      speechSynthesis.addEventListener('voiceschanged', loadVoices);

      // Firefox needs more time and multiple attempts to load voices
      if (isFirefox.current) {
        setTimeout(loadVoices, 100);
        setTimeout(loadVoices, 500);
        setTimeout(loadVoices, 1000);
        setTimeout(loadVoices, 2000);
      } else {
        // Other browsers typically load faster
        setTimeout(loadVoices, 100);
        setTimeout(loadVoices, 500);
      }

      return () => {
        speechSynthesis.removeEventListener('voiceschanged', loadVoices);
      };
    }
  }, [isClient, pronunciationVoiceName]);

  const speak = useCallback(
    (
      text: string,
      options?: {
        rate?: number;
        pitch?: number;
        volume?: number;
        voice?: EnglishVoice;
      },
    ) => {
      if (!isClient || !pronunciationEnabled) {
        return Promise.resolve();
      }

      return new Promise<void>(resolve => {
        const requestId = ++speakRequestIdRef.current;

        const stopCurrentSpeech = () => {
          if (speechSynthesis.speaking || speechSynthesis.pending) {
            speechSynthesis.cancel();
          }
        };

        // Firefox needs voices to be loaded before creating utterance
        const attemptSpeak = (retries = 0) => {
          try {
            if (requestId !== speakRequestIdRef.current) {
              resolve();
              return;
            }

            // Get current voices (Firefox requires this to be fresh)
            const voices = speechSynthesis.getVoices();

            // Firefox: voices might not be loaded yet, wait for them
            if (voices.length === 0) {
              if (retries < 10) {
                // Wait for voices to load (Firefox can take time)
                setTimeout(
                  () => attemptSpeak(retries + 1),
                  isFirefox.current ? 200 : 100,
                );
                return;
              } else {
                console.warn('No voices available after retries');
                setState((prev: TTSState) => ({ ...prev, isPlaying: false }));
                resolve();
                return;
              }
            }

            // Create utterance fresh each time (Firefox requirement)
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'en-US';

            // Validate and apply rate (0.5-1.5)
            const rate = options?.rate ?? 1.0;
            utterance.rate = Math.max(0.5, Math.min(1.5, rate));

            // Validate and apply pitch (0.5-1.5)
            const pitch = options?.pitch ?? 1.0;
            utterance.pitch = Math.max(0.5, Math.min(1.5, pitch));

            // Validate and apply volume (0-1)
            const volume = options?.volume ?? 0.8;
            utterance.volume = Math.max(0, Math.min(1, volume));

            const selectedVoice = options?.voice || currentVoiceRef.current;
            const englishVoices = voices.filter(isEnUsVoice);

            if (selectedVoice) {
              // Match from the current voices list (Firefox requirement)
              const matchedVoice = voices.find(
                v =>
                  v.name === selectedVoice.name &&
                  v.lang === selectedVoice.lang,
              );

              if (matchedVoice && isEnUsVoice(matchedVoice)) {
                utterance.voice = matchedVoice;
              } else if (englishVoices.length > 0) {
                utterance.voice = englishVoices[0];
              } else {
                utterance.voice = matchedVoice || voices[0];
              }
            } else if (englishVoices.length > 0) {
              utterance.voice = englishVoices[0];
            } else if (voices.length > 0) {
              utterance.voice = voices[0];
              console.warn('No en-US voices available, using fallback voice');
            }

            // Firefox requires voice to be explicitly set
            if (!utterance.voice && voices.length > 0) {
              utterance.voice = voices[0];
            }

            // Event handlers
            utterance.onstart = () => {
              if (requestId !== speakRequestIdRef.current) return;
              setState((prev: TTSState) => ({ ...prev, isPlaying: true }));
            };

            utterance.onend = () => {
              if (requestId !== speakRequestIdRef.current) return;
              setState((prev: TTSState) => ({ ...prev, isPlaying: false }));
              resolve();
            };

            utterance.onerror = event => {
              if (requestId !== speakRequestIdRef.current) {
                resolve();
                return;
              }

              if (event.error !== 'interrupted') {
                console.warn('TTS Error:', event.error);
              }
              setState((prev: TTSState) => ({ ...prev, isPlaying: false }));
              resolve();
            };

            // Speak only if we have a voice set
            if (utterance.voice) {
              stopCurrentSpeech();
              setTimeout(() => {
                if (requestId !== speakRequestIdRef.current) {
                  resolve();
                  return;
                }

                speechSynthesis.speak(utterance);
              }, 50);
            } else {
              console.warn('Could not set voice for speech synthesis');
              setState((prev: TTSState) => ({ ...prev, isPlaying: false }));
              resolve();
            }
          } catch (error) {
            console.warn('Speech synthesis error:', error);
            setState((prev: TTSState) => ({ ...prev, isPlaying: false }));
            resolve();
          }
        };

        // Start attempt immediately (will retry if voices not ready)
        attemptSpeak();
      });
    },
    [isClient, pronunciationEnabled],
  );

  const stop = useCallback(() => {
    if (isClient && state.isSupported) {
      speechSynthesis.cancel();
      setState((prev: TTSState) => ({ ...prev, isPlaying: false }));
    }
  }, [isClient, state.isSupported]);

  const setVoice = useCallback(
    (voice: EnglishVoice) => {
      setState((prev: TTSState) => ({ ...prev, currentVoice: voice }));
      setPronunciationVoiceName(voice?.name ?? null);
      // Update ref immediately to avoid race conditions
      currentVoiceRef.current = voice;
    },
    [setPronunciationVoiceName],
  );

  // Method to refresh voices
  const refreshVoices = useCallback(() => {
    if (!isClient) return;

    const voices = speechSynthesis.getVoices();

    // Firefox sometimes returns empty array, skip if so
    if (voices.length === 0) return;

    const englishVoices = voices
      .filter(isEnUsVoice)
      .map(toEnglishVoice)
      .sort(sortVoices);

    const preferred = pronunciationVoiceName
      ? englishVoices.find(v => v.name === pronunciationVoiceName) || null
      : null;

    const newCurrentVoice = preferred || englishVoices[0] || null;

    setState((prev: TTSState) => ({
      ...prev,
      isSupported: true,
      availableVoices: englishVoices,
      currentVoice: newCurrentVoice,
      hasJapaneseVoices: englishVoices.length > 0,
    }));

    // Update ref immediately to avoid race conditions
    currentVoiceRef.current = newCurrentVoice;

    if (voices.length > 0 && englishVoices.length === 0) {
      console.warn(
        'No en-US voices found. Using fallback voice. Pronunciation may not be accurate.',
      );
      const fallbackVoice = toEnglishVoice(voices[0]);
      setState((prev: TTSState) => ({
        ...prev,
        isSupported: true,
        availableVoices: [fallbackVoice],
        currentVoice: fallbackVoice,
        hasJapaneseVoices: false,
      }));
      currentVoiceRef.current = fallbackVoice;
    }
  }, [isClient, pronunciationVoiceName]);

  return {
    speak,
    stop,
    setVoice,
    refreshVoices,
    isPlaying: state.isPlaying,
    isSupported: state.isSupported,
    availableVoices: state.availableVoices,
    currentVoice: state.currentVoice,
    hasJapaneseVoices: state.hasJapaneseVoices,
  };
};
