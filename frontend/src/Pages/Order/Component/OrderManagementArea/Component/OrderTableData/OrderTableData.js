import React, { useState, useEffect, Fragment } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Link } from "react-router-dom";

function OrderTableData({
  currentPosts,
  handleSingleCheck,
  checkItems,
  loading,
  setCheckItems,
}) {
  if (!loading) {
    return (
      <Fragment>
        <h2>Loading...</h2>
      </Fragment>
    );
  }

  const history = useHistory();

  return (
    <Fragment>
      <TableRow>
        <td>
          <div>
            <span>
              <TableDataCheckBox
                type={"checkbox"}
                onChange={(e) => handleSingleCheck(e.target.checked, posts.id)}
                checked={checkItems.includes(currentPosts.id) ? true : false}
              />
            </span>
          </div>
        </td>
        <td>{currentPosts.postId}</td>
        <td>{currentPosts.id}</td>
        {/* <td>{currentPosts.paid_on}</td>
        <td>{currentPosts.order_number}</td> */}
        <td>
          <Link to="/orderdetail">{currentPosts.email}</Link>
          {/* <Link to="/orderdetail" onClick={() => history.push("/:id")}>{currentPosts.email}</Link> */}
        </td>
        <td>{currentPosts.name}</td>
        <td>{currentPosts.email}</td>
        <td>{currentPosts.body}</td>
        <td>{currentPosts.quantity}</td>
        <td>{currentPosts.orderer_name}</td>
        <td>{currentPosts.phone_number}</td>
        <td>{currentPosts.payment_amount}</td>
        <td>{currentPosts.order_status}</td>
      </TableRow>
    </Fragment>
  );
}

export default OrderTableData;

const TableRow = styled.tr`
  a {
    text-decoration: underline;
  }
`;

const TableDataCheckBox = styled.input``;
