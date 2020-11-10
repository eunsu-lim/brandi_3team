import React, { useState, useEffect, Fragment } from "react";
import styled from "styled-components";
import Pagination from "react-js-pagination";
import "./Pagination.css";

function PaginationPart({
  totalPosts,
  postsPerPage,
  currentPage,
  setCurrentPage,
  filterData,
  setFilterData,
  indexOfFirstPost,
}) {
  const [changeValue, setChangeValue] = useState(false);

  const handlePageChange = (pageNumber) => {
    setChangeValue(!changeValue);
    // pageNumber를 인자로 전달해줘서, CurrentPage를 바꾼다.
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    setFilterData({
      ...filterData,
      offset: indexOfFirstPost.toString(),
      // offset: indexOfFirstPost,
    });
  }, [changeValue]);
  return (
    <Fragment>
      <TableFoot>
        <tr>
          <td style={{ border: "none" }}>
            <Pagination
              // 현재 페이지
              activePage={currentPage}
              // total / postsPerPage
              // ex) 500 / 50
              // => 총 10 개의 번호
              itemsCountPerPage={postsPerPage}
              totalItemsCount={totalPosts}
              // 몇 개의 버튼이 생길 지 범위
              pageRangeDisplayed={5}
              onChange={handlePageChange}
            />
          </td>
        </tr>
      </TableFoot>
    </Fragment>
  );
}

export default PaginationPart;

const TableFoot = styled.tfoot`
  display: flex;
  padding: 8px;
  margin: 10px 0;

  td {
    display: flex;
    border: none;

    li {
      list-style: none;
      margin-left: -1px;
      background-color: #fff;
      color: #428bca;

      &:nth-child(1) {
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
      }

      cursor: pointer;
      &:hover,
      &:active {
        background-color: #eee;
      }
    }
  }
`;
