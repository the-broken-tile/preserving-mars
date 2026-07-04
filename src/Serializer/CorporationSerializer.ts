import { Corporation } from "@/Model"
import { SerializedCorporation } from "./types"
import { DeserializerInterface, SerializerInterface } from "."

export default class CorporationSerializer
  implements SerializerInterface, DeserializerInterface
{
  private key!: string

  public alias(alias: string): void {
    this.key = alias
  }

  public serialize(value: any): SerializedCorporation | undefined {
    return value instanceof Corporation ? [this.key, value.name] : undefined
  }

  public deserialize(value: any): Corporation | undefined {
    return Array.isArray(value) && value[0] === this.key ?
        Corporation.create(value[1])
      : undefined
  }
}
