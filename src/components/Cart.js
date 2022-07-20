import React, { useState } from "react"
import shoeImage from "../images/image-product-1-thumbnail.jpg"
import binIcon from "../images/icon-delete.svg"

export default function Cart({ cartDetails }) {
  const {
    setCart,
    cart,
    discountPrice,
    currentCart,
    removeFromCart,
    setCurrentCart,
    itemCount,
  } = cartDetails
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  })

  const [checkedOut, setCheckedOut] = useState(false)
  function checkOut() {
    setCheckedOut(true)
    setTimeout(() => {
      setCart(false)
      setCurrentCart((prev) => {
        return { ...prev, total: 0, count: 0 }
      })
    }, 2000)
  }
  return (
    <div className="cart">
      <h4>Cart</h4>
      <hr />
      {cart ? (
        <div className="full-cart">
          <img
            className="full-cart__thumbnail"
            src={shoeImage}
            alt="product-img1"
          />
          <div className="full-cart__about-item">
            <p className="full-cart-item-title">autumn limited edition...</p>
            <p>
              {formatter.format(discountPrice)} x {currentCart.count}{" "}
              <span className="full-cart__total">
                {formatter.format(currentCart.total)}
              </span>
            </p>
          </div>
          <img src={binIcon} alt="bin-icon" onClick={removeFromCart} />
          <button
            onClick={checkOut}
            className={cart ? "addToCart-checkout" : "dp-none"}
          >
            {checkedOut ? "Placing Order..." : "Checkout"}
          </button>
        </div>
      ) : (
        <div className="empty-cart">
          <p>
            {checkedOut
              ? "Thank you for your purchase."
              : "Your cart is empty."}
          </p>
        </div>
      )}
    </div>
  )
}
