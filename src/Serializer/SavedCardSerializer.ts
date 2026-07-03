import { SavedCard } from "@/Model"
import { SerializerInterface, SerializedSavedCard } from "."

export default class SavedCardSerializer implements SerializerInterface<
  SavedCard,
  SerializedSavedCard
> {
  public supports(value: any): value is SavedCard {
    return value instanceof SavedCard
  }

  public serialize(value: SavedCard): SerializedSavedCard {
    return {
      _t: "c",
      t: value.type,
      n: value.name,
    }
  }
}
