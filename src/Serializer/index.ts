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
import DeserializerInterface from "@/Serializer/DeserializerInterface"

const serializers: Record<string, SerializerInterface & DeserializerInterface> =
  {
    /**
     * Types are here to guarantee and more easily manage uniqueness.
     */
    _null: new NullSerializer(),
    l: new LegacySerializer(),
    p: new PlayerSerializer(),
    o: new CorporationSerializer(),
    m: new MissionSerializer(),
    c: new SavedCardSerializer(),
    t: new TitleSerializer(),
    // Must be last 👇
    _array: new ArraySerializer(),
  }
const serializer: Serializer = new Serializer(serializers)
const deserializer: Serializer = serializer

export { type SerializedLegacy } from "./types"

export type { default as DeserializerInterface } from "./DeserializerInterface"
export { deserializer, type SerializerInterface, serializer, Serializer }
