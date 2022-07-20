import React, { useState } from "react"
import { nanoid } from "nanoid"
export default function Lightbox({
  slides,
  backIcon,
  nextIcon,
  closeLightbox,
  currentSlideIndex,
  smallImages,
}) {
  const [slideIndex, setSlideIndex] = useState(+currentSlideIndex)
  const closeSvg = (
    <svg
      className="lbox-btn-svg"
      width="14"
      height="15"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m11.596.782 2.122 2.122L9.12 7.499l4.597 4.597-2.122 2.122L7 9.62l-4.595 4.597-2.122-2.122L4.878 7.5.282 2.904 2.404.782l4.595 4.596L11.596.782Z"
        strokeWidth="0"
        fillRule="evenodd"
      />
    </svg>
  )
  const nSvg = (
    <svg
      className="lbox-btn-svg"
      width="13"
      height="18"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="m2 1 8 8-8 8" strokeWidth="3" fill="none" fillRule="evenodd" />
    </svg>
  )
  const pSvg = (
    <svg
      className="lbox-btn-svg"
      width="12"
      height="18"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M11 1 3 9l8 8" strokeWidth="3" fill="none" fillRule="evenodd" />
    </svg>
  )
  const lightboxStyles = {
    backgroundImage: `url(${slides[slideIndex]})`,
  }

  function select(i) {
    setThumbImages((prev) => {
      return prev.map((el) => {
        return el.index === i
          ? { ...el, clicked: !el.clicked }
          : { ...el, clicked: false }
      })
    })
  }
  const thumbImgs = smallImages.map((img, i) => {
    return { url: img, clicked: false, index: i }
  })
  const [thumbImages, setThumbImages] = useState(thumbImgs)
  const thumbnailImageElements = thumbImages.map((image, i) => (
    <div
      key={nanoid()}
      onClick={() => {
        updateDisplayOnClick(i)
        select(i)
      }}
      className={
        image.clicked
          ? "lbox-thumb-cont clicked-thumb-img"
          : "lbox-thumb-cont lbox-thumb-img"
      }
    >
      <img key={i} src={image.url} alt={`thumbnail ${i}`} />
    </div>
  ))
  function goToPrev() {
    const firstIndex = slideIndex === 0
    const currentIndex = firstIndex ? slides.length - 1 : slideIndex - 1
    setSlideIndex(currentIndex)
    select(currentIndex)
  }
  function goToNext() {
    const lastIndex = slideIndex === slides.length - 1
    const currentIndex = lastIndex ? 0 : slideIndex + 1
    setSlideIndex(currentIndex)
    select(currentIndex)
  }
  function updateDisplayOnClick(slideIndex) {
    setSlideIndex(+slideIndex)
  }
  function stopPrap(e) {
    e.stopPropagation()
  }

  return (
    <div className="dark-bg-lbox" onClick={closeLightbox}>
      <div style={lightboxStyles} className="lbox" onClick={stopPrap}>
        <div className="lbox-btn lbox-btn--close" onClick={closeLightbox}>
          {closeSvg}
        </div>
        <div className="lbox-btn lbox-btn--left" onClick={goToPrev}>
          {pSvg}
        </div>
        <div className="lbox-btn lbox-btn--right" onClick={goToNext}>
          {nSvg}
        </div>
        <div className="thumbnail-cont">{thumbnailImageElements}</div>
      </div>
    </div>
  )
}
