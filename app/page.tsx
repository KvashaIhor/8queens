"use client"

import { EightQueensGame } from "@/components/eight-queens-game"
import Balatro from "@/components/ui/balatro"

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background background-noise">
      <Balatro 
        color1="#ae4e69"
        color2="#f9b357"
        color3="#45294b"
        isRotate={false}
        spinSpeed={2.0}
        contrast={2.5}
        lighting={0.3}
      />
      <EightQueensGame />
    </main>
  )
}
