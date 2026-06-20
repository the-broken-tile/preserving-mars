import { SerializedCorporation } from "@/Serializer"
import { Corporation } from "@/Model"
import { Writeable } from "@/types"
import DeserializerInterface from "./DeserializerInterface"

export default class CorporationDeserializer implements DeserializerInterface<
  SerializedCorporation,
  Corporation
> {
  public supports(value: any): value is SerializedCorporation {
    return value._type === "corporation"
  }
  public deserialize(value: SerializedCorporation): Corporation {
    const c: Writeable<Corporation> = Corporation.create(value.name)
    c.id = value.id

    return c
  }
}
