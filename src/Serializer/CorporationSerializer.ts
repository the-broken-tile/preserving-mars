import SerializerInterface from "@/Serializer/SerializerInterface"
import { Corporation } from "@/Model"

export type SerializedCorporation = {
  name: string
  _type: "corporation"
}

export default class CorporationSerializer implements SerializerInterface<
  Corporation,
  SerializedCorporation
> {
  public supports(value: any): value is Corporation {
    return value instanceof Corporation
  }

  public serialize(value: Corporation): SerializedCorporation {
    return {
      name: value.name,
      _type: "corporation",
    }
  }
}
