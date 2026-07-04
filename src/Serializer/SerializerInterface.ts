export default interface SerializerInterface {
  serialize(value: any): any | undefined
  setSerializer?(serializer: SerializerInterface): void
  alias?(alias: string): void
}
