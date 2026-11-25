'use client';
import { ReactNode, memo } from 'react';

interface FuriganaTextProps {
  text: string;
  reading?: string;
  className?: string;
  furiganaClassName?: string;
  lang?: string;
  children?: ReactNode;
}

// The reading prop is kept for compatibility, but text is rendered as plain text.
const FuriganaText = ({
  text,
  className = '',
  lang = 'en',
  children,
}: FuriganaTextProps) => (
  <span className={className} lang={lang}>
    {children ?? text}
  </span>
);

export default memo(FuriganaText);
