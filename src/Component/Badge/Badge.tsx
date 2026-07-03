import { JSX } from "react"

import { TitleName } from "@/Model"
import { AdministratorBadge, GovernorBadge, PrefectBadge } from "."

import "./badge.css"

type Props = {
  mission: string
  title: TitleName
}

const MAP: Record<TitleName, (mission: string) => JSX.Element> = {
  g: (mission: string): JSX.Element => <GovernorBadge mission={mission} />,
  a: (mission: string): JSX.Element => <AdministratorBadge mission={mission} />,
  p: (mission: string): JSX.Element => <PrefectBadge mission={mission} />,
  n: (): JSX.Element => <></>,
}

export default function Badge({ title, mission }: Props): JSX.Element {
  return MAP[title](mission)
}
