import React, { useEffect } from "react"
import Cart from "./Cart"
import { nanoid } from "nanoid"
import logo from "../images/logo.svg"
import profPhoto from "../images/image-avatar.png"
import menuIcon from "../images/icon-menu.svg"
import closeIcon from "../images/icon-close.svg"

export default function Nav({ cartInfo }) {
  const {
    openCart,
    setOpenCart,
    notify,
    toggleCart,
    clickedCart,
    setOpenMenu,
    openMenu,
    toggleMenu,
  } = cartInfo
  const navLinks = ["Collections", "Men", "Women", "About", "Contact"]
  const cartSvg = (
    <svg
      className="nav__cart-icon"
      width="22"
      height="20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1l1.031 11.483c.073.828.52 1.726 1.291 2.336C2.83 17.385 4.099 20 6.359 20c1.875 0 3.197-1.87 2.554-3.642h4.905c-.642 1.77.677 3.642 2.555 3.642a2.72 2.72 0 0 0 2.717-2.717 2.72 2.72 0 0 0-2.717-2.717H6.365c-.681 0-1.274-.41-1.53-1.009l14.321-.842a.896.896 0 0 0 .817-.677l1.821-7.283a.897.897 0 0 0-.87-1.114ZM6.358 18.208a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm10.015 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm2.021-7.243-13.8.81-.57-6.341h15.753l-1.383 5.53Z"
        fill={openCart ? "#69707D" : "#8b94a5"}
        fillRule="nonzero"
      />
    </svg>
  )
  const profPicComp = (
    <div
      className={openCart ? "prof-pic open" : "prof-pic"}
      onClick={toggleCart}
      style={{ backgroundImage: `url(${profPhoto})` }}
    ></div>
  )
  // <img className="prof-pic" src={profPhoto} alt="prof-pic" />

  const notificationComp = (
    <div className="notification-cart" tabIndex={0} onClick={toggleCart}>
      {cartSvg}
      {notify && !openCart ? <small>{clickedCart}</small> : null}
    </div>
  )
  const navLinkElements = navLinks.map((item) => {
    return (
      <li key={nanoid()} className="nav-list-item">
        <button onClick={hide} className="nav__button">
          {item}
        </button>
      </li>
    )
  })
  function hide() {
    setOpenMenu(false)
  }

  function handleResize() {
    if (window.innerWidth > 830) {
      setOpenMenu(false)
    }
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <nav className="nav" role={"navigation"}>
      <div className="nav-cont">
        <img
          style={{ position: `${openMenu ? "fixed" : "absolute"}` }}
          className="menu-icon"
          src={openMenu ? closeIcon : menuIcon}
          onClick={() => {
            toggleMenu()
            setOpenCart(false)
          }}
          alt={"menu icon"}
        />
        <img className="logo" src={logo} alt="logo" tabIndex={0} />
        <ul
          className={openMenu ? "nav__ul nav__ul-mobile" : "nav__ul"}
          tabIndex={0}
        >
          {navLinkElements}
        </ul>
        {notificationComp}
        {profPicComp}
        {openCart && <Cart cartDetails={cartInfo} />}
      </div>
    </nav>
  )
}
