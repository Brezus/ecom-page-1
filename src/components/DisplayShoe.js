import React, { useState, useEffect } from "react"
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel"
import "pure-react-carousel/dist/react-carousel.es.css"
import { nanoid } from "nanoid"
import { bigImages, smallImages, nIcon, bIcon } from "../data/images"
import Lightbox from "./Lightbox"
import Thumbnails from "./Thumbnails"

const nextIcon = <img src={nIcon} alt="next img" />
const backIcon = <img src={bIcon} alt="prev img" />
const imagesArray = bigImages.map((img, i) => (
  <img key={nanoid()} src={img} alt={`product-img1${i}`} />
))
export default function DisplayShoe() {
  const [lightboxOn, setLightboxOn] = useState(false)
  const [mainImg, setMainImg] = useState({ bgImg: imagesArray[0], ind: 0 })
  const thumbEls = smallImages.map((img, i) => {
    return { url: img, clicked: false, index: i }
  })
  const [thumbnailImgs, setThumbnailImgs] = useState(thumbEls)
  const thumbnailImagesArray = thumbnailImgs.map((el) => (
    <Thumbnails
      key={nanoid()}
      clicked={el.clicked}
      url={el.url}
      handleClick={clickToChangeMainImage}
      i={el.index}
      setThumbnailImgs={setThumbnailImgs}
      thumbnailImgs={thumbnailImgs}
      select={select}
    />
  ))

  function select(i) {
    setThumbnailImgs((prev) => {
      return prev.map((el) => {
        return el.index === i
          ? { ...el, clicked: !el.clicked }
          : { ...el, clicked: false }
      })
    })
  }
  const imagesHtml = imagesArray.map((img, i) => (
    <Slide key={nanoid()} index={i}>
      {img}
    </Slide>
  ))
  function clickToChangeMainImage(index) {
    setMainImg((prev) => {
      return { bgImg: imagesArray[index], ind: index }
    })
  }
  function openLightbox() {
    setLightboxOn(true)
  }
  function closeLightbox() {
    setLightboxOn(false)
  }

  function handleResize() {
    if (window.innerWidth < 830) {
      setLightboxOn(false)
    }
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <>
      <section className="dp-section">
        {/* this carousel dissapears using media query  */}
        <CarouselProvider
          className="main-dp pure-carousel"
          naturalSlideWidth={100}
          naturalSlideHeight={125}
          totalSlides={imagesArray.length}
          interval={3000}
          isPlaying={false}
        >
          <Slider>{imagesHtml}</Slider>
          <ButtonBack className="carousel-buttons" id="prev-carousel">
            {backIcon}
          </ButtonBack>
          <ButtonNext className="carousel-buttons" id="next-carousel">
            {nextIcon}
          </ButtonNext>
        </CarouselProvider>
        <div className="main-dp my-carousel" onClick={openLightbox}>
          {mainImg.bgImg}
        </div>
        <div className="secondary-dp">{thumbnailImagesArray}</div>
        {lightboxOn && (
          <Lightbox
            closeLightbox={closeLightbox}
            slides={bigImages}
            nextIcon={nIcon}
            backIcon={bIcon}
            currentSlideIndex={mainImg.ind}
            smallImages={smallImages}
          ></Lightbox>
        )}
      </section>
    </>
  )
}
