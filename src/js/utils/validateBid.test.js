import { validateBid } from './validateBid';

describe('validateBid', () => {
  it('returns false for 0 or negative numbers', () => {
    expect(validateBid(0)).toBe(false);
    expect(validateBid(-10)).toBe(false);
  });

  it('returns true for positive numbers', () => {
    expect(validateBid(1)).toBe(true);
    expect(validateBid(100)).toBe(true);
  });

  it('returns false for non-number values', () => {
    expect(validateBid('50')).toBe(false);
    expect(validateBid(null)).toBe(false);
    expect(validateBid(undefined)).toBe(false);
  });
});
