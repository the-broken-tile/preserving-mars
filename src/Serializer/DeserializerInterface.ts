export default interface DeserializerInterface {
  deserialize(value: any): any | undefined
  setDeserializer?(deserializer: DeserializerInterface): void
}
