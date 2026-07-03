import { Legacy } from "@/Model"
import { SerializedLegacy } from "@/Serializer"
import { Writeable } from "@/types"
import { DeserializerInterface } from "."

export default class LegacyDeserializer implements DeserializerInterface<
  SerializedLegacy,
  Legacy
> {
  private deserializer!: DeserializerInterface<any, any>

  public supports(value: any): value is SerializedLegacy {
    return Array.isArray(value) && value[0] === "l"
  }

  public deserialize(value: SerializedLegacy): Legacy {
    const l: Writeable<Legacy> = Legacy.create(
      this.deserializer.deserialize(value[6]),
      value[3],
    )
    l.id = value[1]
    l.currentMission = value[2]
    l.phase = value[4]

    if (value[5] !== null) {
      return l.setName(value[5])
    }

    return l as Legacy
  }

  public setDeserializer(deserializer: DeserializerInterface<any, any>): void {
    this.deserializer = deserializer
  }
}
