import { Title } from "."
import { t } from "@/i18n"

export default class FullTitle {
  constructor(
    public readonly title: Title,
    public readonly mission: number,
  ) {}

  public toString(): string {
    return t("The %title% of %planet%", {
      title: this.title,
      planet: t(String(this.mission), {}, "missionNames"),
    })
  }
}
