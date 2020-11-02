import React from "react";
import {
  Select,
  FormControl,
  FormHelperText,
  MenuItem,
  InputLabel,
} from "@material-ui/core";
import { useStyles } from "./styles";

const HorseSelect = (props) => {
  const styles = useStyles();
  const { rideData, setRideData, errors, horses } = props;

  return (
    <FormControl
      className={styles.formControl}
      error={errors && errors.horse ? true : false}
      fullWidth
      autoFocus
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
        {horses.map((horse) => {
          return (
            <MenuItem value={horse.id} key={horse.id}>
              {horse.attributes.name}
            </MenuItem>
          );
        })}
      </Select>
      <FormHelperText>{errors && errors.horse}</FormHelperText>
    </FormControl>
  );
};
export default HorseSelect;
