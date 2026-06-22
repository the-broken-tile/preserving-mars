import { JSX } from "react"
import { Legacy } from "@/Model"
import { legacyRepository } from "@/Repository"
import { useLegacyContext } from "@/Context/LegacyContext"

export default function AfterMissionView(): JSX.Element {
  const { legacy, setLegacy } = useLegacyContext()

  const handleGoBack: VoidFunction = (): void => {
    const l: Legacy = legacy.setPhase("beforeMission")
    legacyRepository.save(l)

    setLegacy(l)
  }
  return (
    <div>
      after
      <br />
      <button onClick={handleGoBack}>Go back</button>
    </div>
  )
}
