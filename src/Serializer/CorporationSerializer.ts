import SerializerInterface from "@/Serializer/SerializerInterface"
import { Corporation } from "@/Model"

export type SerializedCorporation = {
  id: string
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
      id: value.id,
      name: value.name,
      _type: "corporation",
    }
  }
}
