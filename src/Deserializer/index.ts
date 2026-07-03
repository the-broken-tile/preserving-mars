import ArrayDeserializer from "./ArrayDeserializer"
import CorporationDeserializer from "./CorporationDeserializer"
import DeserializerInterface from "./DeserializerInterface"
import Deserializer from "./Deserializer"
import LegacyDeserializer from "./LegacyDeserializer"
import MissionResultDeserializer from "./MissionResultDeserializer"
import PlayerDeserializer from "./PlayerDeserializer"
import SavedCardDeserializer from "./SavedCardDeserializer"
import TitleDeserializer from "./TitleDeserializer"
import NullDeserializer from "./NullDeserializer"

const deserializer: Deserializer = new Deserializer([
  new NullDeserializer(),
  new CorporationDeserializer(),
  new LegacyDeserializer(),
  new PlayerDeserializer(),
  new MissionResultDeserializer(),
  new SavedCardDeserializer(),
  new TitleDeserializer(),
  new ArrayDeserializer(),
])

export { type DeserializerInterface, deserializer }
