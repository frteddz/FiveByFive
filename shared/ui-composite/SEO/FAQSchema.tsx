import Script from 'next/script';

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQSchemaProps {
  faqs: FAQItem[];
}

export function generateFAQSchema(faqs: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * FAQ Schema Component
 * Generates structured data for FAQ pages that can appear in rich results
 *
 * @example
 * <FAQSchema
 *   faqs={[
 *     {
 *       question: "What is the NATO phonetic alphabet?",
 *       answer: "It is a standard list of code words for spelling letters out loud."
 *     }
 *   ]}
 * />
 */
export function FAQSchema({ faqs }: FAQSchemaProps) {
  if (!faqs || faqs.length === 0) {
    return null;
  }

  const schema = generateFAQSchema(faqs);

  return (
    <Script
      id='faq-schema'
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Export names are inherited from upstream so existing page imports keep working.
// The content now covers the NATO and ICAO alphabet instead of Japanese scripts.
export const commonKanaDOJOFAQs: FAQItem[] = [
  {
    question: 'Is FiveByFive free to use?',
    answer:
      'Yes. All three trainings, the timed modes and the themes are free. Progress is saved in your browser without an account.',
  },
  {
    question: 'Do I need to create an account?',
    answer:
      'No. Your progress lives in local browser storage, so you can start drilling code words straight away.',
  },
  {
    question: 'What does FiveByFive teach?',
    answer:
      'Letters drills the code word for each letter from A to Z. Codes covers radio phrases such as roger, wilco and mayday. Spelling asks you to spell whole words with code words.',
  },
  {
    question: 'Are the spellings ICAO or NATO?',
    answer:
      'The data follows ICAO spellings, so alfa has one l and juliett has two t. Common variants such as alpha, juliet and xray are accepted too.',
  },
  {
    question: 'How does progress tracking work?',
    answer:
      'Correct and incorrect answers are recorded per item. Accuracy, streaks and mastery are shown in the progress view and stay in your browser.',
  },
  {
    question: 'Does it work offline?',
    answer:
      'Once the page is loaded, drills keep working without a connection. The service worker caches the audio and static assets.',
  },
  {
    question: 'Can I change the look of the app?',
    answer:
      'Yes. Preferences has themes, fonts and motion settings. Everything is stored locally.',
  },
];

export const hiraganaFAQs: FAQItem[] = [
  {
    question: 'What is the NATO phonetic alphabet?',
    answer:
      'It is a standard list of code words for spelling letters over a radio link. A becomes alfa, B becomes bravo, and so on to Z as zulu.',
  },
  {
    question: 'How long does it take to learn the code words?',
    answer:
      'Most people get the alphabet in a few short sessions. The Letters training mixes recognition and recall so you can see which code words still need work.',
  },
  {
    question: 'Why say bravo instead of B?',
    answer:
      'Single letters sound alike over a noisy connection. Distinct code words cut down on mistakes when a callsign or instruction has to be copied exactly.',
  },
  {
    question: 'What are the digits in the phonetic alphabet?',
    answer:
      'ICAO spells digits as zero, wun, too, tree, fower, fife, six, seven, eight and niner. The odd spellings are meant to stay clear over radio.',
  },
];

export const kanjiFAQs: FAQItem[] = [
  {
    question: 'What radio phrases does Codes cover?',
    answer:
      'Everyday calls like roger, over and out, procedural words like clearance and squawk, and emergency calls such as mayday and pan pan.',
  },
  {
    question: 'What is the difference between mayday and pan pan?',
    answer:
      'Mayday is a distress call for a life threatening emergency. Pan pan is used for an urgent situation that is not yet life threatening.',
  },
  {
    question: 'How should I practise phraseology?',
    answer:
      'Start with the lower tiers, then switch between pick and input modes. Recognition is easier, so use input mode once the meanings feel familiar.',
  },
];
