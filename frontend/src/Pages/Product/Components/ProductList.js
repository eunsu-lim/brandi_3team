import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CheckBox from "./CheckBox";
import { ListUl } from "@styled-icons/boxicons-regular";
import { NavigateNext } from "@styled-icons/material";
import { FileExcel } from "@styled-icons/icomoon";
import { Check } from "@styled-icons/bootstrap";
import Pagination from "react-js-pagination";

// 페이지네이션 Button CSS 적용
import "./Pagination.css";

function ProductList({
  productData,
  isMaster,
  sortData,
  setSortData,
  postSortData,
  isChecked,
  setIsChecked,
  handleExcel,
  handleApply,
}) {
  const [pageNumber, setPageNumber] = useState(1); // 현재 Page Number state
  const [applyOption, setApplyOption] = useState(); // 적용 옵션(판매, 진열) state

  //  페이지네이션 button 클릭 시 현재 활성화 된 Page Number state값을 변경하는 함수
  const handlePageChange = (pageNumber) => {
    setPageNumber(pageNumber);
    // 페이지 변경 시 offSet 값을 조건에 맞게 변경
    const offSet = (pageNumber * sortData.limit - sortData.limit).toString();
    // 변경한 offSet을 sortData에서 offset의 value로 저장
    setSortData({ ...sortData, offset: offSet });
  };

  //  sortData의 limit 값이 변경되면(option 변경 시) 서버로 해당 limit 값을 post하는 함수 실행
  useEffect(() => {
    // page 번호를 "1"로 초기화
    setPageNumber(1);
    // offset을 "0"으로 초기화
    setSortData({ ...sortData, offset: "0" });
    // sort data 전송 함수 실행
    postSortData();
  }, [sortData.limit]);

  //  sortData의 offset 값이 변경되면(page 변경 시) 서버로 해당 offset 값을 post하는 함수 실행
  useEffect(() => {
    // sort data 전송 함수 실행
    postSortData();
  }, [sortData.offset]);

  return (
    <ProductListWrap>
      {/* 상품관리 리스트 상단 page bar */}
      <PageBar>
        <ul>
          <li>
            <ListUl />
          </li>
          <li>
            상품관리 / 상품 관리
            <Next />
          </li>
          <li>
            상품관리 관리
            <Next />
          </li>
          <li>리스트</li>
        </ul>
        {/* 상품 리스트 limit select */}
        <Select
          onChange={(e) => {
            // option 변경시 value를 sortData에서 limit의 value로 변경
            setSortData({ ...sortData, limit: e.target.value });
          }}
        >
          <option value="10">10개씩 보기</option>
          <option value="20">20개씩 보기</option>
          <option value="50">50개씩 보기</option>
        </Select>
      </PageBar>
      {/* page bar 밑 button bar */}
      <ButtonBar>
        {/* 선택상품 엑셀 다운로드 button */}
        <ExcelButton value="excel" onClick={(e) => handleExcel(e.target.value)}>
          <FileExcel />
          선택상품 엑셀다운로드
        </ExcelButton>
        {/* 전체상품 엑셀 다운로드 button */}
        <ExcelButton
          value="allExcel"
          onClick={(e) => handleExcel(e.target.value)}
        >
          <FileExcel />
          전체상품 엑셀다운로드
        </ExcelButton>
        {/* 판매여부 select */}
        <SaleSelect
          // option 변경 시 applyOption 상태에 sale을 key, value로 option value를 저장
          onChange={(e) => {
            setApplyOption({ ...applyOption, sale: e.target.value });
          }}
        >
          <option>판매여부</option>
          <option value="Y">판매</option>
          <option value="N">미판매</option>
        </SaleSelect>
        {/* 진열여부 select */}
        <DisplaySelect
          // option 변경 시 applyOption 상태에 display를 key, value로 option value를 저장
          onChange={(e) => {
            setApplyOption({ ...applyOption, display: e.target.value });
          }}
        >
          <option>진열여부</option>
          <option value="Y">진열</option>
          <option value="N">미진열</option>
        </DisplaySelect>
        {/* 적용 Button */}
        <ApplyButton onClick={() => handleApply({ applyOption })}>
          {/* 체크박스 Components 분리 */}
          <Check />
          적용
        </ApplyButton>
      </ButtonBar>
      {/* 상품관리 상품 리스트 */}
      <List>
        {/* 상품관리 리스트 data의 length로 전체 조회건 수 출력 */}
        <p>
          전체 조회건 수 :
          <span> {productData && productData.product_list.length}</span> 건
        </p>
        {/* 상품관리 리스트 table */}
        <ListTable>
          <table>
            {/* 상품관리 리스트 table head */}
            <thead>
              <tr>
                <th>
                  <CheckBox
                    allChecked // 전체 선택 체크박스 여부 props로 전달
                    isChecked={isChecked}
                    setIsChecked={setIsChecked}
                    productData={productData}
                  />
                </th>
                {/* 마스터 계정일 경우에만 등록상태 표시 */}
                {isMaster && <th width="50px">등록상태</th>}
                <th width="90px">등록일</th>
                <th width="86px">대표이미지</th>
                <th>상품명</th>
                <th>상품코드</th>
                <th>상품번호</th>
                {/* 마스터 계정일 경우에만 셀러속성 표시 */}
                {isMaster && <th>셀러속성</th>}
                {/* 마스터 계정일 경우에만 셀러명 표시 */}
                {isMaster && <th>셀러명</th>}
                <th>판매가</th>
                <th>할인가</th>
                <th>판매여부</th>
                <th>진열여부</th>
                <th>할인여부</th>
                <th>구매하기</th>
              </tr>
            </thead>
            {/* 상품관리 리스트 table body */}
            <tbody>
              {/* 상품관리 리스트 data들을 map을 사용해서 table에 한 줄씩 생성 */}
              {productData &&
                productData.product_list.map((list, i) => {
                  return (
                    <tr key={i}>
                      <td>
                        {/* 체크박스 Components 분리 */}
                        <CheckBox
                          listId={list.id}
                          isChecked={isChecked}
                          setIsChecked={setIsChecked}
                          productData={productData}
                        />
                      </td>
                      {isMaster && <td>{list.status}</td>}
                      <td>{list.date}</td>
                      <td>
                        <ImgBox>
                          <img src={list.img} />
                        </ImgBox>
                      </td>
                      <td>{list.name}</td>
                      <td>
                        <a href="">{list.code}</a>
                      </td>
                      <td>{list.number}</td>
                      {isMaster && <td>{list.type}</td>}
                      {isMaster && <td>{list.seller_name}</td>}
                      <td>{list.price}</td>
                      <td>{list.discount_price}</td>
                      <td>{list.sale}</td>
                      <td>{list.display}</td>
                      <td>{list.discount}</td>
                      <td>
                        <GetButton>구매하기</GetButton>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </ListTable>
        {/* 페이지네이션 button */}
        <PageButton>
          <Pagination
            activePage={pageNumber} // 현재 활성화 된 page
            itemsCountPerPage={10} // 한 페이지에 보여줄 list의 갯수
            totalItemsCount={450} // 전체 data의 갯수
            onChange={handlePageChange} // 클릭시 해당 함수를 실행하여 현재 활성화 된 Page Number state값 변경
          />
        </PageButton>
      </List>
    </ProductListWrap>
  );
}

export default ProductList;

const ProductListWrap = styled.div`
  color: #222222;
`;

const PageBar = styled.div`
  ${({ theme }) => theme.flex("space-between", "center")};
  margin-bottom: 10px;
  margin-left: -20px;
  margin-right: -20px;
  padding-left: 10px;
  padding-right: 20px;
  background-color: #eee;
  font-size: 13px;

  ul {
    display: flex;
    align-items: center;
    padding: 8px;
    list-style: none;

    svg {
      margin-right: 4px;
      padding-bottom: 2px;
      width: 20px;
      height: 20px;
    }
  }
`;

const Next = styled(NavigateNext)`
  width: 16px;
  height: 16px;
  color: #999;
`;

const Select = styled.select`
  padding: 2px 10px;
  width: 120px;
  height: 30px;
  line-height: 28px;
  border: 1px solid #999999;
  border-radius: 4px;
  color: #333333;

  &:focus {
    outline: none;
  }
`;

const ButtonBar = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

const ExcelButton = styled.button`
  display: flex;
  margin-left: 5px;
  padding: 1px 5px;
  height: 22px;
  text-align: center;
  align-items: center;
  line-height: 1.5;
  border: 1px solid #4cae4c;
  border-radius: 3px;
  background-color: #5cb85c;
  font-size: 12px;
  font-weight: 400;
  color: #fff;
  cursor: pointer;

  &:hover {
    background-color: #449d44;
    border-color: #398439;
  }

  &:focus {
    outline: none;
  }

  svg {
    margin-right: 4px;
    width: 16px;
    height: 16px;
    color: white;
  }
`;

const ApplyButton = styled(ExcelButton)`
  padding: 5px 10px;
  height: 30px;
  background-color: #f0ad4e;
  border-color: #eea236;
  font-weight: 500;

  &:hover {
    background-color: #ec971f;
    border-color: #d58512;
  }

  &:focus {
    outline: none;
  }

  svg {
    margin: 0;
    width: 20px;
    height: 20px;
    color: white;
  }
`;

const SaleSelect = styled(Select)`
  margin-left: 5px;
`;

const DisplaySelect = styled(SaleSelect)``;

const List = styled.div`
  margin: 10px auto;

  p {
    padding-top: 8px;
    font-size: 13px;
    font-weight: 400;
  }

  span {
    font-weight: 700;
  }
`;

const ListTable = styled.div`
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  margin-bottom: 10px;

  table {
    width: 100%;
    border: 0;

    tbody {
      tr {
        &:nth-child(even) {
          background-color: #fff;
        }

        &:hover {
          background-color: #eee;
        }
      }
    }

    tr {
      border: 1px solid #ddd;
    }

    th {
      padding: 8px;
      line-height: 1.42857143;
      text-align: left;
      vertical-align: middle;
      white-space: nowrap;
      border: 1px solid #ddd;
      font-size: 14px;
      font-weight: 600;
      background-color: #eee;
    }

    td {
      padding: 8px;
      line-height: 1.42857143;
      text-align: left;
      vertical-align: top;
      white-space: nowrap;
      border: 1px solid #ddd;
      font-size: 13px;
    }
  }
`;

const GetButton = styled(ApplyButton)`
  margin-left: 0;
  border: 1px solid #357ebd;
  background-color: #428bca;

  &:hover {
    border-color: #285e8e;
    background-color: #3071a9;
  }
`;

const ImgBox = styled.div`
  display: flex;

  img {
    width: 70px;
    height: 70px;
  }
`;

const PageButton = styled.div`
  display: flex;
  justify-content: center;
  margin: 30px 0 10px 0;
`;
