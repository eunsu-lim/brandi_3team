import React, { useState } from "react";
import styled from "styled-components";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from "@material-ui/pickers";

export default function SellerTimePick({ checked, register, value, onChange }) {
  console.log("value >>", value);
  return (
    <TimeFromTo>
      <SellerInput>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardTimePicker
            ampm={true}
            variant="inline"
            value={value}
            onChange={onChange}
            forwardedRef={checked ? register({ required: true }) : ""}
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
