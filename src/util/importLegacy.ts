import { Legacy } from "@/Model"
import { decode } from "@/util/index"
import { deserializer, SerializedLegacy } from "@/Serializer"

export default function importLegacy(str: string): Legacy {
  return deserializer.deserialize(decode<SerializedLegacy>(str))
}
