import IdentityInterface from "@/Model/IdentityInterface"

export default class Corporation implements IdentityInterface<Corporation> {
  private static nextId: number = 1
  private readonly id: string
  private constructor(public readonly name: string) {
    this.id = Corporation.id
  }
  public is(other: Corporation): boolean {
    return other.id === this.id
  }

  private static get id(): string {
    try {
      return String(Corporation.nextId)
    } finally {
      Corporation.nextId++
    }
  }

  public static create(name: string = ""): Corporation {
    return new Corporation(name)
  }

  public setName(name: string): Corporation {
    return new Corporation(name)
  }
}
