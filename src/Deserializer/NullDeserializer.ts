import DeserializerInterface from "@/Deserializer/DeserializerInterface"

export default class NullDeserializer implements DeserializerInterface<
  null,
  null
> {
  public supports(value: any): value is null {
    return value === null
  }

  public deserialize(): null {
    return null
  }
}
