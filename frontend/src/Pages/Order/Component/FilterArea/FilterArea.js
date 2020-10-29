import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import OrderTableExample from "../../Data/OrderTableExample";
import DatePicker from "react-datepicker";
import "./DatePicker.css";
import SelectFilterData from "../../Data/SelectFilterData";
import DateFilterData from "../../Data/DateFilterData";
import SellerAttriFilterData from "../../Data/SellerAttriFilterData";
import styled, { css } from "styled-components";

function FilterArea({}) {
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
    setBtnClicked(value);
    const currentDate = new Date();
    // 기본값: placeholder 내용
    if (value === "전체") {
      setStartDate();
      setEndDate();
    }
    // 오늘 날짜
    if (value === "오늘") {
      setStartDate(new Date());
      setEndDate(new Date());
    }
    // 3일 전부터 오늘까지의 기간
    if (value === "3일") {
      let threeDaysAgo = new Date(
        currentDate.getTime() - 3 * 24 * 60 * 60 * 1000
      );
      setStartDate(threeDaysAgo);
      setEndDate(new Date());
    }
    // 1주일 전부터 오늘까지의 기간
    if (value === "1주일") {
      let weekAgo = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);
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
      setStartDate(threeMonthAgo);
      setEndDate(new Date());
    }
  };

  // 선택 버튼이 모드 선택되거나, 선택된 버튼이 없을 시, 전체이 선택되도록 함
  useEffect(() => {
    if (duplicated.length === 7 || duplicated.length === 0) {
      setDuplicated(["전체"]);
    }
  }, [duplicated]);

  // 버튼 중복 선택 함수 및 조건문
  const handleDuplicated = (e) => {
    const isIncludes = duplicated.find((el) => el === e.target.value);

    if (e.target.value === "전체") {
      setDuplicated(["전체"]);
    } else if (isIncludes) {
      setDuplicated(duplicated.filter((el) => el !== e.target.value));
    } else if (duplicated.length > 0) {
      setDuplicated([
        ...duplicated.filter((el) => el !== "전체"),
        e.target.value,
      ]);
    }
  };

  const handleInput = (e) => {
    const { value } = e.target;
    setSearch(value);
  };

  const handleSearch = () => {
    if (!search && !startDate && !endDate)
      return alert(
        "날짜 조건이 없을 경우에는 필수 필터 조건 검색이 존재합니다. \n주문번호 or 주문상세번호 or 주문자명 or 핸드폰번호"
      );
    else if (!search) {
      alert("검색어를 입력해주세요.");
    }
  };

  console.log(OrderTableExample);
  return (
    <FilterSection>
      {/* 세부 항목, Select Box */}
      <FilterSearch>
        <SelectFilter name="" id="">
          {SelectFilterData.map((el, index) => (
            <option key={index} value="" disabled={el.disabled}>
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
        <SelectDate
          selected={startDate}
          dateFormat="yyyy-MM-dd"
          onChange={(date) => setStartDate(date)}
          placeholderText="클릭해주세요."
        />
        <BetweenDate> ~ </BetweenDate>
        <SelectDate
          selected={endDate}
          dateFormat="yyyy-MM-dd"
          onChange={(date) => setEndDate(date)}
          placeholderText="클릭해주세요."
        />
      </DateFilter>
      {/* 파트너 여부 */}
      <SellerAttri>
        <SellerAttriLabel htmlFor="">셀러속성:</SellerAttriLabel>
        <SellerAttriBtn>
          {SellerAttriFilterData.map((el, index) => (
            <AttriBtn
              key={index}
              type="button"
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
          onClick={handleSearch}
          type="button"
          value="검색"
        />
        <SearchInitializationInput type="button" value="초기화" />
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
