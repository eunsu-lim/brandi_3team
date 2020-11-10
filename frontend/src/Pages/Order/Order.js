import React, { useState, useEffect, Fragment } from "react";
import Nav from "../../Components/Nav/Nav";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import { useHistory, useParams } from "react-router-dom";
import Title from "./Component/Title/Title";
import FilterArea from "./Component/FilterArea/FilterArea";
import OrderManagementArea from "./Component/OrderManagementArea/OrderManagementArea";
import DeliveryTitle from "./Component/Title/DeliveryTitle";
import DeliveryFilterArea from "./Component/FilterArea/DeliveryFilterArea";
import DeliveryManagementArea from "./Component/OrderManagementArea/DeliveryManagementArea";
import CompleteTitle from "./Component/Title/CompleteTitle";
import CompleteFilterArea from "./Component/FilterArea/CompleteFilterArea";
import CompleteManagementArea from "./Component/OrderManagementArea/CompleteManagementArea";
import PurchaseTitle from "./Component/Title/PurchaseTitle";
import PurchaseFilterArea from "./Component/FilterArea/PurchaseFilterArea";
import PurchaseManagementArea from "./Component/OrderManagementArea/PurchaseManagementArea";
import axios from "axios";
import styled from "styled-components";

function Order() {
  // 서버에 데이터를 요청할 때 쿼리스트링으로 사용할 데이터를 담을 state
  const [filterData, setFilterData] = useState({
    offset: "0",
    limit: "50",
    filter_ordering: "1",
  });
  // 서버에서 보내는 데이터를 담을 배열
  const [posts, setPosts] = useState([]);
  // 받는 데이터에 문제 발생 시, loading 페이지
  const [loading, setLoading] = useState(false);
  // 데이터의 첫 번째 페이지
  const [currentPage, setCurrentPage] = useState(1);
  // 한 페이지에 해당하는 데이터의 수(초기값 50)
  const [postsPerPage, setPostsPerPage] = useState(50);

  // Get 현재 페이지
  // 마지막 데이터의 인덱스 = 현재 페이지 * 페이지에 들어온 데이터
  const indexOfLastPost = currentPage * postsPerPage;
  // 첫번 째 인덱스를 가진 데이터 = 마지막인덱스를 가진 데이터 - 데이터의 수
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  // 현재 화면에 보이는 데이터 = 전체 데이터에서 첫번 째 데이터의 인덱스와 마지막 데이터(제외)의 인덱스를 가진 데이터를 가져온다.
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // select option 선택 시, 들어오는 데이터의 수로 보여지는 데이터의 수를 관리
  const handleDataNumber = (e) => {
    // postPerpage의 type이 (select>option.value) string이기 때문에 number로 바꾸어준다.
    setPostsPerPage(Number(e.target.value));
    // select option을 바꿀 때마다, 1번 페이지로 이동
    setCurrentPage(1);
  };

  const params = useParams();

  return (
    <Orderwrap>
      <Header />
      <OrderBox>
        <Nav />
        {/* 상품준비관리 페이지 */}
        {params.id === "1" && (
          <OrderContainer>
            {/* 타이틀 영역 */}
            <Title />
            {/* 필터 영역 */}
            <FilterArea
              posts={posts}
              setPosts={setPosts}
              filterData={filterData}
              setFilterData={setFilterData}
            />
            {/* 주문 관리 리스트 영역 */}
            <OrderManagementArea
              posts={posts}
              setPosts={setPosts}
              currentPosts={currentPosts}
              loading={loading}
              postsPerPage={postsPerPage}
              totalPosts={posts.length}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              handleDataNumber={handleDataNumber}
              filterData={filterData}
              setFilterData={setFilterData}
              indexOfFirstPost={indexOfFirstPost}
            />
          </OrderContainer>
        )}
        {/* 배송중관리 페이지 */}
        {params.id === "3" && (
          <OrderContainer>
            {/* 타이틀 영역 */}
            <DeliveryTitle />
            {/* 필터 영역 */}
            <DeliveryFilterArea
              posts={posts}
              setPosts={setPosts}
              filterData={filterData}
              setFilterData={setFilterData}
            />
            {/* 배송중관리 리스트 영역 */}
            <DeliveryManagementArea
              posts={posts}
              setPosts={setPosts}
              currentPosts={currentPosts}
              loading={loading}
              postsPerPage={postsPerPage}
              totalPosts={posts.length}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              handleDataNumber={handleDataNumber}
              filterData={filterData}
              setFilterData={setFilterData}
              indexOfFirstPost={indexOfFirstPost}
            />
          </OrderContainer>
        )}
        {/* 배송완료관리 페이지 */}
        {params.id === "4" && (
          <OrderContainer>
            {/* 타이틀 영역 */}
            <CompleteTitle />
            {/* 필터 영역 */}
            <CompleteFilterArea
              posts={posts}
              setPosts={setPosts}
              filterData={filterData}
              setFilterData={setFilterData}
            />
            {/* 배송완료관리 리스트 영역 */}
            <CompleteManagementArea
              posts={posts}
              setPosts={setPosts}
              currentPosts={currentPosts}
              loading={loading}
              postsPerPage={postsPerPage}
              totalPosts={posts.length}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              handleDataNumber={handleDataNumber}
              filterData={filterData}
              setFilterData={setFilterData}
              indexOfFirstPost={indexOfFirstPost}
            />
          </OrderContainer>
        )}
        {/* 구매확정관리 페이지 */}
        {params.id === "5" && (
          <OrderContainer>
            {/* 타이틀 영역 */}
            <PurchaseTitle />
            {/* 필터 영역 */}
            <PurchaseFilterArea
              posts={posts}
              setPosts={setPosts}
              filterData={filterData}
              setFilterData={setFilterData}
            />
            {/* 구매확정관리 리스트 영역 */}
            <PurchaseManagementArea
              // data는 전체 데이터를 받아옴.
              posts={posts}
              setPosts={setPosts}
              currentPosts={currentPosts}
              loading={loading}
              postsPerPage={postsPerPage}
              totalPosts={posts.length}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              handleDataNumber={handleDataNumber}
              filterData={filterData}
              setFilterData={setFilterData}
              indexOfFirstPost={indexOfFirstPost}
            />
          </OrderContainer>
        )}
      </OrderBox>
      <Footer />
    </Orderwrap>
  );
}

export default Order;

const Orderwrap = styled.article`
  position: relative;
  background-color: #fafafa;
`;

const OrderBox = styled.div`
  display: flex;
`;

const OrderContainer = styled.div`
  flex: 1;
  min-height: 100vh;
  height: auto;

  padding: 66px 20px 20px 20px;
  width: calc(100% - 214px);
`;

// // 서버에 데이터를 요청하는 axios
// // 초기화 버튼 누를 때,
// // 3일인 초기 값의 데이터가 들어오도록 구현해야함!
// useEffect(() => {
//   axios
//     .request({
//       method: "GET",
//       url: `http://10.251.1.99:5000/orders/lists/4`,
//       headers: {
//         // "Content-Type": "application/json",
//         Authorization: localStorage.getItem("access_token"),
//       },
//     })
//     // axios 사용할 때, 들어오는 데이터에 data라는 키 값이 생긴다.
//     .then((res) => setPosts(res.data.order_lists));
// }, []);
