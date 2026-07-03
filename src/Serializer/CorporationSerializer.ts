import { SerializerInterface } from "."
import { Corporation } from "@/Model"
import { SerializedCorporation } from "./types"

export default class CorporationSerializer implements SerializerInterface<
  Corporation,
  SerializedCorporation
> {
  public supports(value: any): value is Corporation {
    return value instanceof Corporation
  }

  public serialize(value: Corporation): SerializedCorporation {
    return ["o", value.name]
  }
}
