import DeserializerInterface from "@/Deserializer/DeserializerInterface"

export default class ArrayDeserializer<S, T> implements DeserializerInterface<
  S[],
  T[]
> {
  private deserializer!: DeserializerInterface<S, T>
  public supports(value: any): value is S[] {
    return Array.isArray(value)
  }

  public deserialize(value: S[]): T[] {
    return value.map((v: S): T => this.deserializer.deserialize(v))
  }

  public setDeserializer(deserializer: DeserializerInterface<any, any>): void {
    this.deserializer = deserializer
  }
}
