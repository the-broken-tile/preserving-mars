import { Legacy } from "@/Model"
import { encode } from "@/util/index"
import { serializer } from "@/Serializer"

export default function exportLegacy(legacy: Legacy): string {
  const r = encode(serializer.serialize(legacy))

  console.log(r.length)

  return r
}
