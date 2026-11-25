import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import FuriganaText from './FuriganaText';

vi.mock('@/features/Preferences', () => ({
  useThemePreferences: () => ({ furiganaEnabled: true }),
}));

describe('FuriganaText', () => {
  it('renders plain text and ignores the reading prop in both render paths', () => {
    const { rerender } = render(
      <FuriganaText text='MAYDAY' reading='mayday distress call' />,
    );

    expect(screen.getByText('MAYDAY')).not.toBeNull();
    expect(screen.queryByText('mayday distress call')).toBeNull();

    rerender(
      <FuriganaText text='unused' reading='mayday distress call'>
        MAYDAY
      </FuriganaText>,
    );

    expect(screen.getByText('MAYDAY')).not.toBeNull();
    expect(screen.queryByText('unused')).toBeNull();
    expect(screen.queryByText('mayday distress call')).toBeNull();
  });

  it('renders plain text without ruby annotations', () => {
    const { container } = render(
      <FuriganaText text='MAYDAY' reading='distress call' />,
    );

    expect(screen.getByText('MAYDAY')).not.toBeNull();
    expect(container.querySelector('ruby')).toBeNull();
    expect(container.querySelector('rt')).toBeNull();
  });
});
