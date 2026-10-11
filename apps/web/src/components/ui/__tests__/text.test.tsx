import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Text } from '../text';

describe('Text component', () => {
  it('renders text with default p element and body-md variant', () => {
    render(<Text>Paragraph content</Text>);
    const el = screen.getByText('Paragraph content');
    expect(el.tagName).toBe('P');
  });

  it('renders polymorphic heading elements', () => {
    render(
      <Text as="h1" variant="headline-lg">
        Main Heading
      </Text>
    );
    const el = screen.getByText('Main Heading');
    expect(el.tagName).toBe('H1');
  });

  it('applies label-sm and caption styles', () => {
    render(
      <Text as="span" variant="label-sm">
        Small Label
      </Text>
    );
    const el = screen.getByText('Small Label');
    expect(el.tagName).toBe('SPAN');
  });
});
