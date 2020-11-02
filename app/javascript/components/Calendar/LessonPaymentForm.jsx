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

const LessonPaymentForm = (props) => {
  const [errorMessages, setErrorMessages] = useState([]);
  const { amount, currency } = props;
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
    alert(
      "nonce created: " +
        nonce +
        ", buyerVerificationToken: " +
        buyerVerificationToken
    );
    Axios.post("/api/v1/payments", {
      nonce: nonce,
      amount,
      currency,
      token: buyerVerificationToken,
    });
  };

  const createVerificationDetails = () => {
    return {
      amount: amount.toString(),
      currencyCode: currency,
      intent: "CHARGE",
      billingContact: {
        familyName: "Smith",
        givenName: "John",
        email: "jsmith@example.com",
        country: "GB",
        city: "London",
        addressLines: ["1235 Emperor's Gate"],
        postalCode: "SW7 4JA",
        phone: "020 7946 0532",
      },
    };
  };

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
