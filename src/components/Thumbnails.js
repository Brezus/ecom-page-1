import React from "react"
import { nanoid } from "nanoid"

export default function Thumbnails({ clicked, url, handleClick, i, select }) {
  const thumbnailBg = {
    backgroundImage: `url(${url})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "20%",
  }
  return (
    <>
      <div
        style={thumbnailBg}
        className={!clicked ? "thumb-div" : "clicked-thumb-div"}
        key={nanoid()}
        onClick={() => {
          handleClick(i)
          select(i)
        }}
      ></div>
    </>
  )
}
