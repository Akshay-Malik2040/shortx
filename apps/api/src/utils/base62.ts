const CHARACTERS =
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

export function encodeBase62(value: number | bigint): string {
  let number = BigInt(value);

  if (number === 0n) {
    return "0";
  }

  let result = "";

  while (number > 0n) {
    const remainder = Number(number % 62n);
    result = CHARACTERS[remainder] + result;
    number = number / 62n;
  }

  return result;
}
