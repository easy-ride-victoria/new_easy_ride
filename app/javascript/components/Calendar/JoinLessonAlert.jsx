import React, { useState } from "react";
import {
  Button,
  Select,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  MenuItem,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import LessonPaymentForm from "./LessonPaymentForm";

const JoinLessonAlert = (props) => {
  const [rideData, setRideData] = useState({
    user_id: props.currentUser.id,
    booking_id: props.booking_id,
    location: "indoors",
    horse_id: null,
    payment_type: "square",
  });
  const [errors, setErrors] = useState({});

  return (
    <Dialog open={true} onClose={props.onClose}>
      <DialogTitle id="alert-dialog-title">
        Choose a Horse and Payment Method for the Lesson
      </DialogTitle>
      <DialogContent>
        <FormControl
          // className={styles.formControl}
          error={errors && errors.horse ? true : false}
          fullWidth
        >
          <InputLabel id="horse-select-label">Horse</InputLabel>
          <Select
            labelId="horse-select-label"
            id="horse-select"
            value={rideData.horse_id}
            onChange={(e) =>
              setRideData({
                ...rideData,
                horse_id: Number(e.target.value),
              })
            }
          >
            {props.horses.map((horse) => {
              return (
                <MenuItem value={horse.id} key={horse.id}>
                  {horse.attributes.name}
                </MenuItem>
              );
            })}
          </Select>
          <FormHelperText>{errors && errors.horse}</FormHelperText>
        </FormControl>
        <FormControl component="fieldset">
          <FormLabel component="legend">Payment</FormLabel>
          <RadioGroup
            aria-label="payment"
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
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>
        </FormControl>
        {rideData.payment_type === "square" && (
          <LessonPaymentForm amount={props.lesson_price_cad} currency="CAD" />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose} color="primary" autoFocus>
          Cancel
        </Button>
        <Button onClick={props.onSubmit} color="secondary">
          Join
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default JoinLessonAlert;
