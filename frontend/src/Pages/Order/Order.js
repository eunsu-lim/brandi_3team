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
  const [filterData, setFilterData] = useState({ offset: "0", limit: "50" });
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(50);

  // const history = useHistory();
  // const [orderId, setOrderId] = useState(props.match.params.id);
  // console.log(props.match.params.id);

  // const handleChange = (e) => {
  //   history.push(`/product/${e}`);
  //   window.location.reload();
  // };

  // 처음 렌더할 때, 서버에 주문관리 Data를 Get으로 요청해서 state에 저장한다.
  useEffect(() => {
    const fetchDatas = async () => {
      setLoading(true);
      const res = await axios.get(
        "https://jsonplaceholder.typicode.com/comments"
        // , data
      );

      setPosts(res.data);
      setLoading(!loading);
    };

    fetchDatas();
  }, []);

  useEffect(() => {
    console.log(filterData);
  }, [filterData]);

  // 서버에 데이터 요청
  // axios.request({
  //   // setLoading(true),
  //   method: "GET",
  //   url: `https://jsonplaceholder.typicode.com/comments`,
  //   headers: { "Content-Type": "application/json" },
  //   // request할 때, JSON.stringify(데이터)를 사용해서 서버에 요청해야한다.
  //   // dataFilter는 이미 Object
  //   params: JSON.stringify(filterData),
  //   // setLoading(true),
  //   // setPosts(res.data),
  // });

  console.log("filterData>>>>>", filterData);

  // 최신 주문 일 수
  const handleSortDate = (e) => {
    const { value } = e.target;
    if (value === "최신주문일순") {
      setCurrentPage(1);
      setPosts([...posts].sort((a, b) => a.id - b.id));
    } else {
      setCurrentPage(1);
      setPosts([...posts].sort((a, b) => a.id - b.id).reverse());
    }
  };

  // Get 현재 페이지
  // 마지막 데이터의 인덱스 = 현재 페이지 * 페이지에 들어온 데이터
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);

    // setFilterData(indexOfFirstPost.toString());
  };

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
            handleSortDate={handleSortDate}
            paginate={paginate}
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
