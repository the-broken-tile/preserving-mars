import dictionary from "./dictionary"

type DictionaryKey = keyof typeof dictionary

export default function t(
  key: string | number,
  replacements: Record<string, string | number> = {},
  dict: DictionaryKey = "messages",
): string {
  let result: string =
    dictionary[dict][key as keyof (typeof dictionary)[typeof dict]] ?? key

  for (const [key, value] of Object.entries(replacements)) {
    result = result.replaceAll(`%${key}%`, String(value))
  }

  return result
}
