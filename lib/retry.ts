export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  retries = 3,
  delay = 500
): Promise<T> {
  try {
    return await fn();
  } catch (err) {
    if (retries <= 0) throw err;

    const wait = delay * Math.pow(2, 3 - retries);

    await new Promise((r) => setTimeout(r, wait));

    return retryWithBackoff(fn, retries - 1, delay);
  }
}