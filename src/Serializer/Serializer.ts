import { SerializerInterface } from "."

export default class Serializer implements SerializerInterface<any, any> {
  constructor(private readonly serializers: SerializerInterface<any, any>[]) {}

  public supports(value: any): value is any {
    return true
  }

  public serialize(value: any): any {
    for (const serializer of this.serializers) {
      if (serializer.supports(value)) {
        if (typeof serializer.setSerializer === "function") {
          serializer.setSerializer(this)
        }

        return serializer.serialize(value)
      }
    }

    throw new Error("Method not implemented.")
  }
}
