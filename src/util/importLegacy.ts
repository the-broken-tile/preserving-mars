import { Legacy } from "@/Model"
import { deserializer } from "@/Deserializer"
import { decode } from "@/util/index"
import { SerializedLegacy } from "@/Serializer"

export default function importLegacy(str: string): Legacy {
  return deserializer.deserialize(decode<SerializedLegacy>(str))
}
