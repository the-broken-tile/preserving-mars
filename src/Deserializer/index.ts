import DeserializerInterface from "./DeserializerInterface"
import CorporationDeserializer from "./CorporationDeserializer"
import Deserializer from "./Deserializer"
import DevelopmentDeserializer from "./DevelopmentDeserializer"
import LegacyDeserializer from "./LegacyDeserializer"
import MissionResultDeserializer from "./MissionResultDeserializer"
import PlayerDeserializer from "./PlayerDeserializer"
import SavedCardDeserializer from "@/Deserializer/SavedCardDeserializer"

const deserializer: Deserializer = new Deserializer([
  new CorporationDeserializer(),
  new DevelopmentDeserializer(),
  new LegacyDeserializer(),
  new PlayerDeserializer(),
  new MissionResultDeserializer(),
  new SavedCardDeserializer(),
])

export { type DeserializerInterface, deserializer }
