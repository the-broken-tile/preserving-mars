import { Development } from "@/Model"
import { SerializedDevelopment } from "@/Serializer"
import { Writeable } from "@/types"
import DeserializerInterface from "./DeserializerInterface"

export default class DevelopmentDeserializer implements DeserializerInterface<
  SerializedDevelopment,
  Development
> {
  private deserializer!: DeserializerInterface<any, any>

  public supports(value: any): value is SerializedDevelopment {
    return value._type === "development"
  }

  public deserialize(value: SerializedDevelopment): Development {
    const development: Writeable<Development> = new Development(
      value.name,
      this.deserializer.deserialize(value.corporation),
    )
    development.id = value.id

    return development
  }

  public setDeserializer(deserializer: DeserializerInterface<any, any>): void {
    this.deserializer = deserializer
  }
}
