import SerializerInterface from "@/Serializer/SerializerInterface"
import { SavedCard } from "@/Model"

export type SerializedSavedCard = {
  name: string
  id: string
  _type: "savedCard"
}

export default class SavedCardSerializer implements SerializerInterface<
  SavedCard,
  SerializedSavedCard
> {
  public supports(value: any): value is SavedCard {
    return value instanceof SavedCard
  }

  public serialize(value: SavedCard): SerializedSavedCard {
    return {
      _type: "savedCard",
      id: value.id,
      name: value.name,
    }
  }
}
