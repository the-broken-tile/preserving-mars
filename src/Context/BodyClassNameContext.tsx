import {
  Context,
  createContext,
  JSX,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react"

type ContextType = {
  body: HTMLElement | null
  setClassName: (className: string) => void
}

const BodyClassNameContext: Context<ContextType> = createContext<ContextType>({
  body: null,
  setClassName: (): void => {},
})

export function useBodyClassName(className: string): ContextType {
  const context: ContextType = useContext(BodyClassNameContext)
  if (context.body === null) {
    throw new Error()
  }

  useEffect((): (() => void) => {
    context.setClassName(className)

    return () => {
      context.setClassName("")
    }
  }, [className, context])

  return context
}

export function BodyClassNameProvider({
  children,
}: {
  children: ReactNode
}): JSX.Element {
  const [body, setBody] = useState<HTMLElement | null>(null)
  useEffect((): void => {
    setBody(document.body)
  }, [])

  const setClassName = (className: string): void => {
    if (body === null) {
      return
    }

    body.className = className
  }

  if (body === null) {
    return <></>
  }

  return (
    <BodyClassNameContext value={{ body, setClassName }}>
      {children}
    </BodyClassNameContext>
  )
}
