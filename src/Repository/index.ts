import LegacyRepository from "./LegacyRepository"
import { store } from "@/Store"
import { deserializer, serializer } from "@/Serializer"

const legacyRepository = new LegacyRepository(store, serializer, deserializer)

export { legacyRepository }
