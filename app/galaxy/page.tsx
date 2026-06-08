'use client'

import { SpiralAnimation } from "@/components/ui/spiral-animation"

export default function GalaxyPage() {
  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden bg-black">
      <SpiralAnimation />
    </div>
  )
}
