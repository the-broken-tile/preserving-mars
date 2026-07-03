import { SerializedSavedCard } from "@/Serializer"
import { SavedCard } from "@/Model"
import { DeserializerInterface } from "."

export default class SavedCardDeserializer implements DeserializerInterface<
  SerializedSavedCard,
  SavedCard
> {
  public supports(value: any): value is SerializedSavedCard {
    return value._t === "c"
  }

  public deserialize(value: SerializedSavedCard): SavedCard {
    return new SavedCard(value.n, value.t)
  }
}
