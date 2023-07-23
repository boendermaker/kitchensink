export function rndID() {
  return Math.random().toString(36).replace(/[^a-z]+/g, '').substring(2, 10);
}
