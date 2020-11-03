import React, { useState } from "react";
import styled from "styled-components";
import Moment from "react-moment";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from "@material-ui/pickers";

export default function SellerTimePick({ register }) {
  const [selectedDateFrom, handleDateFromChange] = useState(
    new Date("2020-10-28T09:00:00")
  );
  const [selectedDateTo, handleDateToChange] = useState(
    new Date("2020-10-28T18:00:00")
  );

  // console.log("시작", selectedDateFrom);
  // console.log("끝", selectedDateTo);
  return (
    <TimeFromTo>
      <SellerInput>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Moment date={selectedDateFrom}>
            <KeyboardTimePicker
              ampm={true}
              name="FromTime"
              variant="inline"
              placeholder="08:00 AM"
              // value={selectedDateFrom}
              onChange={handleDateFromChange}
              forwardedRef={register({ required: true })}
            />
          </Moment>
        </MuiPickersUtilsProvider>
        <span className="timeFrom">~</span>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardTimePicker
            ampm={true}
            name="ToTime"
            variant="inline"
            placeholder="06:00 PM"
            // value={selectedDateTo}
            onChange={handleDateToChange}
            forwardedRef={register({ required: true })}
          />
        </MuiPickersUtilsProvider>
      </SellerInput>
    </TimeFromTo>
  );
}

const SellerInput = styled.div`
  position: relative;
  ${({ theme }) => theme.flex(null, "center")};
  height: 34px;
  border-radius: 4px;

  input {
    padding: 9px 12px;
    border: none;
    background: none;
    outline: 0;
    &:placeholder {
      color: #ddd;
    }
    &:focus {
      border-radius: 4px;
    }
  }
  .timeFrom {
    margin: 0 12px;
  }
`;

const TimeFromTo = styled.div`
  .MuiFormControl-root {
    height: 35px;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 4px;
    input {
      color: #333;
      font-weight: 300;
      &:placeholder {
        color: #ddd;
      }
    }
  }
  svg {
    margin: 0 !important;
  }
  .MuiInput-underline {
    &:before {
      border-bottom: none;
    }
  }

  &:hover {
    border-bottom: none;
    &:before {
      border-bottom: none;
    }
  }
`;
