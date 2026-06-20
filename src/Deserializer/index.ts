import DeserializerInterface from "./DeserializerInterface"
import CorporationDeserializer from "./CorporationDeserializer"
import Deserializer from "./Deserializer"
import DevelopmentDeserializer from "./DevelopmentDeserializer"
import LegacyDeserializer from "./LegacyDeserializer"
import PlayerDeserializer from "./PlayerDeserializer"

const deserializer: Deserializer = new Deserializer([
  new CorporationDeserializer(),
  new DevelopmentDeserializer(),
  new LegacyDeserializer(),
  new PlayerDeserializer(),
])

export { type DeserializerInterface, deserializer }
