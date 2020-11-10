import React, { useState, useEffect } from "react";
import OrderTableData from "./Component/OrderTableData/OrderTableData";
import PaginationPart from "./Component/PaginationPart/PaginationPart";
import choiApi from "../../../../Config/api";
import { useHistory } from "react-router-dom";
import axios from "axios";
import TableDataHeader from "../../Data/TableDataHeader";
import styled from "styled-components";
import { List } from "@styled-icons/open-iconic/List";
import { ArrowForwardIos } from "@styled-icons/material-sharp/ArrowForwardIos";
import { FileExcel } from "@styled-icons/fa-regular/FileExcel";

function OrderManagementArea({
  posts,
  setPosts,
  currentPosts,
  loading,
  postsPerPage,
  totalPosts,
  currentPage,
  setCurrentPage,
  handleDataNumber,
  filterData,
  setFilterData,
  postFilterData,
  indexOfFirstPost,
}) {
  // 체크된 상품들을 담는 state
  const [checkItems, setCheckItems] = useState([]);
  const [changeValue, setChangeValue] = useState(false);
  const [tableHead, setTableHead] = useState([]);

  // th 데이터를 mock data로 가져옵니다.
  useEffect(() => {
    axios
      .request({
        method: "GET",
        url: `http://localhost:3042/public/Data/OrderTableDataHeader.json`,
        // headers: {
        // "Content-Type": "application/json",
        // Authorization: localStorage.getItem("access_token"),
        // },
      })
      // axios 사용할 때, 들어오는 데이터에 data라는 키 값이 생긴다.
      .then((res) =>
        setTableHead(res.data.data.order_table_data[0].product_header)
      );
  }, []);

  const history = useHistory();

  // handleDelivery를 클릭했을 때, 체크한 상품들을
  // 서버에 POST를 하고, 배송중 페이지(/order/3)로 이동하도록합니다.
  const handleDelivery = async () => {
    if (checkItems.length === 0) {
      alert("배송준비 처리할 주문건을 선택해주세요.");
    } else {
      const res = await fetch(`${choiApi}/orders/status-updates`, {
        method: "POST",
        headers: {
          // Content-Type으로 application/json을 사용합니다.
          // 인가가 반복, 받을 때랑 없을 때랑 생각하면서 코드 작성
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("access_token"),
        },
        body: JSON.stringify({
          // 주문 상태 id
          order_status_id: 3, // 주문상태: 배송 중
          // 체크된 상품들의 id를 넣어서, array에 넣습니다.
          order_id: checkItems,
          // order_id: [67],
        }),
      })
        // post를 request 한 후에, 변경된 데이터를 다시 get 해줍니다.
        .then((res) =>
          axios
            .get(`${choiApi}/orders/lists/1`, {
              headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("access_token"),
              },
            })
            .then((res) => setPosts(res.data.order_lists))
        );
    }
  };

  // 주문일 최신/역순 select 함수
  const handleSortDate = async (e) => {
    const { value } = e.target;
    if (value === "최신주문일순") {
      setCurrentPage(1);
      // 최신 주문일순(1)이면 1을 filterData에 저장해서 서버에 보낼 준비를한다.
      // state 초기값과 type이 같은 지 확인합니다.
      setFilterData({ ...filterData, filter_ordering: "1" });
    } else {
      setCurrentPage(1);
      // 역순(2)이면 2를 filterData에 저장해서 서버에 보낼 준비를한다.
      // state 초기값과 type이 같은 지 확인합니다.
      setFilterData({ ...filterData, filter_ordering: "2" });
    }

    // changeValue 상태를 변경해서 아래 select를 실행합니다.
    setChangeValue(!changeValue);
  };

  // 체크박스 전체 단일 개체 선택

  const handleSingleCheck = (checked, id) => {
    if (checked) {
      setCheckItems([...checkItems, id]);
    } else {
      // 체크 해제
      setCheckItems(checkItems.filter((el) => el !== id));
    }

    // setFilterData && setFilterData({ ...filterData, checkItems: checkItems });
  };

  // 체크박스 전체 선택
  const handleAllCheck = (checked) => {
    if (checked) {
      const idArray = [];
      // 전체 체크 박스가 체크 되면 id를 가진 모든 elements를 배열에 넣어주어서,
      // 전체 체크 박스 체크
      currentPosts.forEach((el) => idArray.push(el.order_id));
      setCheckItems(idArray);
    }
    // 반대의 경우 전체 체크 박스 체크 삭제
    else {
      setCheckItems([]);
    }
    // setChangeValue(!changeValue);

    // setFilterData({ ...filterData, allCheck: checkItems });
  };

  // 화면에 보이는 데이터의 수를 select하는 함수
  const handleChange = (e) => {
    handleDataNumber(e);
    setCheckItems([]);
    // 비동기 해결하기 위해서 만든 state
    setChangeValue(!changeValue);
  };

  // 함수 밖에서 useEffect를 사용해서
  // 테이블에 보여주는 posts 상태 값을 업데이트합니다..
  useEffect(() => {
    async function fetchData() {
      const result = await axios
        .get(`${choiApi}/orders/lists/1`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("access_token"),
          },
          params: {
            // 이전에 추가한 filter 속성들을 다 가져옵니다.
            ...filterData,
            offset: indexOfFirstPost,
            limit: postsPerPage,
            // filter_ordering: filterData,
            filter_ordering: filterData.filter_ordering,
          },
        })
        .then((res) => setPosts(res.data.order_lists));
    }

    fetchData();
    // 아래 state가 변경될 때만 실행합니다.
  }, [changeValue]);

  // 엑셀 다운로드 서버에 보낼 정보
  // const handleExcel = (e) => {
  //   const { value } = e.target;
  //   const excelData = [];
  //   // button의 value가 "excelAll"이면
  //   if (value === "excelAll") {
  //     // 전체 데이터의 id 값을 excelData에 배열로 저장한다.
  //     posts.id.map((el) => {
  //       excelData.push(el.id);
  //     });
  //   }
  //   // button의 value가 "excelSelected"면 id값을 넣어준다.
  //   else {
  //     checkItems.id.map((el) => {
  //       excelData.push(el.id);
  //     });
  //   }
  // };

  return (
    // 네이게이션 바
    <OrderManagementSection>
      <OrderListNav>
        <ul>
          <List size="16" />
          <li>주문관리</li>
          <ArrowForwardIos size="13" />
          <li>상품준비 관리</li>
          <ArrowForwardIos size="13" />
          <li>상품준비 리스트</li>
        </ul>

        {/* 검색 정렬 */}
        <div>
          <div>
            <select name="" id="" onChange={handleSortDate}>
              <option value="최신주문일순">최신주문일순</option>
              <option value="주문일의 역순">주문일의 역순</option>
            </select>
          </div>
          <div>
            <select name="" id="" defaultValue="50" onChange={handleChange}>
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
          <span>{posts.length}건</span>
          <OrderProcessBtn
            className="firstBtn"
            onClick={() => handleDelivery()}
          >
            배송처리
          </OrderProcessBtn>
        </div>
        <div>
          <ExcelDownloadBtn
            value="excelAll"
            // onClick={handleExcel}
          >
            <FileExcel size="15" />
            전체주문 엑셀다운로드
          </ExcelDownloadBtn>
          <ExcelDownloadBtn
            value="excelSelected"
            // onClick={handleExcel}
          >
            <FileExcel size="15" />
            선택주문 엑셀다운로드
          </ExcelDownloadBtn>
        </div>
      </NumOfViews>
      {/* 데이터 테이블 영역 */}
      <DataTableArea>
        <table>
          <thead>
            <tr>
              <th style={{ width: "19px" }}>
                <div>
                  <span>
                    <TableHeadCheckBox
                      name="checkAll"
                      type={"checkbox"}
                      onChange={(e) => handleAllCheck(e.target.checked)}
                      // 하나라도 빼면 체크 박스 해제
                      // 체크된 아이템의 수와 페이지에 보이는 수가 같을 때만 전체 체크
                      checked={
                        // 체크된 아이템의 갯 수와 들어오는 데이터의 길이가 같을 때만 전체 체크!
                        currentPosts.length !== 0 &&
                        checkItems.length === currentPosts.length
                          ? true
                          : false
                      }
                    />
                  </span>
                </div>
              </th>
              {tableHead &&
                tableHead.map((el, index) => <th key={index}>{el}</th>)}
            </tr>
          </thead>
          <tbody>
            {currentPosts.map((el, index) => (
              <OrderTableData
                currentPosts={el}
                key={index}
                checkItems={checkItems}
                setCheckItems={setCheckItems}
                handleSingleCheck={handleSingleCheck}
                loading={loading}
              />
            ))}
          </tbody>

          {/* 페이지네이션 영역 */}
          {/* 들어오는 데이터의 수가 10개 이상일 때만, */}
          {/* 페이지네이션 버튼을 나타냅니다. */}
          {posts.length >= 10 ? (
            <PaginationPart
              // paginate={paginate}
              totalPosts={totalPosts}
              postsPerPage={postsPerPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              filterData={filterData}
              setFilterData={setFilterData}
              postFilterData={postFilterData}
              indexOfFirstPost={indexOfFirstPost}
            />
          ) : null}
        </table>
      </DataTableArea>
      {/* 하단 작업 버튼 영역 */}
      <BottomArea>
        <div>
          <ExcelDownloadBtn
            value="excelAll"
            // onClick={handleExcel}
          >
            <FileExcel size="15" />
            전체주문 엑셀다운로드
          </ExcelDownloadBtn>
          <ExcelDownloadBtn
            value="excelSelected"
            // onClick={handleExcel}
          >
            <FileExcel size="15" />
            선택주문 엑셀다운로드
          </ExcelDownloadBtn>
        </div>
      </BottomArea>
    </OrderManagementSection>
  );
}

export default OrderManagementArea;

const OrderManagementSection = styled.section``;

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

  span {
    font-size: 13px;

    &:nth-child(2) {
      font-weight: bold;
    }
  }

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
  outline: none;
  border: none;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
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
  outline: none;
  border: none;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

const DataTableArea = styled.article`
  margin: 10px 0;
  border: 1px solid #dddddd;
  overflow: scroll;

  table {
    width: 100%;
    white-space: nowrap;
  }

  th,
  td {
    border: 1px solid #ddd;
    padding: 8px;
    border-collapse: collapse;
    vertical-align: middle;

    &:first-child {
      width: 19px;
    }
  }

  th {
    text-align: left;
    background-color: #eee;
    font-size: 14px;
  }

  tr {
    td {
      font-size: 13px;

      a {
        color: #0d638f;

        &:hover {
          text-decoration: underline;
        }
      }
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
`;

const TableHeadCheckBox = styled.input`
  input {
    width: 19px;
    height: 19px;
  }
`;

const BottomArea = styled.footer`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 55px;
`;
