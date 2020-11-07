import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Nav from "../../Components/Nav/Nav";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import { useHistory, useParams } from "react-router-dom";
import Title from "./Component/Title/Title";
import FilterArea from "./Component/FilterArea/FilterArea";
import OrderManagementArea from "./Component/OrderManagementArea/OrderManagementArea";
import axios from "axios";
import styled from "styled-components";

function Order(props) {
  // 서버에 요청 할 데이터 객체
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

  // 서버에 데이터를 요청하는 axios
  // 초기화 버튼 누를 때,
  // 3일인 초기 값의 데이터가 들어오도록 구현해야함!
  useEffect(() => {
    axios
      .request({
        method: "GET",
        url: `http://localhost:3042/public/Data/OrderTableData.json`,
        headers: {
          // "Content-Type": "application/json",
          Authorization: localStorage.getItem("access_token"),
        },
      })
      // axios 사용할 때, 들어오는 데이터에 data라는 키 값이 생긴다.
      .then((res) => setPosts(res.data.order_lists));
  }, []);

  // useEffect(() => {
  //   getOrderData();
  // }, []);

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

  return (
    <Orderwrap>
      <Header />
      <OrderBox>
        <Nav />
        <OrderContainer>
          {/* 타이틀 영역 */}
          <Title />
          {/* 필터 영역 */}
          <FilterArea
            posts={posts}
            filterData={filterData}
            setFilterData={setFilterData}
          />
          {/* 주문 관리 리스트 영역 */}
          <OrderManagementArea
            // data는 전체 데이터를 받아옴.
            posts={posts}
            currentPosts={currentPosts}
            loading={loading}
            postsPerPage={postsPerPage}
            totalPosts={posts.length}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            // handleSortDate={handleSortDate}
            // paginate={paginate}
            handleDataNumber={handleDataNumber}
            filterData={filterData}
            setFilterData={setFilterData}
            indexOfFirstPost={indexOfFirstPost}
          />
        </OrderContainer>
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

// 직접 구현한다면(페이지네이션)
// const paginate = (pageNumber) => {
//   setCurrentPage(pageNumber);

//   // setFilterData(indexOfFirstPost.toString());
// };

// 서버에 filtering 요청을 하기 위한 함수
// const postFilterData = () => {
//   // 기존의 sellerAttri이 배열 형태이기 때문에 string으로 변환해서 서버에 전달한다 === queryString에서는 배열을 받지 못함
//   // 서버에 보낼 때만 사용하는 postData 변수를 만들어서 filterData를 복제
//   let postData = { ...filterData };
//   // join 메서드를 사용해서 sellerAttri의 value인 배열을 string으로 변환하고, toStringSellerAttri라는 변수로 지정한다.
//   const toStringSellerAttri =
//     postData.sellerAttri && postData.sellerAttri.join();
//   // postData.selletAttri의 value를 toStringSellerAttri로 교체
//   postData.sellerAttri ? (postData.sellerAttri = toStringSellerAttri) : null;
//   console.log("postData!!!", postData);
// };

// const history = useHistory();
// const [orderId, setOrderId] = useState(props.match.params.id);
// console.log(props.match.params.id);

// const handleChange = (e) => {
//   history.push(`/product/${e}`);
//   window.location.reload();
// };

// =======================================

// fetch 다른 방법
// const getOrderData = () => {
//   fetch(`http://192.168.7.7:5000/orders/lists/4`)
//     // fetch("192.168.7.7:5000/orders/lists/4")
//     .then((response) => response.json())
//     .then(
//       (result) => {
//         console.log("result", result);
//       }
//       // setPosts(result)
//       // );
//     );
// };

// useEffect(() => {
//   getOrderData();
// }, [posts]);

// =============================
// useEffect(() => {
//   console.log("자, 데이터가 들어오고 있나요?", posts);
// }, [posts]);

// useEffect(() => {
//   console.log("검색 클릭 시, 들어가는 데이터 확인", filterData);
// }, [filterData]);

// console.log("filterData>>>>>", filterData);

// =============================

// 처음 렌더할 때, 서버에 주문관리 Data를 Get으로 요청해서 state에 저장한다.
// useEffect(() => {
//   const fetchDatas = () => {
//     setLoading(true);
//     const res = axios.get(
//       // "http://localhost:3042/public/Data/OrderTableData.json"
//       "http://192.168.7.7:5000/orders/lists/4"
//       // , data
//     );
//     // setPosts(res.data);

//     console.log("res", res);
//     console.log("res.data", res.data);
//     // axio.get으로 받으면 data라는 key가 생성
//     // setPosts(res.data.order_lists);
//     setLoading(!loading);
//   };

//   fetchDatas();
// }, []);

// const getOrderData = () => {
//   console.log(1);
//   fetch(`http://10.58.3.246:5000/orders/lists/4`, {
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: localStorage.getItem("access_token"),
//     },
//   }).then((response) => console.log("response", response.json));
//   // .then(
//   //   (result) => {
//   //     // console.log("result", JSON.stringify(result));
//   //     setPosts(result.order_lists);
//   //   }
//   // );
//   // );
// };

// ===============================

// 서버에 데이터 요청
// axios.request({
//   // setLoading(true),
//   method: "GET",
//   url: `http://10.58.3.246:5000/orders/lists/4`,
//   headers: { Authorization: localStorage.getItem("access_token") },
//   // request할 때, JSON.stringify(데이터)를 사용해서 서버에 요청해야한다.
//   // dataFilter는 이미 Object
//   params: JSON.stringify(filterData),
//   // setLoading(true),
//   // setPosts(res.data),
//   // console.log(filterData)
// });

// useEffect(() => {
//   setTimeout(() => {
//     fetch(`http://192.168.7.7:5000/orders/lists/4`)
//       .then((response) => response.json())
//       .then((res) => {
//         resolve(console.log(res));
//       });
//   }, []);
// });
