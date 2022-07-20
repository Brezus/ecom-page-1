import React from "react"
import { nanoid } from "nanoid"

export default function Thumbnails({ clicked, url, handleClick, i, select }) {
  return (
    <>
      <div
        className={!clicked ? "thumb-div" : "clicked-thumb-div"}
        key={nanoid()}
        onClick={() => {
          handleClick(i)
          select(i)
        }}
      >
        <img
          key={nanoid()}
          className="thumbnail"
          src={url}
          alt={`product-img${i}`}
        />
      </div>
    </>
  )
}
