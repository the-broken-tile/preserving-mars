import { DeserializerInterface, SerializerInterface } from "."

export default class ArraySerializer
  implements SerializerInterface, DeserializerInterface
{
  private serializer!: SerializerInterface
  private deserializer!: DeserializerInterface
  public serialize(value: any): any[] | undefined {
    return Array.isArray(value) ?
        value.map((v: any): any => this.serializer.serialize(v)!)
      : undefined
  }

  public setSerializer(serializer: SerializerInterface): void {
    this.serializer = serializer
  }

  public deserialize(value: any): any[] | undefined {
    return Array.isArray(value) ?
        value.map((v: any): any => this.deserializer.deserialize(v)!)
      : undefined
  }

  public setDeserializer(deserializer: DeserializerInterface): void {
    this.deserializer = deserializer
  }
}
