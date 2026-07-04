import { Title } from "@/Model"
import { SerializerInterface, DeserializerInterface } from "."
import { SerializedTitle } from "./types"

export default class TitleSerializer
  implements SerializerInterface, DeserializerInterface
{
  private key!: string
  public alias(alias: string): void {
    this.key = alias
  }
  public serialize(value: any): SerializedTitle | undefined {
    return value instanceof Title ?
        [
          this.key,
          value.name,
          value.mission,
          value.points,
          value.startingMegaCredits,
        ]
      : undefined
  }

  public deserialize(value: any): Title | undefined {
    return Array.isArray(value) && value[0] === "t" ?
        new Title(value[1], value[2], value[3], value[4])
      : undefined
  }
}
