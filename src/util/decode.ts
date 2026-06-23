import pako from "pako"
export default function decode<T>(encoded: string): T {
  const compressed: Uint8Array = Uint8Array.from(atob(encoded), c =>
    c.charCodeAt(0),
  )

  const json: string = pako.inflate(compressed, {
    to: "string",
  })

  return JSON.parse(json) as T
}
