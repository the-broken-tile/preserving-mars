export default interface DeserializerInterface<S, T> {
  supports(value: any): value is S
  deserialize(value: S): T
  setDeserializer?(deserializer: DeserializerInterface<any, any>): void
}
