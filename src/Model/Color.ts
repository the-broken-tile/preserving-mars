export const COLORS = [
  "green",
  "blue",
  "red",
  "yellow",
  "black",
  "white",
  "cyan",
  "orange",
  "purple",
  "pink",
] as const

type Color = (typeof COLORS)[number]

export function chooseNext(colors: Color[]): Color {
  return COLORS.filter((c: Color): boolean => !colors.includes(c)).at(0)!
}

export default Color
