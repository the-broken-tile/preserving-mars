import { SerializerInterface, type SerializedTitle } from "."
import { Title } from "@/Model"

export default class TitleSerializer implements SerializerInterface<
  Title,
  SerializedTitle
> {
  public supports(value: any): value is Title {
    return value instanceof Title
  }
  public serialize(value: Title): SerializedTitle {
    return {
      _t: "t",
      n: value.name,
      m: value.mission,
      p: value.points,
      c: value.startingMegaCredits,
    }
  }
}
