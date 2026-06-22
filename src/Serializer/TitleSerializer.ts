import SerializerInterface from "@/Serializer/SerializerInterface"
import { Title, TitleName } from "@/Model"

export type SerializedTitle = {
  _type: "title"
  name: TitleName
  mission: number
  points: number
}

export default class TitleSerializer implements SerializerInterface<
  Title,
  SerializedTitle
> {
  public supports(value: any): value is Title {
    return value instanceof Title
  }
  public serialize(value: Title): SerializedTitle {
    return {
      _type: "title",
      name: value.name,
      mission: value.mission,
      points: value.points,
    }
  }
}
