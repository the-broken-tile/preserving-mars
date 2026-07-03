import { Title } from "@/Model"
import { SerializedTitle } from "@/Serializer"
import { DeserializerInterface } from "."

export default class TitleDeserializer implements DeserializerInterface<
  SerializedTitle,
  Title
> {
  public supports(value: any): value is SerializedTitle {
    return Array.isArray(value) && value[0] === "t"
  }

  public deserialize(value: SerializedTitle): Title {
    return new Title(value[1], value[2], value[3], value[4])
  }
}
