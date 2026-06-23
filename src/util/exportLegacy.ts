import { Legacy } from "@/Model"
import { encode } from "@/util/index"
import { serializer } from "@/Serializer"

export default function exportLegacy(legacy: Legacy): string {
  return encode(serializer.serialize(legacy))
}
