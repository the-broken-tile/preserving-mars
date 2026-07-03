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
    return value._t === "l"
  }

  public deserialize(value: SerializedLegacy): Legacy {
    const l: Writeable<Legacy> = Legacy.create(
      this.deserializer.deserialize(value.p),
      value.t,
    )
    l.id = value.i
    l.currentMission = value.c
    l.phase = value.f

    if (value.n !== null) {
      return l.setName(value.n)
    }

    return l as Legacy
  }

  public setDeserializer(deserializer: DeserializerInterface<any, any>): void {
    this.deserializer = deserializer
  }
}
