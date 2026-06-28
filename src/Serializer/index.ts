import CorporationSerializer, {
  type SerializedCorporation,
} from "./CorporationSerializer"
import SerializerInterface from "./SerializerInterface"
import Serializer from "./Serializer"
import PlayerSerializer, { type SerializedPlayer } from "./PlayerSerializer"
import LegacySerializer, { type SerializedLegacy } from "./LegacySerializer"
import MissionSerializer, { type SerializedMission } from "./MissionSerializer"
import {
  default as SavedCardSerializer,
  SerializedSavedCard,
} from "./SavedCardSerializer"
import TitleSerializer from "./TitleSerializer"
import NullSerializer from "./NullSerializer"

const serializer = new Serializer([
  new NullSerializer(),
  new LegacySerializer(),
  new PlayerSerializer(),
  new CorporationSerializer(),
  new MissionSerializer(),
  new SavedCardSerializer(),
  new TitleSerializer(),
])

export {
  type SerializerInterface,
  serializer,
  Serializer,
  type SerializedCorporation,
  type SerializedLegacy,
  type SerializedMission,
  type SerializedPlayer,
  type SerializedSavedCard,
}
