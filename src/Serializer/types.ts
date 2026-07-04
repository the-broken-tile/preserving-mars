import { Color, Phase, SavedCardType, TitleName } from "@/Model"

export type SerializedLegacy = [
  string, // type
  string, //id
  number, // current mission
  number, // total missions
  Phase,
  string | null, // name
  SerializedPlayer[],
]

export type SerializedCorporation = [string, string]

export type SerializedTitle = [
  string, // type
  TitleName,
  number, // mission
  number, // title points
  number, // starting credits
]

export type SerializedMission = [
  string, // type
  number, // points
  SerializedTitle,
  number, // mission
  SerializedSavedCard[],
  number | null, // passing order
]

export type SerializedPlayer = [
  string, // type
  string, // name
  Color,
  SerializedCorporation,
  SerializedMission[],
]

export type SerializedSavedCard = [
  string, // type
  string, // name
  SavedCardType,
]
