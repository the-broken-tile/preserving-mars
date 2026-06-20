import { Store } from "@/Store"
import { Legacy } from "@/Model"
import { SerializerInterface, SerializedLegacy } from "@/Serializer"
import { DeserializerInterface } from "@/Deserializer"

const KEY: string = "legacies"
export default class LegacyRepository {
  constructor(
    private readonly store: Store,
    private readonly serializer: SerializerInterface<Legacy, SerializedLegacy>,
    private readonly deserializer: DeserializerInterface<
      SerializedLegacy,
      Legacy
    >,
  ) {}

  public findAll(): Legacy[] {
    return (this.store.get<SerializedLegacy[]>(KEY) ?? []).map(
      (legacy: SerializedLegacy): Legacy =>
        this.deserializer.deserialize(legacy),
      this,
    )
  }

  public save(legacy: Legacy): void {
    let all: Legacy[] = this.findAll()
    const i: number = all.findIndex((l: Legacy): boolean => l.id === legacy.id)

    if (i >= 0) {
      all = [...all.slice(0, i), legacy, ...all.slice(i + 1)]
    } else {
      all.push(legacy)
    }

    this.store.set<SerializedLegacy[]>(
      KEY,
      all.map(
        (l: Legacy): SerializedLegacy => this.serializer.serialize(l),
        this,
      ),
    )
  }
}
