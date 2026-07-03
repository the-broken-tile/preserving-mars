import SerializerInterface from "@/Serializer/SerializerInterface"

export default class ArraySerializer<T, S> implements SerializerInterface<
  T[],
  S[]
> {
  private serializer!: SerializerInterface<T, S>
  public supports(value: any): value is T[] {
    return Array.isArray(value)
  }

  public serialize(value: T[]): S[] {
    return value.map((v: T): S => this.serializer.serialize(v))
  }

  public setSerializer(serializer: SerializerInterface<any, any>): void {
    this.serializer = serializer
  }
}
