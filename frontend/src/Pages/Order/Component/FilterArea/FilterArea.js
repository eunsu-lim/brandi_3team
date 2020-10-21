import React from "react";
import SelectFilterData from "../../Data/SelectFilterData";
import DateFilterData from "../../Data/DateFilterData";
import SellerAttriFilterData from "../../Data/SellerAttriFilterData";
import styled from "styled-components";

function FilterArea() {
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
        <FilterKeyword type="text" placeholder="검색어를 입력하세요." />
      </FilterSearch>
      {/* 날짜 필터 */}
      <DateFilter>
        <label htmlFor="">결제완료일:</label>

        {/* 간편 날짜 설정 버튼 목록 */}
        <SimpleDateBtn>
          {DateFilterData.map((el, index) => (
            <input key={index} type="button" value={el.value} />
          ))}
        </SimpleDateBtn>
        <DatePicker>
          <input type="text" placeholder="클릭해주세요." />
          <span> ~ </span>
          <input type="text" placeholder="클릭해주세요." />
        </DatePicker>
      </DateFilter>
      {/* 파트너 여부 */}
      <SellerAttri>
        <label htmlFor="">셀러속성:</label>
        <SellerAttriBtn>
          {SellerAttriFilterData.map((el, index) => (
            <button type="button">{el.value}</button>
          ))}
        </SellerAttriBtn>
      </SellerAttri>
      <SellerClass>
        <label htmlFor="">셀러구분:</label>
        <SellerClassBtn>
          <button type="button">전체</button>
          <button type="button">일반</button>
          <button type="button">헬피</button>
          <div>
            <input type="radio" />
            <span>전체</span>
            <input type="radio" />
            <span>헬피1</span>
            <input type="radio" />
            <span>헬피2</span>
          </div>
        </SellerClassBtn>
      </SellerClass>
      {/* 배송구분 여부 */}
      <DeliveryDivision>
        <label htmlFor="">배송구분:</label>
        <DeliveryDivisionBtn>
          <button type="button">전체</button>
          <button type="button">일반배송</button>
          <button type="button">오늘출발</button>
          <button type="button">새벽도착</button>
          <button type="button">저녁도착</button>
        </DeliveryDivisionBtn>
      </DeliveryDivision>
      {/* 검색, 초기화 버튼 영역 */}
      <SearchInitialzationBtn>
        <input type="button" value="검색" />
        <input type="button" value="초기화" />
      </SearchInitialzationBtn>
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

  label {
    width: 125px;
    height: 30px;
    margin-top: 7px;
  }
`;

const SimpleDateBtn = styled.div`
  width: auto;
  margin-right: 15px;

  input {
    margin: 0 3px;
    padding: 6px 12px;
    font-size: 14px;
    font-weight: 400;
    background-color: #fff;
    border: 1px solid #e5e5e5;
    border-radius: 4px;
    outline: none;
    cursor: pointer;

    &:hover {
      color: #333;
      background-color: #e6e6e6;
      border-color: #adadad;
    }
  }
`;

const DatePicker = styled.div`
  margin-left: 15px;

  input {
    padding: 6px 12px;
    font-size: 14px;
    border-radius: 0 3px 3px 0;
    text-align: center;
    border: 1px solid #e5e5e5;
    outline: none;
    cursor: pointer;
  }

  span {
    padding: 6px 12px;
    background-color: #e5e5e5;
    border: 1px solid #e5e5e5;
    border-radius: 0 3px 3px 0;
    font-size: 14px;
    cursor: pointer;
  }
`;

const SellerAttri = styled(DateFilter)``;

const SellerAttriBtn = styled.div`
  button {
    margin: 0 3px;
    padding: 6px 12px;
    font-size: 14px;
    font-weight: 400;
    background-color: #fff;
    border: 1px solid #e5e5e5;
    border-radius: 4px;
    outline: none;
    cursor: pointer;

    &:hover {
      color: #333;
      background-color: #e6e6e6;
      border-color: #adadad;
    }
  }
`;

const SellerClass = styled(DateFilter)``;

const SellerClassBtn = styled(SellerAttriBtn)`
  div {
    display: inline-block;
  }
`;

const DeliveryDivision = styled(DateFilter)``;
const DeliveryDivisionBtn = styled(SellerAttriBtn)``;

const SearchInitialzationBtn = styled.div`
  display: flex;
  justify-content: center;

  input {
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

    &:hover {
      color: #333;
      background-color: #e6e6e6;
      border-color: #adadad;
    }
  }
`;
