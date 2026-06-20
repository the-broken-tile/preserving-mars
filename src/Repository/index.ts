import LegacyRepository from "./LegacyRepository"
import { store } from "@/Store"
import { serializer } from "@/Serializer"
import { deserializer } from "@/Deserializer"

const legacyRepository = new LegacyRepository(store, serializer, deserializer)

export { legacyRepository }
