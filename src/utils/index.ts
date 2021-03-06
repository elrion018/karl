export function generateSeq(
  start: number,
  stop: number,
  step: number
): Array<any> {
  return Array.from(
    { length: (stop - start) / step + 1 },
    (_, i) => start + i * step
  );
}

export function assert(condition: boolean, message: string) {
  if (!condition) throw new Error(message);
}
