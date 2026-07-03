import { Title } from "@/Model"
import { SerializedTitle } from "@/Serializer"
import { DeserializerInterface } from "."

export default class TitleDeserializer implements DeserializerInterface<
  SerializedTitle,
  Title
> {
  public supports(value: any): value is SerializedTitle {
    return value._type === "title"
  }

  public deserialize(value: SerializedTitle): Title {
    return new Title(value.n, value.m, value.p, value.c)
  }
}
