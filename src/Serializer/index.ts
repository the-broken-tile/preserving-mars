import ArraySerializer from "./ArraySerializer"
import CorporationSerializer from "./CorporationSerializer"
import SerializerInterface from "./SerializerInterface"
import Serializer from "./Serializer"
import PlayerSerializer from "./PlayerSerializer"
import LegacySerializer from "./LegacySerializer"
import MissionSerializer from "./MissionSerializer"
import SavedCardSerializer from "./SavedCardSerializer"
import TitleSerializer from "./TitleSerializer"
import NullSerializer from "./NullSerializer"

const serializer = new Serializer([
  new ArraySerializer(),
  new NullSerializer(),
  new LegacySerializer(),
  new PlayerSerializer(),
  new CorporationSerializer(),
  new MissionSerializer(),
  new SavedCardSerializer(),
  new TitleSerializer(),
])

export {
  type SerializedCorporation,
  type SerializedPlayer,
  type SerializedMission,
  type SerializedLegacy,
  type SerializedTitle,
  type SerializedSavedCard,
} from "./types"

export { type SerializerInterface, serializer, Serializer }
