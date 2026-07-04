import { DeserializerInterface, SerializerInterface } from "."

export default class NullSerializer
  implements SerializerInterface, DeserializerInterface
{
  public serialize(value: any): null | undefined {
    return value === null ? null : undefined
  }

  public deserialize(value: any): null | undefined {
    return value === null ? null : undefined
  }
}
