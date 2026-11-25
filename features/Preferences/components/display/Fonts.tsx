'use client';
import clsx from 'clsx';
import { useState, useMemo } from 'react';
import { useClick } from '@/shared/hooks/generic/useAudio';
import usePreferencesStore from '@/features/Preferences/store/usePreferencesStore';
import { buttonBorderStyles } from '@/shared/utils/styles';
import fonts from '../../data/fonts/fonts';
import { isRecommendedFont } from '../../data/fonts/recommendedFonts';
import { Star, Type } from 'lucide-react';
import CollapsibleSection from '../shared/CollapsibleSection';

type FontsProps = {
  useNewIconDesign?: boolean;
};

const Fonts = ({ useNewIconDesign = false }: FontsProps) => {
  const { playClick } = useClick();

  const currentFont = usePreferencesStore(state => state.font);
  const setFont = usePreferencesStore(state => state.setFont);

  // Separate fonts into recommended and other categories
  const { recommendedFonts, otherFonts } = useMemo(() => {
    const recommended = fonts.filter(f => isRecommendedFont(f.name));
    const other = fonts.filter(f => !isRecommendedFont(f.name));
    return { recommendedFonts: recommended, otherFonts: other };
  }, []);

  const renderFontCard = (fontObj: (typeof fonts)[number]) => (
    <label
      key={fontObj.name}
      className={clsx(
        'flex items-center justify-center',
        buttonBorderStyles,
        'border-1 border-(--card-color) px-4 py-4',
        'flex-1',
      )}
      style={{
        outline: 'none',
        backgroundColor:
          fontObj.name === currentFont
            ? 'var(--secondary-color)'
            : 'var(--card-color)',
        transition: 'background-color 275ms, color 275ms',
      }}
      onClick={() => playClick()}
    >
      <input
        type='radio'
        name='selectedTheme'
        onChange={() => {
          setFont(fontObj.name);
        }}
        className='hidden'
      />
      <p className={clsx('text-center text-xl', fontObj.font.className)}>
        <span
          style={{
            color:
              fontObj.name === currentFont
                ? 'var(--background-color)'
                : 'var(--main-color)',
          }}
        >
          {fontObj.name}
          {fontObj.name === 'Inter' && (
            <span
              style={{
                color:
                  fontObj.name === currentFont
                    ? 'var(--background-color)'
                    : 'var(--main-color)',
              }}
            >
              {' (default)'}
            </span>
          )}
        </span>
        <span
          className='ml-2'
          style={{
            color:
              fontObj.name === currentFont
                ? 'var(--card-color)'
                : 'var(--secondary-color)',
          }}
        >
          FiveByFive
        </span>
      </p>
    </label>
  );

  return (
    <div className='flex flex-col gap-6'>
      {/* <button
        className={clsx(
          'flex w-1/4 items-center justify-center gap-2 p-6',
          buttonBorderStyles,
          'w-full text-xl',
          'flex-1 overflow-hidden',
        )}
        onClick={() => {
          playClick();
          if (fonts.length > 0) {
            const randomFont = fonts[random.integer(0, fonts.length - 1)];
            setRandomFont(randomFont);
            setFont(randomFont.name);
          }
        }}
      >
        <span className='mb-0.5'>
          {randomFont?.name === currentFont ? '\u2B24 ' : ''}
        </span>
        <Dice5 className='text-(--secondary-color)' />
        Random Font
      </button> */}

      {/* Recommended Fonts Section */}
      <CollapsibleSection
        title='Recommended'
        icon={<Star size={18} />}
        useNewIconDesign={useNewIconDesign}
        level='subsubsection'
        defaultOpen={true}
        storageKey='prefs-fonts-recommended'
      >
        <fieldset
          className={clsx(
            'grid grid-cols-2 gap-4 p-1 md:grid-cols-3 lg:grid-cols-4',
          )}
        >
          {recommendedFonts.map(renderFontCard)}
        </fieldset>
      </CollapsibleSection>

      {/* Other Fonts Section */}
      <CollapsibleSection
        title='Other'
        icon={<Type size={18} />}
        useNewIconDesign={useNewIconDesign}
        level='subsubsection'
        defaultOpen={true}
        storageKey='prefs-fonts-other'
      >
        <fieldset
          className={clsx(
            'grid grid-cols-2 gap-4 p-1 md:grid-cols-3 lg:grid-cols-4',
          )}
        >
          {otherFonts.map(renderFontCard)}
        </fieldset>
      </CollapsibleSection>
      <div className='flex flex-col gap-2'>
        <h4 className='text-xl'>Alphabet:</h4>
        <p className='text-3xl text-(--secondary-color)' lang='en'>
          ABCDEFGHIJKLMNOPQRSTUVWXYZ
        </p>
        <h4 className='text-xl'>Code words:</h4>
        <p className='text-3xl text-(--secondary-color)' lang='en'>
          Alfa Bravo Charlie Delta Echo Foxtrot
        </p>
        <h4 className='text-xl'>Radio:</h4>
        <p className='text-3xl text-(--secondary-color)' lang='en'>
          Roger Wilco Over Out Mayday Squawk
        </p>
      </div>
    </div>
  );
};

export default Fonts;

