import React, { useState, useEffect } from "react";
import choiApi from "../../../../Config/api";
import axios from "axios";
import DatePicker from "react-datepicker";
import SelectFilterData from "../../Data/SelectFilterData";
import DeliveryDataFilterData from "../../Data/DeliveryDataFilterData";
import SellerAttriFilterData from "../../Data/SellerAttriFilterData";
import styled, { css } from "styled-components";
import "./DatePicker.css";

function PurchaseFilterArea({ posts, filterData, setFilterData, setPosts }) {
  const [changeValue, setChangeValue] = useState(false);
  const [selector, setSelector] = useState("");
  const [btnClicked, setBtnClicked] = useState("3일");
  const [duplicated, setDuplicated] = useState(["1"]);
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState(
    new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000)
  );
  const [endDate, setEndDate] = useState(new Date());

  const selectFilter = (e) => {
    // 입력한 값을 filterData에 저장
    setSelector(e.target.value);
    // setChangeValue(!changeValue);
  };

  // 간략하게 나온 날짜(전체, 오늘, 3일 등) 클릭하면 datePicker 기간이 변경됩니다.
  const handleBtnClicked = (e) => {
    const { value } = e.target;
    setChangeValue(!changeValue);

    // 자바스크립트의 비동기적인 특성(작업이 완료되지않은 상태에서, 다른 작업이 실행)으로,
    // 상태가 처음에 업데이트가 되지않습니다.
    // 데이터를 변수로 선언해서 직접 넣어주면 해결이 가능합니다.
    let startDate;
    let endDate;

    setBtnClicked(value);
    const currentDate = new Date();
    // 기본값: placeholder 내용
    if (value === "전체") {
      setStartDate(null);
      setEndDate(new Date());
    }
    // 오늘 날짜
    if (value === "오늘") {
      startDate = new Date();
      endDate = new Date();
      setStartDate(new Date());
      setEndDate(new Date());
    }
    // 3일 전부터 오늘까지의 기간
    if (value === "3일") {
      let threeDaysAgo = new Date(
        currentDate.getTime() - 3 * 24 * 60 * 60 * 1000
      );
      startDate = new Date(threeDaysAgo);
      endDate = new Date();
      setStartDate(threeDaysAgo);
      setEndDate(new Date());
    }
    // 7일 전부터 오늘까지의 기간
    if (value === "7일") {
      let sevenDaysAgo = new Date(
        currentDate.getTime() - 7 * 24 * 60 * 60 * 1000
      );
      startDate = new Date(sevenDaysAgo);
      endDate = new Date();
      setStartDate(sevenDaysAgo);
      setEndDate(new Date());
    }
    // 15일 전부터 오늘까지의 기간
    if (value === "15일") {
      let fifteenDaysAgo = new Date(
        currentDate.getTime() - 15 * 24 * 60 * 60 * 1000
      );
      startDate = new Date(fifteenDaysAgo);
      endDate = new Date();
      setStartDate(fifteenDaysAgo);
      setEndDate(new Date());
    }
  };

  // 선택한 검색기간 날짜를 서버에서 원하는 형식으로 바꾸는 함수(yyyy-mm-dd)
  const getFormattedDate = (date) => {
    const d = new Date(date);
    let year = d.getFullYear();
    let month = 1 + d.getMonth();
    let day = d.getDate();
    // month와 day가 10이상일 때는 그대로 출력, 10 이하일 때는 앞에 0을 붙인 뒤 출력
    return `${year}-${month >= 10 ? month : "0" + month}-${
      day >= 10 ? day : "0" + day
    }`;
  };

  // 선택 버튼이 모드 선택되거나, 선택된 버튼이 없을 시, 전체 선택되도록 함
  useEffect(() => {
    if (duplicated.length === 7 || duplicated.length === 0) {
      setDuplicated(["1"]);
    }
  }, [duplicated]);

  // 버튼 중복 선택 함수 및 조건문
  const handleDuplicated = (e) => {
    const { name, value } = e.target;
    // isIncludes는 버튼이 들어있는 지 확인하는 변수
    const isIncludes = duplicated.find((el) => el === name);
    // value가 "전체"일 때, 전체를 배열에 포함
    if (name === "1") {
      setDuplicated(["1"]);
    }
    // isIncludes일 때 === 버튼이 이미 클릭 되어있을 때, 배열에서 제거
    else if (isIncludes) {
      setDuplicated(duplicated.filter((el) => el !== name));
    }
    // 배열의 길이가 0보다 클 때 === 하나 이상 선택이 되었을 때, "전체"는 제거, 클릭 한, value를 배열에 포함
    else if (duplicated.length > 0) {
      setDuplicated([...duplicated.filter((el) => el !== "1"), name]);
    }
  };

  // 검색어 입력 필터
  const handleInput = (e) => {
    const { value } = e.target;
    setSearch(value);
    // setChangeValue(!changeValue);
  };

  // 검색 버튼 함수
  const handleSearch = async () => {
    setChangeValue(!changeValue);

    // if (!search) {
    //   alert("로딩 중");
    // } else if (startDate && !search) {
    //   alert("검색어를 입력해주세요.");
    // } else if (!search && !startDate && !endDate)
    //   return alert(
    //     "날짜 조건이 없을 경우에는 필수 필터 조건 검색이 존재합니다. \n주문번호 or 주문상세번호 or 주문자명 or 핸드폰번호"
    //   );
    // else {

    // GET 메서드를 사용하고, 서버에 url을 첫번 째 인자로,
    // params를 두번 째 인자로 보내고, 들어온 데이터를 result라는 변수에 저장합니다.
    const result = await axios.request({
      method: "GET",
      url: `${choiApi}/orders/lists/5`,
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("access_token"),
      },
      params: filterData,
    });
    // 서버에서 들어온 result에서 result.data.order_lists로 접근한 후에,
    // 테이블에 보여지는 데이터의 state인 posts에 저장해줍니다.
    setPosts(result.data.order_lists);
  };

  // changeValue가 실행 될 때마다,
  // posts의 내용을 바꿔준다.
  useEffect(() => {
    setFilterData({
      ...filterData,
      searching_category: selector,
      filter_date_from: getFormattedDate(startDate),
      filter_date_to: getFormattedDate(endDate),
      seller_attribute_id: duplicated.sort().join(),
      searching: search,
    });
    // 아래 state가 변할 때만 실행되도록 합니다.
  }, [duplicated, startDate, endDate, selector, search]);

  // 초기화 버튼
  const resetBtn = async (e) => {
    const { name } = e.target;
    if (name === "reset") {
      setSelector("");
      setSearch("");
      setBtnClicked("3일");
      setDuplicated(["1"]);
      setStartDate(new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000));
      setEndDate(new Date());
    }
    setChangeValue(!changeValue);

    // 초기화 버튼은 초기 상태의 데이터가 들어오도록 설정합니다.
    const result = await axios.request({
      method: "GET",
      url: `${choiApi}/orders/lists/5`,
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("access_token"),
      },
      //   params: {
      //     // selector: "",
      //     filter_date_from: getFormattedDate(
      //       new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000)
      //     ),
      //     filter_date_to: getFormattedDate(new Date()),
      //     seller_attribute_id: "1",
      //   },
    });
    setPosts(result.data.order_lists);
  };

  return (
    <FilterSection>
      {/* 세부 항목, Select Box */}
      <FilterSearch>
        {/* select를 초기화 하기 위해서 value에 빈 state를 줍니다. */}
        <SelectFilter value={selector} onChange={selectFilter}>
          {SelectFilterData.map((el, index) => (
            <option key={index} value={el.id} disabled={el.disabled}>
              {el.value}
            </option>
          ))}
        </SelectFilter>
        <FilterKeyword
          // name="search"
          value={search}
          onChange={handleInput}
          type="text"
          placeholder="검색어를 입력하세요."
        />
      </FilterSearch>
      {/* 날짜 필터 */}
      <DateFilter>
        <DateLabel htmlFor="">구매확정일:</DateLabel>

        {/* 간편 날짜 설정 버튼 목록 */}
        <SimpleDateBtn>
          {DeliveryDataFilterData.map((el, idx) => (
            <DateInput
              onClick={handleBtnClicked}
              key={idx}
              backgroundColor={btnClicked === el.value}
              type="button"
              value={el.value}
            />
          ))}
        </SimpleDateBtn>
        {/* DatePicker 시작 날짜 */}
        <SelectDate
          selected={startDate}
          dateFormat="yyyy-MM-dd"
          onChange={(date) => {
            setStartDate(date);
            // 검색 조회 기간 시작 일 선택 할 때, filterData에 시작 날짜 저장
            // getFormattedDate 함수를 사용해서 날짜 형식을 yyyy-mm-dd 형태로 변경하여 저장
            setFilterData({
              ...filterData,
              searchDataFrom: getFormattedDate(date),
            });
          }}
          placeholderText="클릭해주세요."
        />
        <BetweenDate> ~ </BetweenDate>
        {/* DatePicker 종료 날짜 */}
        <SelectDate
          selected={endDate}
          dateFormat="yyyy-MM-dd"
          onChange={(date) => {
            setEndDate(date);
            setFilterData({
              ...filterData,
              searchDataTo: getFormattedDate(date),
            });
          }}
          placeholderText="클릭해주세요."
        />
      </DateFilter>
      {/* 셀러속성 */}
      <SellerAttri>
        <SellerAttriLabel htmlFor="">셀러속성:</SellerAttriLabel>
        <SellerAttriBtn>
          {SellerAttriFilterData.map((el, index) => (
            <AttriBtn
              key={index}
              type="button"
              // onClick={() => handleDuplicated(index, el.id)}
              onClick={handleDuplicated}
              name={el.name}
              value={el.value}
              backgroundColor={duplicated.find(
                (element) => element === el.name
              )}
            >
              {el.value}
            </AttriBtn>
          ))}
        </SellerAttriBtn>
      </SellerAttri>

      {/* 검색, 초기화 버튼 영역 */}
      <SearchInitializationBtn>
        <SearchInitializationInput
          // onClick={postFilterData}
          onClick={handleSearch}
          type="button"
          value="검색"
        />
        <SearchInitializationInput
          onClick={resetBtn}
          type="button"
          name="reset"
          value="초기화"
        />
      </SearchInitializationBtn>
    </FilterSection>
  );
}

export default PurchaseFilterArea;

const FilterSection = styled.section`
  border: 3px solid #eee;
  padding-left: 10px;
  margin-bottom: 20px;
`;

const FilterSearch = styled.div`
  margin: 10px 0;
  width: 100%;
`;

const SelectFilter = styled.select`
  height: 30px;
  line-height: 28px;
  padding: 2px 10px;
  margin-right: 5px;
  border-radius: 4px;
  border: 1px solid #e5e5e5;
  outline: none;
`;

const FilterKeyword = styled.input`
  width: 33.3%;
  padding: 6px 10px;
  font-size: 13px;
  border-radius: 4px;
  border: 1px solid #e5e5e5;
  outline: none;
`;

const DateFilter = styled.div`
  display: flex;
  margin-top: 7px;
  margin-bottom: 10px;
`;

const DateLabel = styled.label`
  width: 125px;
  height: 30px;
  margin-top: 7px;
`;

const SimpleDateBtn = styled.div`
  width: auto;
  margin-right: 15px;
`;

const DateInput = styled.input`
  margin: 0 3px;
  padding: 6px 12px;
  font-size: 14px;
  font-weight: 400;
  background-color: white;
  ${({ backgroundColor }) =>
    backgroundColor &&
    css`
      background-color: #428bca;
      color: white;

      &:hover {
        background-color: #428bca;
        color: white;
      }
    `}
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  outline: none;
  cursor: pointer;

  &:hover {
    color: #333;
    color: ${({ backgroundColor }) => (backgroundColor ? "white" : "black")};
    background-color: ${({ backgroundColor }) =>
      backgroundColor ? "#428bca" : "#e6e6e6"};
    border-color: #adadad;
  }
`;

const SelectDate = styled(DatePicker)`
  height: 22px;
  padding: 6px 12px;
  font-size: 14px;
  text-align: center;
  border: 1px solid #e5e5e5;
  outline: none;
  cursor: pointer;
`;

const BetweenDate = styled.span`
  display: table;
  padding: 8px 12px;
  background-color: #e5e5e5;
  border: 1px solid #e5e5e5;
  font-size: 14px;
  cursor: pointer;
`;

const SellerAttri = styled(DateFilter)``;

const SellerAttriLabel = styled(DateLabel)``;

const SellerAttriBtn = styled.div``;

const AttriBtn = styled.button`
  margin: 0 3px;
  padding: 6px 12px;
  font-size: 14px;
  font-weight: 400;
  color: ${({ backgroundColor }) => (backgroundColor ? "white" : "black")};
  background-color: ${({ backgroundColor }) =>
    backgroundColor ? "#428bca" : "#fff"};
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  outline: none;
  cursor: pointer;

  &:hover {
    color: #333;
    color: ${({ backgroundColor }) => (backgroundColor ? "white" : "black")};
    background-color: ${({ backgroundColor }) =>
      backgroundColor ? "#428bca" : "#e6e6e6"};
    border-color: #adadad;
  }
`;

const SearchInitializationBtn = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`;

const SearchInitializationInput = styled.input`
  padding: 6px 50px;
  margin: 0 2px;
  border-radius: 0px;
  font-size: 14px;
  font-weight: 400;
  border: none;
  outline: none;
  cursor: pointer;

  :nth-child(1) {
    background-color: #428bca;
    color: #fff;
  }

  &:nth-child(2) {
    &:hover {
      color: #333;
      background-color: #e6e6e6;
      border-color: #adadad;
    }
  }
  &:hover {
    opacity: 0.9;
  }
`;
