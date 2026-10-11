import { describe, it, expect } from 'vitest';
import { cn } from '../cn';

describe('cn utility', () => {
  it('merges single classes correctly', () => {
    expect(cn('px-2', 'py-1')).toBe('px-2 py-1');
  });

  it('merges tailwind conflicts using tailwind-merge', () => {
    expect(cn('p-4', 'p-2')).toBe('p-2');
  });

  it('handles falsy and conditional expressions', () => {
    expect(cn('btn', false && 'hidden', null, undefined, 'active')).toBe('btn active');
  });

  it('handles arrays and nested objects', () => {
    expect(cn(['flex', { 'items-center': true, hidden: false }])).toBe('flex items-center');
  });
});
