import { Color, Phase, SavedCardType, TitleName } from "@/Model"

type Serialized = {
  _t: string
}

export type SerializedLegacy = [
  "l", // type
  string, //id
  number, // current mission
  number, // total missions
  Phase,
  string | null, // name
  SerializedPlayer[],
]

export type SerializedCorporation = ["o", string]

export type SerializedTitle = [
  "t", // type
  TitleName,
  number, // mission
  number, // title points
  number, // starting credits
]

export type SerializedMission = [
  "m", // type
  number, // points
  SerializedTitle,
  number, // mission
  SerializedSavedCard[],
  number | null, // passing order
]

export type SerializedPlayer = [
  "p", // type
  string, // name
  Color,
  SerializedCorporation,
  SerializedMission[],
]

export type SerializedSavedCard = [
  "c", // type
  string, // name
  SavedCardType,
]
