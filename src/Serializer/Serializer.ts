import { DeserializerInterface, SerializerInterface } from "."

export default class Serializer
  implements SerializerInterface, DeserializerInterface
{
  constructor(
    private readonly serializers: Record<
      string,
      SerializerInterface & DeserializerInterface
    >,
  ) {
    this.init()
  }

  public serialize(value: any): any {
    for (const serializer of Object.values(this.serializers)) {
      const r: any = serializer.serialize(value)

      if (r !== undefined) {
        return r
      }
    }

    throw new Error(`Serializer not found for ${JSON.stringify(value)}`)
  }

  public deserialize(value: any): any {
    for (const deserializer of Object.values(this.serializers)) {
      const s: any = deserializer.deserialize(value)
      if (s !== undefined) {
        return s
      }
    }

    throw new Error(`Deserializer not found "${JSON.stringify(value)}"`)
  }

  private init(): void {
    for (const [key, serializer] of Object.entries(this.serializers)) {
      if (typeof serializer.setSerializer === "function") {
        serializer.setSerializer(this)
      }
      if (typeof serializer.alias === "function") {
        serializer.alias(key)
      }

      if (typeof serializer.setDeserializer === "function") {
        serializer.setDeserializer(this)
      }
    }
  }
}
