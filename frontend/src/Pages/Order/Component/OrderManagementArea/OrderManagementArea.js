import React from "react";
import styled from "styled-components";
import { List } from "@styled-icons/open-iconic/List";
import { ArrowForwardIos } from "@styled-icons/material-sharp/ArrowForwardIos";

function OrderManagementArea() {
  return (
    // 네이게이션 바
    <OrderManagementSection>
      <OrderListNav>
        <ul>
          <ListMenu size="16" />
          <li>주문관리</li>
          <ArrowForward size="13" />
          <li>상품준비 관리</li>
          <ArrowForward size="13" />
          <li>상품준비 리스트</li>
        </ul>

        {/* 검색 정렬 */}
        <div>
          <div>
            <select name="" id="">
              <option value="">최신주문일순</option>
              <option value="">주문일의 역순</option>
            </select>
          </div>
          <div>
            <select name="" id="">
              <option value="10">10개씩보기</option>
              <option value="20">20개씩보기</option>
              <option value="50">50개씩보기</option>
              <option value="100">100개씩보기</option>
              <option value="150">150개씩보기</option>
            </select>
          </div>
        </div>
      </OrderListNav>
      {/* 조회건 수 및 주문 취소 버튼 영역 */}
      <NumOfViews>
        <div>
          <span>전체 조회건 수 : </span>
          <span>1,220 건</span>
          <OrderProcessBtn className="firstBtn">배송준비처리</OrderProcessBtn>
          <OrderProcessBtn>주문취소처리</OrderProcessBtn>
          <OrderProcessBtn>배송처리</OrderProcessBtn>
        </div>
        <div>
          <ExcelDownloadBtn>전체주문 엑셀다운로드</ExcelDownloadBtn>
          <ExcelDownloadBtn>선택주문 엑셀다운로드</ExcelDownloadBtn>
        </div>
      </NumOfViews>
      {/* 데이터 테이블 영역 */}
      <DataTableArea>
        <table>
          <thead>
            <tr>
              <th>
                <div>
                  <span>
                    <input type="checkbox" />
                  </span>
                </div>
              </th>
              <th>결제일자</th>
              <th>주문번호</th>
              <th>주문상세번호</th>
              <th>셀러명</th>
              <th>상품명</th>
              <th>옵션정보</th>
              <th>수량</th>
              <th>주문자명</th>
              <th>핸드폰번호</th>
              <th>결제금액</th>
              <th>주문상태</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div>
                  <span>
                    <input type="checkbox" />
                  </span>
                </div>
              </td>
              <td>2020-10-21 15:42:14</td>
              <td>20201021000053000</td>
              <td>
                <a href="">B2020102100035001</a>
              </td>
              <td>메종셀린</td>
              <td>U넥 반팔 티셔츠_메종셀린</td>
              <td>소라/Free</td>
              <td>1</td>
              <td>이성현</td>
              <td>010-4664-7852</td>
              <td>11,700</td>
              <td>상품준비</td>
            </tr>
            <tr>
              <td>
                <div>
                  <span>
                    <input type="checkbox" />
                  </span>
                </div>
              </td>
              <td>2020-10-21 15:42:14</td>
              <td>20201021000053000</td>
              <td>
                <a href="">B2020102100035001</a>
              </td>
              <td>메종셀린</td>
              <td>U넥 반팔 티셔츠_메종셀린</td>
              <td>소라/Free</td>
              <td>1</td>
              <td>이성현</td>
              <td>010-4664-7852</td>
              <td>11,700</td>
              <td>상품준비</td>
            </tr>
            <tr>
              <td>
                <div>
                  <span>
                    <input type="checkbox" />
                  </span>
                </div>
              </td>
              <td>2020-10-21 15:42:14</td>
              <td>20201021000053000</td>
              <td>
                <a href="">B2020102100035001</a>
              </td>
              <td>메종셀린</td>
              <td>U넥 반팔 티셔츠_메종셀린</td>
              <td>소라/Free</td>
              <td>1</td>
              <td>이성현</td>
              <td>010-4664-7852</td>
              <td>11,700</td>
              <td>상품준비</td>
            </tr>
          </tbody>

          {/* 페이지네이션 영역 */}
          <div className="tfoot">
            <ul>
              <li>
                <a href="">1</a>
              </li>
              <li>
                <a href="">2</a>
              </li>
              <li>
                <a href="">Next</a>
              </li>
            </ul>
          </div>
        </table>
      </DataTableArea>
      {/* 하단 작업 버튼 영역 */}
      <BottomArea>
        <div>
          <OrderProcessBtn>배송준비처리</OrderProcessBtn>
          <OrderProcessBtn>주문취소처리</OrderProcessBtn>
        </div>
        <div>
          <ExcelDownloadBtn>전체주문 엑셀다운로드</ExcelDownloadBtn>
          <ExcelDownloadBtn>선택주문 엑셀다운로드</ExcelDownloadBtn>
        </div>
      </BottomArea>
    </OrderManagementSection>
  );
}

export default OrderManagementArea;

const OrderManagementSection = styled.section``;

const ListMenu = styled(List)``;

const ArrowForward = styled(ArrowForwardIos)``;

const OrderListNav = styled.nav`
  display: flex;
  background-color: #eeeeee;
  margin-bottom: 10px;
  justify-content: space-between;

  ul {
    display: flex;
    align-items: center;
    padding: 8px;

    li {
      padding: 0 5px;
      cursor: default;
    }
  }

  div {
    display: flex;

    select {
      border: 1px solid #e5e5e5;
      padding: 2px 10px;
      outline: none;
      border-radius: 4px;
    }
  }
`;

const NumOfViews = styled.div`
  display: flex;
  justify-content: space-between;

  .firstBtn {
    margin-left: 20px;
  }
`;

const OrderProcessBtn = styled.button`
  margin: 0 2px;
  padding: 1px 5px;
  background-color: #3071a9;
  border-radius: 3px;
  border-color: #285e8e;
  line-height: 1.5;
  color: #fff;
  font-size: 12px;
`;

const ExcelDownloadBtn = styled.button`
  margin: 0 2px;
  padding: 1px 5px;
  line-height: 1.5;
  border-radius: 3px;
  border-color: #4cae4c;
  background-color: #5cb85c;
  color: #fff;
  font-size: 12px;
`;

const BottomArea = styled.footer`
  display: flex;
  justify-content: space-between;
`;

const DataTableArea = styled.article`
  width: 100%;
  margin: 10px 0;
  border: 1px solid #dddddd;

  table {
    width: 100%;
    display: block;
    overflow-x: auto;
    white-space: nowrap;
  }

  th,
  td {
    border: 1px solid #ddd;
    padding: 8px;
    border-collapse: collapse;
  }

  th {
    text-align: left;
    background-color: #eee;
    font-size: 14px;
  }

  tr {
    input {
      width: 19px;
      height: 19px;
    }

    td {
      font-size: 13px;
    }
  }

  tr:nth-child(odd) {
    background-color: #f9f9f9;
  }

  tr:nth-child(even) {
    &:hover {
      background-color: #f9f9f9;
    }
  }

  .tfoot {
    margin: 10px 0;
  }
`;
