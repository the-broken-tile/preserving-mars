import { SerializedCorporation } from "@/Serializer"
import { Corporation } from "@/Model"
import DeserializerInterface from "./DeserializerInterface"

export default class CorporationDeserializer implements DeserializerInterface<
  SerializedCorporation,
  Corporation
> {
  public supports(value: any): value is SerializedCorporation {
    return value._type === "corporation"
  }
  public deserialize(value: SerializedCorporation): Corporation {
    return Corporation.create(value.name)
  }
}
