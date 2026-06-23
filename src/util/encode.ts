import pako from "pako"

export default function encode(data: unknown): string {
  const json: string = JSON.stringify(data)

  const compressed: Uint8Array = pako.deflate(json)

  return btoa(String.fromCharCode(...compressed))
}
