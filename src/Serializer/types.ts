import { Color, Phase, SavedCardType, TitleName } from "@/Model"

type Serialized = {
  _t: string
}

export type SerializedLegacy = Serialized & {
  _t: "l"
  i: string
  c: number
  t: number
  f: Phase
  n: string | null
  p: SerializedPlayer[]
}

export type SerializedCorporation = Serialized & {
  _t: "o"
  n: string
}

export type SerializedTitle = Serialized & {
  _t: "t"
  n: TitleName
  m: number
  p: number
  c: number
}

export type SerializedMission = Serialized & {
  _t: "m"
  p: number
  t: SerializedTitle
  m: number
  s: SerializedSavedCard[]
  o: number | null
}

export type SerializedPlayer = Serialized & {
  _t: "p"
  n: string
  c: Color
  o: SerializedCorporation
  m: SerializedMission[]
}

export type SerializedSavedCard = Serialized & {
  _t: "c"
  n: string
  t: SavedCardType
}
