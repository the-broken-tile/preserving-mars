import SerializerInterface from "@/Serializer/SerializerInterface"

export default class NullSerializer implements SerializerInterface<null, null> {
  public supports(value: any): value is null {
    return value === null
  }

  public serialize(): null {
    return null
  }
}
