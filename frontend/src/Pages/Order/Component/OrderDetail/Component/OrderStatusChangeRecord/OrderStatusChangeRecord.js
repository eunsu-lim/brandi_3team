import React from "react";
import styled from "styled-components";
import { ArrowForwardIos } from "@styled-icons/material-sharp/ArrowForwardIos";

function OrderStatusChangeRecord() {
  return (
    <StatusChangeContainer>
      <StatusChangeTitle>
        <ArrowForwardIos size="10" />
        <span>주문상태 변경 이력</span>
      </StatusChangeTitle>
      <StatusChangeBody>
        <table>
          <thead>
            <tr className="th_row">
              <th style={{ width: "20%" }}>날짜</th>
              <th>주문상태</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2020-10-26 14:10:35</td>
              <td>상품준비</td>
            </tr>
            <tr>
              <td>2020-10-26 14:10:35</td>
              <td>결제완료</td>
            </tr>
          </tbody>
        </table>
      </StatusChangeBody>
      <hr />
      <SaveContainer>
        <button>저장</button>
        <button>취소</button>
      </SaveContainer>
    </StatusChangeContainer>
  );
}

export default OrderStatusChangeRecord;

const StatusChangeContainer = styled.div`
  padding: 0 10px 2px 20px;
  margin-bottom: 20px;
  border-radius: 4px 4px 0 0;
  border: 1px solid #eee;
  font-size: 13px;

  label {
    color: #333;
    font-size: 14px;
    height: 38px;
    font-weight: 400;
    margin-top: 1px;
    margin-bottom: 15px;
    margin-left: 5px;
    padding: 0;
  }

  hr {
    margin: 20px 0;
    border: 0;
    border-top: 1px solid #E0DFDF;
    border-bottom: 1px solid #FEFEFE;
}
  }
`;

const StatusChangeTitle = styled.div`
  height: 38px;
  background-color: #eee;
  border-radius: 4px 4px 0 0;
  padding: 10px 10px 2px 10px;
  margin-left: -20px;
  margin-right: -10px;

  span {
    display: inline-block;
    margin-top: 1px;
    margin-left: 5px;
    padding: 0;
    line-height: 16px;
    font-size: 16px;
    font-weight: 400;
    color: #333;
  }
`;

const StatusChangeBody = styled.div`
  padding: 10px 0;
  background-color: #fff;
  border-radius: 0px 0px 4px 4px;

  table {
    width: 100%;
    border: 1px solid #ddd;

    thead {
      background-color: #eee;
    }

    th,
    td {
      border: 1px solid #ddd;
      padding: 8px;
      border-collapse: collapse;
      vertical-align: middle;
    }

    tbody {
      tr:nth-child(odd) {
        background-color: #f9f9f9;
      }

      td {
        border: 1px solid #ddd;
      }
    }
  }
`;

const SaveContainer = styled.div`
  text-align: center;
  margin-bottom: 10px;

  button {
    margin: 0 2px;
  }

  button:nth-child(1) {
    display: inline-block;
    margin-bottom: 0;
    padding: 6px 12px;
    line-height: 1.42857143;
    border: 1px solid transparent;
    border-radius: 4px;
    border-color: #4cae4c;
    background-color: #5cb85c;
    color: #fff;
    font-size: 14px;
    font-weight: 400;
    text-align: center;
    outline: none;
    cursor: pointer;

    &:hover {
      color: #fff;
      background-color: #449d44;
      border-color: #398439;
    }
  }

  button:nth-child(2) {
    display: inline-block;
    margin-bottom: 0;
    padding: 6px 12px;
    line-height: 1.42857143;
    border-radius: 4px;
    border-color: #e5e5e5;
    border: 1px solid transparent;
    border-color: #e5e5e5;
    background-color: #fff;
    color: #333;
    font-size: 14px;
    font-weight: 400;
    text-align: center;
    outline: none;
    cursor: pointer;

    &:hover {
      color: #333;
      background-color: #e6e6e6;
      border-color: #adadad;
    }
  }
`;
