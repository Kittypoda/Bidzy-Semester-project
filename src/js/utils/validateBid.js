export function validateBid(bidAmount) {
  return typeof bidAmount === 'number' && bidAmount > 0;
}
