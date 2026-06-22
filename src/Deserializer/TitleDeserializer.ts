import DeserializerInterface from "@/Deserializer/DeserializerInterface"
import { SerializedTitle } from "@/Serializer/TitleSerializer"
import { Title } from "@/Model"

export default class TitleDeserializer implements DeserializerInterface<
  SerializedTitle,
  Title
> {
  public supports(value: any): value is SerializedTitle {
    return value._type === "title"
  }

  public deserialize(value: SerializedTitle): Title {
    return new Title(value.name, value.mission, value.points)
  }
}
