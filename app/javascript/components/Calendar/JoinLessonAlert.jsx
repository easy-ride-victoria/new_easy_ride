import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Radio,
  RadioGroup,
  Stepper,
  Step,
  StepLabel,
} from "@material-ui/core";
import LessonPaymentForm from "./LessonPaymentForm";
import { useStyles } from "./styles";
import Axios from "axios";
import HorseSelect from "./HorseSelect";

const JoinLessonAlert = (props) => {
  const { horses, currentUser, booking_id, onSubmit } = props;
  const styles = useStyles();
  const [rideData, setRideData] = useState({
    user_id: currentUser.id,
    booking_id: booking_id,
    location: "indoors",
    horse_id: 1,
    payment_type: "square",
  });
  const [errors, setErrors] = useState({});
  const [activeStep, setActiveStep] = useState(0);

  const handlePaymentComplete = (lesson_payment_id) => {
    console.log(lesson_payment_id, "lesson_payment_id");
    setRideData({ ...rideData, lesson_payment_id });
  };

  const handleSubmitStep = () => {
    if (activeStep === 0) {
      Axios.post("/api/v1/rides", rideData)
        .then((response) => {
          setActiveStep(activeStep + 1);
          console.log(response, "<<< response");
          setRideData({ ...rideData, id: response.data.data.id });
        })
        .catch((error) => {
          setErrors(error.response.data.error);
        });
    } else {
      Axios.put(`/api/v1/rides/${rideData.id}`, rideData)
        .then(() => {
          setActiveStep(activeStep + 1);
          onSubmit();
        })
        .catch((error) => {
          setErrors(error.response.data.error);
        });
    }
  };

  return (
    <Dialog open={true} onClose={props.onClose}>
      <DialogTitle id="alert-dialog-title">
        Choose a Horse and Payment Method for the Lesson
      </DialogTitle>
      <DialogContent>
        <Stepper activeStep={activeStep}>
          <Step>
            <StepLabel>Select a Horse</StepLabel>
          </Step>
          <Step>
            <StepLabel>Select a Payment Option</StepLabel>
          </Step>
        </Stepper>
        {activeStep === 0 && (
          <HorseSelect
            rideData={rideData}
            setRideData={setRideData}
            errors={errors}
            horses={horses}
          />
        )}
        {activeStep === 1 && (
          <>
            <FormControl>
              <FormLabel id="payment-form-label">Payment Method</FormLabel>
              <RadioGroup
                row
                className="paymentForm"
                label="payment"
                name="Square"
                value={rideData.payment_type}
                onChange={(e) => {
                  setRideData({
                    ...rideData,
                    payment_type: e.target.value,
                  });
                }}
              >
                <FormControlLabel
                  value="square"
                  control={<Radio />}
                  label="Square Payments"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                />
              </RadioGroup>
            </FormControl>

            {rideData.payment_type === "other" && (
              <DialogContentText id="alert-dialog-description">
                For alternative payment methods, please contact an
                administrator.
                <br />
                Email admin@vtra.ca or call (778) 426-0506.
              </DialogContentText>
            )}
            {rideData.payment_type === "square" && (
              <LessonPaymentForm
                amount={props.lesson_price_cad}
                currency="CAD"
                currentUser={props.currentUser}
                onPaymentComplete={handlePaymentComplete}
              />
            )}
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose} color="primary" autoFocus>
          Cancel
        </Button>

        <Button onClick={handleSubmitStep} color="secondary">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default JoinLessonAlert;
