export const COLORS = [
  "g",
  "u",
  "r",
  "y",
  "b",
  "w",
  "c",
  "o",
  "p",
  "k",
] as const

type Color = (typeof COLORS)[number]

export function chooseNext(colors: Color[]): Color {
  return COLORS.filter((c: Color): boolean => !colors.includes(c)).at(0)!
}

export default Color
