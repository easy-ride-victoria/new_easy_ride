import "react-square-payment-form/lib/default.css";
import React, { useState } from "react";
import {
  SquarePaymentForm,
  CreditCardNumberInput,
  CreditCardExpirationDateInput,
  CreditCardPostalCodeInput,
  CreditCardCVVInput,
  CreditCardSubmitButton,
} from "react-square-payment-form";
import Axios from "axios";
// import { useStyles } from "./styles";

const LessonPaymentForm = (props) => {
  const [errorMessages, setErrorMessages] = useState([]);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const { amount, currency, currentUser, onPaymentComplete } = props;
  const cardNonceResponseReceived = (
    errors,
    nonce,
    cardData,
    buyerVerificationToken
  ) => {
    if (errors) {
      setErrorMessages(errors.map((error) => error.message));
      return;
    }

    setErrorMessages([]);

    Axios.post("/api/v1/payments", {
      nonce: nonce,
      amount,
      currency,
      token: buyerVerificationToken,
    }).then((response) => {
      console.log(response, "<<<put response");
      onPaymentComplete(JSON.parse(response.data[0]).payment.id);
      setPaymentComplete(true);
    });
  };

  const createVerificationDetails = () => {
    return {
      amount: amount.toString(),
      currencyCode: currency,
      intent: "CHARGE",
      billingContact: {
        familyName: currentUser.attributes.last_name,
        givenName: currentUser.attributes.first_name,
        email: currentUser.attributes.email,
        // country: "CA",
        // city: "Victoria",
        // addressLines: ["1234 This St"],
        // postalCode: "SW7 4JA",
        // phone: "1 250 946 0532",
      },
    };
  };
  if (paymentComplete) {
    return "Lesson Payment Recieved!";
  }
  return (
    <>
      <SquarePaymentForm
        sandbox={true}
        applicationId={process.env.SQUARE_SANDBOX_APPLICATION_ID}
        locationId={process.env.SQUARE_SANDBOX_LOCATION_ID}
        cardNonceResponseReceived={cardNonceResponseReceived}
        createVerificationDetails={createVerificationDetails}
      >
        <fieldset className="sq-fieldset">
          <CreditCardNumberInput />
          <div className="sq-form-third">
            <CreditCardExpirationDateInput />
          </div>

          <div className="sq-form-third">
            <CreditCardPostalCodeInput />
          </div>

          <div className="sq-form-third">
            <CreditCardCVVInput />
          </div>
        </fieldset>

        <CreditCardSubmitButton>Pay ${amount}</CreditCardSubmitButton>
      </SquarePaymentForm>
      <div className="sq-error-message">
        {errorMessages.map((errorMessage) => (
          <li key={`sq-error-${errorMessage}`}>{errorMessage}</li>
        ))}
      </div>
    </>
  );
};

export default LessonPaymentForm;
