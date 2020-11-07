import React, { useState, useEffect, Fragment } from "react";
import styled from "styled-components";
import Pagination from "react-js-pagination";
import "./Pagination.css";

function PaginationPart({
  totalPosts,
  // paginate,
  postsPerPage,
  currentPage,
  setCurrentPage,
  filterData,
  setFilterData,
  indexOfFirstPost,
}) {
  const [changeValue, setChangeValue] = useState(false);

  const handlePageChange = (pageNumber) => {
    // setCurrentPage({ activePage: pageNumber });

    // 제거 예정
    // 부모 컴포넌트(order)에 있는 paginate 함수는
    // 'pageNumber' 인자가 들어가서
    // setCurrentPage의 state를 바꾼다
    // paginate(pageNumber);

    setChangeValue(!changeValue);
    // pageNumber를 인자로 전달해줘서, CurrentPage를 바꾼다.
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    setFilterData({
      ...filterData,
      offset: indexOfFirstPost.toString(),
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
      /* padding: 6px 12px; */
      background-color: #fff;
      /* border: 1px solid #ddd; */
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

// 페이지 네이션 부분(직접 구현 시 참고)

// import { ChevronsLeft } from "@styled-icons/boxicons-regular/ChevronsLeft";
// import { ChevronLeft } from "@styled-icons/boxicons-regular/ChevronLeft";
// import { ChevronRight } from "@styled-icons/boxicons-regular/ChevronRight";
// import { ChevronsRight } from "@styled-icons/boxicons-regular/ChevronsRight";

// Pagination 버튼 부분
// const pageNumbers = [];
// const pages = Math.ceil(totalPosts / postsPerPage);

// for (let i = 1; i <= pages; i++) {
//   if (i === currentPage) {
//     pageNumbers.push(i);
//   }
// else if (i < 3 || i > pages - 2) {
//   pageNumbers.push(i);
// }
// pageNumbers.push(i);
// }

// // 페이지네이션 button을 클릭 할 때, 현재 활성화 된 currentPage state 값을 변경하는 함수
// const handlePagination = (currenPage) => {
//   setCurrentPage(currentPage);
//   // 페이지를 변경할 때, offset 값을 조건에 맞게 변경한다.
//   const offset = (
//     currentPage * filterData.limit -
//     filterData.limit
//   ).toString();
//   // 변경한 offset을 filterData에서 offset의 value로 저장한다.
//   setFilterData({ ...filterData, offset: offset });
// };

// 페이지네이션 직접 작성 시
/* 
<td> 사이에 넣으면 된다.
 {currentPage > 5 ? (
              <Fragment>
                <li
                  onClick={() => {
                    setCurrentPage(1);
                    setFilterData({
                      ...filterData,
                      offset: indexOfFirstPost.toString(),
                    });
                  }}
                >
                  <a>
                    <ChevronsLeft size="18" />
                  </a>
                </li>
              </Fragment>
            ) : (
              false
            )}

            {currentPage === 1 ? (
              false
            ) : (
              <Fragment>
                <li
                  onClick={() => {
                    setCurrentPage(currentPage - 1);
                    setFilterData({
                      ...filterData,
                      //  offset 설정 string ? number? === JSON으로 보내면 어쨌든 string
                      offset: indexOfFirstPost.toString(),
                    });
                  }}
                >
                  <a>
                    <ChevronLeft size="18" />
                  </a>
                </li>
              </Fragment>
            )}
            {pageNumbers.map((number) => (
              <PaginateNumber onClick={() => paginate(number)} key={number}>
                <a>{number}</a>
              </PaginateNumber>
            ))}
            {currentPage === pages ? (
              false
            ) : (
              <li
                onClick={() => {
                  setCurrentPage(currentPage + 1);
                  setFilterData({
                    ...filterData,
                    //  offset 설정 string ? number? === JSON으로 보내면 어쨌든 string
                    offset: indexOfFirstPost.toString(),
                  });
                }}
              >
                <a>
                  <ChevronRight size="18" />
                </a>
              </li>
            )}
            {currentPage === pages ? (
              false
            ) : (
              <li
                onClick={() => {
                  setCurrentPage(pages);
                  setFilterData({
                    ...filterData,
                    offset: indexOfFirstPost.toString(),
                  });
                }}
              >
                <a>
                  <ChevronsRight size="18" />
                </a>
              </li>
            )}
            
</td>
              */

// Styled Component
// const PaginateNumber = styled.li`
// list-style: none;
// margin-left: -1px;
// padding: 6px 12px;
// background-color: #fff;
// border: 1px solid #ddd;
// color: #428bca;
// cursor: pointer;

// &:hover,
// &:active {
//   background-color: #eee;
// }
// `;
