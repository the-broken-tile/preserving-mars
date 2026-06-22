import {
  Context,
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
  JSX,
} from "react"
import { Legacy } from "@/Model"

type ContextShape = {
  legacy: Legacy
  setLegacy: (legacy: Legacy) => void
}
const LegacyContext: Context<ContextShape | undefined> = createContext<
  ContextShape | undefined
>(undefined)

type Props = {
  children: ReactNode
  legacy: Legacy
}

export default LegacyContext
export function useLegacyContext(): ContextShape {
  const context: ContextShape | undefined = useContext(LegacyContext)
  if (context === undefined) {
    throw new Error("useLegacyContext must be within LegacyProvider")
  }

  return context
}
