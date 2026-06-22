import DeserializerInterface from "./DeserializerInterface"
import { SerializedSavedCard } from "@/Serializer"
import { SavedCard } from "@/Model"

export default class SavedCardDeserializer implements DeserializerInterface<
  SerializedSavedCard,
  SavedCard
> {
  public supports(value: any): value is SerializedSavedCard {
    return value._type === "savedCard"
  }

  public deserialize(value: SerializedSavedCard): SavedCard {
    return new SavedCard(value.name)
  }
}
