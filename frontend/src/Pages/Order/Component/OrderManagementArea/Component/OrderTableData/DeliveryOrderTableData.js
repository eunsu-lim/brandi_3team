import React, { Fragment } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Link } from "react-router-dom";

function DeliveryOrderTableData({
  currentPosts,
  handleSingleCheck,
  checkItems,
  loading,
  setCheckItems,
}) {
  if (loading) {
    return (
      <Fragment>
        <h2>Loading...</h2>
      </Fragment>
    );
  }

  // 주문 상태가 숫자로 들어오기때문에
  // 각 숫자에 주문 상태를 key와 value로 만들고,
  // 서버에서 들어오는 주문 상태에 대한 숫자를 넣어줘서
  // 주문 상태를 나타낸다.
  const orderStatus = {
    1: "상품준비",
    2: "배송준비",
    3: "배송중",
    4: "배송완료",
    5: "구매확정",
  };

  const params = useParams();

  return (
    <Fragment>
      <TableRow>
        <td>
          <div>
            <span>
              <TableDataCheckBox
                type={"checkbox"}
                onChange={(e) =>
                  handleSingleCheck(e.target.checked, currentPosts.order_id)
                }
                checked={
                  checkItems.includes(currentPosts.order_id) ? true : false
                }
              />
            </span>
          </div>
        </td>
        <td>{currentPosts.paid_date}</td>
        <td>{currentPosts.updated_at}</td>
        <td>{currentPosts.order_number}</td>
        <td>
          <Link to="/orderdetail">{currentPosts.detailed_order_number}</Link>
        </td>
        <td>{currentPosts.seller_name}</td>
        <td>{currentPosts.product_name}</td>
        <td>{currentPosts.customer_name}</td>
        <td>{currentPosts.phone_number}</td>
        <td>{currentPosts.paid_total.toLocaleString()}</td>
        <td>{orderStatus[currentPosts.order_status_id]}</td>
        {/*  주문 번호에 따른 주문 상태 표시 */}
      </TableRow>
    </Fragment>
  );
}

export default DeliveryOrderTableData;

const TableRow = styled.tr`
  a {
    text-decoration: underline;
  }
`;

const TableDataCheckBox = styled.input``;
