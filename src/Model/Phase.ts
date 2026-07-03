export const PREPARING = "p"
export const BEFORE = "b"
export const DURING = "d"
export const AFTER = "a"
export const FINISHED = "f"

type Phase = "p" | "b" | "d" | "a" | "f"

export const ADVANCEMENT_MAP: Record<
  Exclude<Phase, "f">,
  Exclude<Phase, "p" | "f">
> = {
  [PREPARING]: BEFORE,
  [BEFORE]: DURING,
  [DURING]: AFTER,
  [AFTER]: BEFORE,
}

export default Phase
