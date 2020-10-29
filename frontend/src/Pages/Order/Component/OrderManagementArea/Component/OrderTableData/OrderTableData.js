import React, { useState, useEffect, Fragment } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

function OrderTableData({
  data,
  index,
  handleSingleCheck,
  checkItems,
  setCheckItems,
}) {
  return (
    <Fragment>
      <TableRow>
        <td>
          <div>
            <span>
              <TableDataCheckBox
                type={"checkbox"}
                onChange={(e) => handleSingleCheck(e.target.checked, data.id)}
                checked={checkItems.indexOf(data.id) >= 0 ? true : false}
              />
            </span>
          </div>
        </td>
        <td>{data.paid_on}</td>
        <td>{data.order_number}</td>
        <td>
          <Link to="/orderdetail">{data.order_detail_number}</Link>
        </td>
        <td>{data.seller_name}</td>
        <td>{data.product_name}</td>
        <td>{data.option_info}</td>
        <td>{data.quantity}</td>
        <td>{data.orderer_name}</td>
        <td>{data.phone_number}</td>
        <td>{data.payment_amount}</td>
        <td>{data.order_status}</td>
      </TableRow>
    </Fragment>
  );
}

export default OrderTableData;

const TableRow = styled.tr``;

const TableDataCheckBox = styled.input``;
