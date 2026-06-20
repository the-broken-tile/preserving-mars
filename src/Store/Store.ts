const PREFIX: string = "preserving_mars_"

export default class Store {
  private storage: Storage = window.localStorage

  public get<T>(key: string): T | null {
    const v: string | null = this.storage.getItem(`${PREFIX}${key}`)

    if (v === null) {
      return v
    }

    return JSON.parse(v) as T | null
  }

  public set<T>(key: string, value: T): void {
    this.storage.setItem(`${PREFIX}${key}`, JSON.stringify(value))
  }
}
