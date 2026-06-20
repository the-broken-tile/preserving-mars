export default interface SerializerInterface<T, S> {
  supports(value: any): value is T
  serialize(value: T): S
  setSerializer?(serializer: SerializerInterface<any, any>): void
}
