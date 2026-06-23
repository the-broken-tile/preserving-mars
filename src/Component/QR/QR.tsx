import QRCode from "qrcode"
import { JSX, useEffect, useState } from "react"

import "./qr.css"

type Props = {
  text: string
  alt: string
}
export default function QR({ alt, text }: Props): JSX.Element {
  const [src, setSrc] = useState("")

  useEffect((): void => {
    QRCode.toDataURL(text).then(setSrc).catch(console.error)
  }, [text])

  if (src === "") {
    return <></>
  }

  return <img className="qr" src={src} alt={alt} />
}
