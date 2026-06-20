import DeserializerInterface from "./DeserializerInterface"

export default class Deserializer implements DeserializerInterface<any, any> {
  constructor(
    private readonly deserializers: DeserializerInterface<any, any>[],
  ) {}
  public supports(value: any): value is any {
    return true
  }
  public deserialize(value: any): any {
    for (const deserializer of this.deserializers) {
      if (deserializer.supports(value)) {
        if (typeof deserializer.setDeserializer === "function") {
          deserializer.setDeserializer(this)
        }

        return deserializer.deserialize(value)
      }
    }

    throw new Error(`Deserializer not found`)
  }
}
