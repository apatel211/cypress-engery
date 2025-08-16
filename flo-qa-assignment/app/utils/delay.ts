export function randomDelay(
  minMilliseconds: number,
  maxMilliseconds: number
): Promise<void> {
  const delay =
    Math.floor(Math.random() * (maxMilliseconds - minMilliseconds + 1)) +
    minMilliseconds;
  return new Promise((resolve) => setTimeout(resolve, delay));
}
