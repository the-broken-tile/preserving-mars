import { SavedCard } from "@/Model"
import { DeserializerInterface, SerializerInterface } from "."
import { SerializedSavedCard } from "./types"

export default class SavedCardSerializer
  implements SerializerInterface, DeserializerInterface
{
  private key!: string

  public alias(alias: string): void {
    this.key = alias
  }
  public serialize(value: any): SerializedSavedCard | undefined {
    return value instanceof SavedCard ?
        [this.key, value.name, value.type]
      : undefined
  }

  public deserialize(value: any): SavedCard | undefined {
    return Array.isArray(value) && value[0] === this.key ?
        new SavedCard(value[1], value[2])
      : undefined
  }
}
