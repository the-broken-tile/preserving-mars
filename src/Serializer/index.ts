import CorporationSerializer, {
  type SerializedCorporation,
} from "./CorporationSerializer"
import DevelopmentSerializer, {
  type SerializedDevelopment,
} from "./DevelopmentSerializer"
import SerializerInterface from "./SerializerInterface"
import Serializer from "@/Serializer/Serializer"
import PlayerSerializer, { type SerializedPlayer } from "./PlayerSerializer"
import LegacySerializer, {
  type SerializedLegacy,
} from "@/Serializer/LegacySerializer"

const serializer = new Serializer([
  new LegacySerializer(),
  new PlayerSerializer(),
  new DevelopmentSerializer(),
  new CorporationSerializer(),
])

export {
  DevelopmentSerializer,
  type SerializerInterface,
  serializer,
  Serializer,
  type SerializedCorporation,
  type SerializedDevelopment,
  type SerializedPlayer,
  type SerializedLegacy,
}
