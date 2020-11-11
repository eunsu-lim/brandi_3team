import React from "react";
import styled from "styled-components";

export default function MemberTable({ sellerList, setSellerList }) {
  return (
    <TableContainer>
      <SellerTable>
        <thead>
          <tr>
            <th>
              <input type="checkbox" />
            </th>
            <th>번호</th>
            <th>셀러아이디</th>
            <th>영문이름</th>
            <th>힌글이름</th>
            <th>담당자이름</th>
            <th>셀러상태</th>
            <th>담당자 연락처</th>
            <th>담당자 이메일</th>
            <th>셀러속성</th>
            <th>등록일시</th>
            <th>Actions</th>
          </tr>
          <tr className="inputBox">
            <td></td>
            <td>
              <input type="number" />
            </td>
            <td>
              <input type="text" />
            </td>
            <td>
              <input type="text" />
            </td>
            <td>
              <input type="text" />
            </td>
            <td>
              <input type="text" />
            </td>
            <td>
              <select>
                <option>Select</option>
                <option>입점대기</option>
                <option>입점</option>
                <option>퇴점</option>
                <option>퇴점대기</option>
                <option>휴점</option>
              </select>
            </td>
            <td>
              <input type="text" />
            </td>
            <td>
              <input type="text" />
            </td>
            <td>
              <select>
                <option>Select</option>
                <option>쇼핑몰</option>
                <option>마켓</option>
                <option>로드샵</option>
                <option>디자이너브랜드</option>
                <option>제네럴브랜드</option>
                <option>내셔널브랜드</option>
                <option>뷰티</option>
              </select>
            </td>
            <td>
              <div data-date-format="yyyy-mm-dd">
                <input
                  type="text"
                  name="seller_regist_dete_from"
                  placeholder="From"
                />
              </div>
              <div data-date-format="yyyy-mm-dd">
                <input
                  type="text"
                  name="seller_regist_dete_from"
                  placeholder="To"
                />
              </div>
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input type="checkbox" />
            </td>
            <td>22328</td>
            <td>brandtest1023</td>
            <td>brandtest1023</td>
            <td>브랜드테스트102</td>
            <td>이정필</td>
            <td>입점</td>
            <td>010-8516-1399</td>
            <td>leejp@brandi.co.kr</td>
            <td>쇼핑몰</td>
            <td>2020-10-23 16:21:51</td>
            <td>
              <BtnWarning>휴점 신청</BtnWarning>
              <BtnDanger>퇴점 신청처리</BtnDanger>
              <BtnInfo>입점 승인</BtnInfo>
              <BtnDanger>입점 거절</BtnDanger>
              <BtnSuccess>휴점 해제</BtnSuccess>
            </td>
          </tr>
          {sellerList.map((user, i) => {
            return (
              <tr key={i}>
                <td>
                  <input type="checkbox" />
                </td>
                <td>{user.num}</td>
                <td>{user.sellerId}</td>
                <td>{user.sellerNameEn}</td>
                <td>{user.sellerNameKo}</td>
                <td>{user.chargerName}</td>
                <td>{user.status}</td>
                <td>{user.chrgerTel}</td>
                <td>{user.chrgerEmail}</td>
                <td>{user.chargerAttr}</td>
                <td>{user.sellerTime}</td>
                <td></td>
              </tr>
            );
          })}
        </tbody>
      </SellerTable>
    </TableContainer>
  );
}

const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  border: 1px solid #dddddd;
  margin: 10px 0;
`;

const SellerTable = styled.table`
  width: 100%;
  thead {
    th {
      background: #eee;
      font-size: 14px;
      font-weight: 600;
      text-align: left;
    }
    .inputBox {
      input,
      select {
        padding: 6px 10px;
        font-size: 13px;
        font-weight: normal;
        color: #333333;
        background-color: white;
        border: 1px solid #e5e5e5;
        border-radius: 4px;
      }
    }
  }

  tr,
  th,
  td {
    padding: 8px;
    border: 1px solid #ddd;
    white-space: nowrap;
    line-height: 1.8;
  }
  td {
    color: #222;
    font-size: 13px;
    button {
      margin-right: 4px;
      padding: 1px 5px;
      font-size: 12px;
      line-height: 1.5;
      border-radius: 3px;
      color: #fff;
      border: none;
      cursor: pointer;
    }
  }
  tbody {
    tr:nth-child(odd) {
      background-color: #fff;
    }
    tr:nth-child(even) {
      background-color: #f9f9f9;
    }
  }
`;

const BtnWarning = styled.button`
  background-color: #f0ad4e;
`;

const BtnDanger = styled.button`
  background-color: #d9534f;
`;

const BtnInfo = styled.button`
  background-color: #5bc0de;
`;

const BtnSuccess = styled.button`
  background-color: #5cb85c;
`;
