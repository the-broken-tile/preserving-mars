import { JSX } from "react"

import { TitleName } from "@/Model"
import { AdministratorBadge, GovernorBadge, PrefectBadge } from "."

import "./badge.css"

type Props = {
  mission: string
  title: TitleName
}

const MAP: Record<TitleName, (mission: string) => JSX.Element> = {
  Governor: (mission: string): JSX.Element => (
    <GovernorBadge mission={mission} />
  ),
  Administrator: (mission: string): JSX.Element => (
    <AdministratorBadge mission={mission} />
  ),
  Prefect: (mission: string): JSX.Element => <PrefectBadge mission={mission} />,
}

export default function Badge({ title, mission }: Props): JSX.Element {
  return MAP[title](mission)
}
