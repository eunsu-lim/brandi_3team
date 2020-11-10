import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ListFilterArea from "./ListFilterArea";
import ProductList from "./ProductList";
import axios from "axios";
import { api } from "../../../Config/api";
import { saveAs } from "file-saver";

function ProductContent() {
  const [productData, setProductData] = useState(); // 서버로부터 받은 data를 state에 저장, 자식 Components에 props로 전달
  const [buttonData, setButtonData] = useState();
  const [sortData, setSortData] = useState({
    offset: "0",
    limit: "10",
    // discountStatus: "1",
    // displayStatus: "1",
    // salesStatus: "1",
    // sellerType: [1],
  }); // 서버에 sorting 요청을 위해 선택된 filter_list를 state로 상태 관리
  const [isChecked, setIsChecked] = useState({ allChecked: false }); // 체크박스 체크 상태 state(boolean 값으로 상태 관리)
  const [checkedList, setCheckedList] = useState(); // 체크된 리스트를 배열 상태로 관리

  // 마스터인지 셀러인지 판단하여 isMaster에 할당. 마스터일 경우 true, 셀러일 경우 false
  const isMaster = buttonData && buttonData.account_type === "master";

  //  최초 렌더시 서버에 상품관리 Data를 Get 요청하여 state에 저장
  useEffect(() => {
    axios
      .get(`${api}/products/product_list`)
      .then((res) => setProductData(res.data.data));
  }, []);

  useEffect(() => {
    axios
      .get(`/public/Data/ProductListFilter.json`)
      .then((res) => setButtonData(res.data.data));
  }, []);

  // 서버에 sorting 요청을 위한 함수
  const postSortData = () => {
    // 기존 sellerType은 배열 형태이기 때문에 string으로 변환하여 서버에 전달(queryString에서 배열을 받지 못하기 때문에)
    // 서버에 보낼때만 사용하는 postData 변수를 만들어 sortData를 복제
    let postData = { ...sortData };
    // join 메서드를 사용하여 sellerType의 value인 배열을 string으로 변환하여 toStringSellerType이라는 변수로 지정
    const toStringSellerType =
      postData.sellerType && postData.sellerType.join();
    // postData.sellerType의 value를 toStringSellerType으로 교체
    postData.sellerType ? (postData.sellerType = toStringSellerType) : null;

    console.log("post >>>>>", postData);

    axios
      .request({
        method: "GET",
        url: `${api}/products/product_list`,
        headers: { "Content-Type": "application/json" },
        params: postData,
      })
      .then((res) => setProductData(res.data))
      .catch((err) => console.log(err));
  };

  // isChecked의 상태가 변할 때 마다 서버에 보내기 위한 checkedList를 생성
  useEffect(() => {
    setCheckedList(
      Object.keys(isChecked).filter(
        (el) => el !== "allChecked" && isChecked[el] == true
      )
      // isChecked에서 allChecked를 제외한 나머지 key값(listId)의 value가 true인(체크선택된 상태) list의 id를 checkedList에 배열로 저장
    );
  }, [isChecked]);

  // 엑셀다운로드 버튼 클릭 시 실행되는 함수
  const handleExcel = (value) => {
    const excelData = [];
    // 해당 버튼의 value 값이 allExcel일 경우
    value === "allExcel"
      ? // 전체 리스트의 id 값을 excelData에 배열로 저장
        productData.product_list.map((el) => {
          excelData.push(el.id);
        })
      : // 해당 버튼의 value 값이 excel일 경우
        // checkedList의 값을 excelDat에 배열로 저장
        excelData.push(...checkedList);

    console.log("excelData >>>>>>", excelData.join());

    axios
      .request({
        method: "GET",
        url: `${api}/products/excel`,
        headers: { "Content-Type": "application/json" },
        params: { product_id: excelData.join() },
      })
      .then((res) => saveAs(res.data, "excelDownload.xlsx"))
      .catch((err) => console.log(err));
  };

  // 적용 버튼 클릭 시 실행되는 함수
  // ProductList 컴포넌트에서 전달 받은 applyOption의 상태에 따라 적용 상태 변경
  const handleApply = ({ applyOption }) => {
    // product_id  salesStatusModify  displayStatusModify

    let applyObj = {
      product_id: checkedList.join(),
    };

    // applyOption에서 sale이 있을 경우
    if (applyOption.sale) {
      // sale: "Y"인 경우(판매 선택)
      if (applyOption.sale === "Y") {
        applyObj = { ...applyObj, salesStatusModify: 2 };
      } else if (applyOption.sale === "N") {
        // sale: "N"인 경우(미판매 선택)
        applyObj = { ...applyObj, salesStatusModify: 3 };
      }
    }
    // applyOption에서 display가 있을 경우
    if (applyOption.display) {
      // display: "Y"인 경우(진열 선택)
      if (applyOption.display === "Y") {
        applyObj = { ...applyObj, displayStatusModify: 2 };
      } else if (applyOption.display === "N") {
        // display: "N"인 경우(미진열 선택)
        applyObj = { ...applyObj, displayStatusModify: 3 };
      }
    }

    console.log("applyObj >>>>>", applyObj);

    axios
      .request({
        method: "POST",
        url: `${api}/products/modify`,
        headers: { "Content-Type": "application/json" },
        params: applyObj,
      })
      .then((res) => postSortData());
    // axios
    //   .post(`${api}/products/modify`, applyObj, {
    //     headers: { "Content-Type": "application/json" },
    //   })
    //   .then((res) => console.log(res));

    // // newList라는 변수에 product_list 데이터를 복제
    // const newList = [...productData.product_list];

    // // applyOption에서 sale이 있을 경우
    // if (applyOption.sale) {
    //   // sale: "Y"인 경우(판매 선택)
    //   if (applyOption.sale === "Y") {
    //     // newList를 map 돌려 선택한 리스트의 sale 값을 판매로 변경
    //     newList.map((el) => {
    //       checkedList.includes(el.id) ? (el.sale = "판매") : null;
    //     });
    //     // 변경한 list를 productData에 대체하여 화면에 render
    //     setProductData({ ...productData, product_list: [...newList] });
    //     // sale: "N"인 경우(미판매 선택)
    //   } else if (applyOption.sale === "N") {
    //     // newList를 map 돌려 선택한 리스트의 sale 값을 미판매로 변경
    //     newList.map((el) => {
    //       checkedList.includes(el.id) ? (el.sale = "미판매") : null;
    //     });
    //     // 변경한 list를 productData에 대체하여 화면에 render
    //     setProductData({ ...productData, product_list: [...newList] });
    //   }
    // }
    // // applyOption에서 display가 있을 경우
    // if (applyOption.display) {
    //   // display: "Y"인 경우(진열 선택)
    //   if (applyOption.display === "Y") {
    //     // newList를 map 돌려 선택한 리스트의 display 값을 진열로 변경
    //     newList.map((el) => {
    //       checkedList.includes(el.id) ? (el.display = "진열") : null;
    //     });
    //     // 변경한 list를 productData에 대체하여 화면에 render
    //     setProductData({ ...productData, product_list: [...newList] });
    //     // display: "N"인 경우(미진열 선택)
    //   } else if (applyOption.display === "N") {
    //     // newList를 map 돌려 선택한 리스트의 display 값을 미진열로 변경
    //     newList.map((el) => {
    //       checkedList.includes(el.id) ? (el.display = "미진열") : null;
    //     });
    //     // 변경한 list를 productData에 대체하여 화면에 render
    //     setProductData({ ...productData, product_list: [...newList] });
    //   }
    // }
  };

  console.log("checkedList >>>>>", checkedList);

  return (
    <ProductContentWrap>
      <h3>상품 관리</h3>
      {/* 상품 리스트 필터 영역*/}
      <ListFilterArea
        productData={buttonData}
        sortData={sortData}
        setSortData={setSortData}
        isMaster={isMaster}
        postSortData={postSortData}
      />
      {/* 상품 리스트 영역 */}
      <ProductList
        productData={productData}
        isMaster={isMaster}
        sortData={sortData}
        setSortData={setSortData}
        postSortData={postSortData}
        isChecked={isChecked}
        setIsChecked={setIsChecked}
        handleExcel={handleExcel}
        handleApply={handleApply}
        buttonData={buttonData}
      />
    </ProductContentWrap>
  );
}

export default ProductContent;

const ProductContentWrap = styled.div`
  min-height: 892px;
  padding: 25px 20px 70px 20px;
  background-color: #fafafa;

  h3 {
    margin: 0px 0px 15px 0px;
    font-size: 26px;
    font-weight: 300;
    letter-spacing: -1px;
    color: #666;
  }
`;
