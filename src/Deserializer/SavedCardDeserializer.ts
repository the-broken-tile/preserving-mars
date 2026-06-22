import DeserializerInterface from "./DeserializerInterface"
import { SerializedSavedCard } from "@/Serializer"
import { SavedCard } from "@/Model"
import { Writeable } from "@/types"

export default class SavedCardDeserializer implements DeserializerInterface<
  SerializedSavedCard,
  SavedCard
> {
  public supports(value: any): value is SerializedSavedCard {
    return value._type === "savedCard"
  }

  public deserialize(value: SerializedSavedCard): SavedCard {
    const c: Writeable<SavedCard> = new SavedCard(value.name)
    c.id = value.id

    return c
  }
}
