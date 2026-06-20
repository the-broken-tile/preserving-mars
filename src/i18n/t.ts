export default function t(
  key: string,
  replacements: Record<string, string | number> = {},
): string {
  let result: string = key
  for (const [key, value] of Object.entries(replacements)) {
    result = result.replaceAll(`%${key}%`, String(value))
  }

  return result
}
