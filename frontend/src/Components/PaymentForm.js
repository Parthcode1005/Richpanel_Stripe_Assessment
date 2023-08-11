import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import axios from "axios"
import React, { useState } from 'react'


const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "black",
      color: "black"
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee"
    }
  }
}

export default function PaymentForm() {
  const stripe = useStripe()
  const elements = useElements()


  const handleSubmit = async (e) => {
    e.preventDefault()
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement)
    })


    if (!error) {
      try {
        const { id } = paymentMethod
        const response = await axios.post("http://localhost:4000/payment", {
          amount: 1000,
          id
        })

        if (response.data.success) {
          console.log("Successful payment")
        }

      } catch (error) {
        console.log("Error", error)
      }
    } else {
      console.log(error.message)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <CardElement color='black' options={CARD_OPTIONS} />
      </form>

    </>
  )
}