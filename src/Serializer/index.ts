import CorporationSerializer, {
  type SerializedCorporation,
} from "./CorporationSerializer"
import DevelopmentSerializer, {
  type SerializedDevelopment,
} from "./DevelopmentSerializer"
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
  new DevelopmentSerializer(),
  new CorporationSerializer(),
  new MissionSerializer(),
  new SavedCardSerializer(),
  new TitleSerializer(),
])

export {
  DevelopmentSerializer,
  type SerializerInterface,
  serializer,
  Serializer,
  type SerializedCorporation,
  type SerializedDevelopment,
  type SerializedLegacy,
  type SerializedMission,
  type SerializedPlayer,
  type SerializedSavedCard,
}
