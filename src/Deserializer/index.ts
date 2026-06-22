import DeserializerInterface from "./DeserializerInterface"
import CorporationDeserializer from "./CorporationDeserializer"
import Deserializer from "./Deserializer"
import DevelopmentDeserializer from "./DevelopmentDeserializer"
import LegacyDeserializer from "./LegacyDeserializer"
import MissionResultDeserializer from "./MissionResultDeserializer"
import PlayerDeserializer from "./PlayerDeserializer"
import SavedCardDeserializer from "@/Deserializer/SavedCardDeserializer"
import TitleDeserializer from "@/Deserializer/TitleDeserializer"
import NullDeserializer from "@/Deserializer/NullDeserializer"

const deserializer: Deserializer = new Deserializer([
  new NullDeserializer(),
  new CorporationDeserializer(),
  new DevelopmentDeserializer(),
  new LegacyDeserializer(),
  new PlayerDeserializer(),
  new MissionResultDeserializer(),
  new SavedCardDeserializer(),
  new TitleDeserializer(),
])

export { type DeserializerInterface, deserializer }
