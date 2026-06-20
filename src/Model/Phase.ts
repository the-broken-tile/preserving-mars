type Phase =
  | "preparing"
  | "beforeMission"
  | "duringMission"
  | "afterMission"
  | "finished"

export const ADVANCEMENT_MAP: Record<
  Exclude<Phase, "finished">,
  Exclude<Phase, "preparing">
> = {
  preparing: "beforeMission",
  beforeMission: "duringMission",
  duringMission: "afterMission",
  afterMission: "beforeMission",
}

export default Phase
