import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import "./DatePicker.css";
import SelectFilterData from "../../Data/SelectFilterData";
import DateFilterData from "../../Data/DateFilterData";
import SellerAttriFilterData from "../../Data/SellerAttriFilterData";
import styled, { css } from "styled-components";

function FilterArea({ posts, filterData, setFilterData, fetchDatas }) {
  const [btnClicked, setBtnClicked] = useState("3일");
  const [duplicated, setDuplicated] = useState(["전체"]);
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(
    new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000)
  );

  // 날짜 버튼 클릭, 기간 변경 기능
  const handleBtnClicked = (e) => {
    const { value } = e.target;

    // 동기, 비동기
    // state는 함수가 끝나기 전에는 업데이트가 되지않는다.
    // 그래서 버튼을 눌러서 데이터를 넣을 때, 한박자씩 밀린다.
    // 데이터를 변수로 선언해서 직접 넣어줘야한다.
    let startDate;
    let endDate;

    setBtnClicked(value);
    const currentDate = new Date();
    // 기본값: placeholder 내용
    if (value === "전체") {
      setStartDate();
      setEndDate();
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
    // 1주일 전부터 오늘까지의 기간
    if (value === "1주일") {
      let weekAgo = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);
      startDate = new Date(weekAgo);
      endDate = new Date();
      setStartDate(weekAgo);
      setEndDate(new Date());
    }
    // 1개월 전부터 오늘까지의 기간
    if (value === "1개월") {
      let oneMonthAgo = new Date(
        new Date().getFullYear(),
        new Date().getMonth() - 1,
        new Date().getDate()
      );
      startDate = new Date(oneMonthAgo);
      endDate = new Date(new Date());
      setStartDate(oneMonthAgo);
      setEndDate(new Date());
    }
    // 3개월 전부터 오늘까지의 기간
    if (value === "3개월") {
      let threeMonthAgo = new Date(
        new Date().getFullYear(),
        new Date().getMonth() - 3,
        new Date().getDate()
      );
      startDate = new Date(threeMonthAgo);
      endDate = new Date(new Date());
      setStartDate(threeMonthAgo);
      setEndDate(new Date());
    }

    // 전체 선택 시, NaN가 나오는데, 조건을 어떻게 주어야할까요?

    // 간단 기간 버튼 클릭 시, 서버에 날짜를 보냄
    console.log(getFormattedDate(startDate), getFormattedDate(endDate));
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

  // 선택 버튼이 모드 선택되거나, 선택된 버튼이 없을 시, 전체이 선택되도록 함
  useEffect(() => {
    if (duplicated.length === 7 || duplicated.length === 0) {
      setDuplicated(["전체"]);
    }
  }, [duplicated]);

  // 버튼 중복 선택 함수 및 조건문
  const handleDuplicated = (e, index, id) => {
    const { value } = e.target;
    // isIncludes는 버튼이 들어있는 지 확인
    const isIncludes = duplicated.find((el) => el === e.target.value);
    // value가 "전체"일 때, 전체를 배열에 포함
    if (value === "전체") {
      setDuplicated(["전체"]);
    }
    // isIncludes일 때 === 버튼이 이미 클릭 되어있을 때, 배열에서 제거
    else if (isIncludes) {
      setDuplicated(duplicated.filter((el) => el !== e.target.value));
    }
    // 배열의 길이가 0보다 클 때 === 하나 이상 선택이 되었을 때, "전체"는 제거, 클릭 한, value를 배열에 포함
    else if (duplicated.length > 0) {
      setDuplicated([
        ...duplicated.filter((el) => el !== "전체"),
        e.target.value,
      ]);
    }
    // 여기에서 아래처럼 state를 바꿔주면, 비동기라서
    // state에 업데이트 된 값이 저장되지않는다.
    // 그래서 하나씩 밀린 state가 업데이트된다.
    // 따라서, 검색을 클릭 할 때 실행되는 함수(handleSearch)에 데이터를 넣어주도록 코드를 작성
    // setFilterData({ ...filterData, sellerAttri: duplicated });
  };

  // 검색어 입력 필터
  const handleInput = (e) => {
    const { value } = e.target;
    setSearch(value);
    setFilterData({
      ...filterData,
      // searchWord: value
      filter_ordering: value,
    });
  };

  const handleSearch = () => {
    if (!search) {
      alert("로딩 중");
    } else if (startDate && !search) {
      alert("검색어를 입력해주세요.");
    } else if (!search && !startDate && !endDate)
      return alert(
        "날짜 조건이 없을 경우에는 필수 필터 조건 검색이 존재합니다. \n주문번호 or 주문상세번호 or 주문자명 or 핸드폰번호"
      );
    else {
      // 검색을 눌렀을 때, duplicated에 대한 함수가 끝난 state를 넣는다.
      // 여기에서 중요한 점은 프론트에서는 데이터를 모아서
      // 검색을 눌렀을 때, 서버에 request 한다는 점!!!
      // 그래서 실시간으로 서버랑 소통하지않는 이상,
      // 필요할 때만 서버와 통신하기위해서 준비하기.
      setFilterData({
        ...filterData,
        searchDataFrom: getFormattedDate(startDate),
        searchDataTo: getFormattedDate(endDate),
        sellerAttri: duplicated.join(),
      });
      // return fetchDatas();
    }
  };

  // 초기화 버튼
  const resetBtn = (e) => {
    const { name } = e.target;
    if (name) {
      alert("데이터를 불러오고 있습니다.");
      window.location.reload();
    }
  };

  const selectFilter = (e) => {
    // 입력한 값을 filterData에 저장
    setFilterData({
      ...filterData,
      // selectFilter: e.target.value
      searching: e.target.value,
    });
  };

  return (
    <FilterSection>
      {/* 세부 항목, Select Box */}
      <FilterSearch>
        <SelectFilter name="" id="" onChange={selectFilter}>
          {SelectFilterData.map((el, index) => (
            <option key={index} value={el.id} disabled={el.disabled}>
              {el.value}
            </option>
          ))}
        </SelectFilter>
        <FilterKeyword
          name="search"
          onChange={handleInput}
          type="text"
          placeholder="검색어를 입력하세요."
        />
      </FilterSearch>
      {/* 날짜 필터 */}
      <DateFilter>
        <DateLabel htmlFor="">결제완료일:</DateLabel>

        {/* 간편 날짜 설정 버튼 목록 */}
        <SimpleDateBtn>
          {DateFilterData.map((el, idx) => (
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
              value={el.value}
              backgroundColor={duplicated.find(
                (element) => element === el.value
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

export default FilterArea;

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
