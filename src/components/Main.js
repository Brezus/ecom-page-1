import React from "react"
import AboutShoe from "./AboutShoe"
import DisplayShoe from "./DisplayShoe"

export default function Main({ count }) {
  return (
    <main className="main">
      <DisplayShoe />
      <AboutShoe logic={count} />
    </main>
  )
}
