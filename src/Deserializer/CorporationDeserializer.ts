import { Corporation } from "@/Model"
import { SerializedCorporation } from "@/Serializer"
import { DeserializerInterface } from "."

export default class CorporationDeserializer implements DeserializerInterface<
  SerializedCorporation,
  Corporation
> {
  public supports(value: any): value is SerializedCorporation {
    return Array.isArray(value) && value[0] === "o"
  }
  public deserialize(value: SerializedCorporation): Corporation {
    return Corporation.create(value[1])
  }
}
