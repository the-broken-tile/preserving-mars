import { SerializerInterface, SerializedCorporation } from "."
import { Development } from "@/Model"

export type SerializedDevelopment = {
  id: string
  name: string
  corporation: SerializedCorporation
  _type: "development"
}
export default class DevelopmentSerializer implements SerializerInterface<
  Development,
  SerializedDevelopment
> {
  private serializer!: SerializerInterface<any, any>
  public supports(value: any): value is Development {
    return value instanceof Development
  }

  public serialize(value: Development): SerializedDevelopment {
    return {
      id: value.id,
      name: value.name,
      corporation: this.serializer.serialize(value.corporation),
      _type: "development",
    }
  }

  public setSerializer?(serializer: SerializerInterface<any, any>): void {
    this.serializer = serializer
  }
}
