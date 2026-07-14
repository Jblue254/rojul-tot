import React from 'react'
import { Toaster } from 'sonner'
import { cn } from "@/lib/utils";


function App() {
  return (
    <>
    {/* <Toaster richColors position="top-right" /> */}
        <div className={cn("min-h-screen flex items-center justify-center bg-yellow-400")}>
      <h1 className="text-5xl font-bold">
        RojulTot
      </h1>
    </div>

    </>
  )
}

export default App