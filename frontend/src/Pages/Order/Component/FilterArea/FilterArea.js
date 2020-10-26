import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "./DatePicker.css";
import SelectFilterData from "../../Data/SelectFilterData";
import DateFilterData from "../../Data/DateFilterData";
import SellerAttriFilterData from "../../Data/SellerAttriFilterData";
import styled from "styled-components";

function FilterArea() {
  const [currentIndex, setCurrentIndex] = useState(2);
  const [btnIndex, setBtnIndex] = useState(0);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [placeHolder, setPlaceHolder] = useState("");

  const handleDateOutside = () => {
    setPlaceHolder("입력해주세요");
  };

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
            <DateInput
              onClick={() => setCurrentIndex(index)}
              key={index}
              backgroundColor={currentIndex === index}
              type="button"
              value={el.value}
            />
          ))}
        </SimpleDateBtn>
        <SelectDate
          selected={startDate}
          // onSelect={handleDateSelect}
          onClickOutside={handleDateOutside}
          dateFormat="yyyy-MM-dd"
          onChange={(date) => setStartDate(date)}
          placeholder={placeHolder}
        />
        {/* <input type="text" placeholder="클릭해주세요." />
          
          <input type="text" placeholder="클릭해주세요." /> */}
        {/* </DatePicker> */}
        <BetweenDate> ~ </BetweenDate>
        <SelectDate
          selected={endDate}
          // onSelect={handleDateSelect}
          dateFormat="yyyy-MM-dd"
          onChange={(date) => setEndDate(date)}
          placeholder="클릭해주세요."
        />
      </DateFilter>
      {/* 파트너 여부 */}
      <SellerAttri>
        <label htmlFor="">셀러속성:</label>
        <SellerAttriBtn>
          {SellerAttriFilterData.map((el, index) => (
            <AttriBtn
              key={index}
              type="button"
              onClick={() => setBtnIndex(index)}
              backgroundColor={btnIndex === index}
            >
              {el.value}
            </AttriBtn>
          ))}
        </SellerAttriBtn>
      </SellerAttri>

      {/* 검색, 초기화 버튼 영역 */}
      <SearchInitializationBtn>
        <SearchInitializationInput type="button" value="검색" />
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

  label {
    width: 125px;
    height: 30px;
    margin-top: 7px;
  }
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
  background-color: ${({ backgroundColor }) =>
    backgroundColor ? "#428bca" : "#fff"};
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  outline: none;
  cursor: pointer;

  &:hover {
    color: #333;
    background-color: ${({ backgroundColor }) =>
      backgroundColor ? "#428bca" : "#e6e6e6"};
    border-color: #adadad;
  }
`;

// const DatePicker = styled.div`

//   }
// `;

const SelectDate = styled(DatePicker)`
  /* margin-left: 15px; */
  height: 22px;
  padding: 6px 12px;
  font-size: 14px;
  text-align: center;
  border: 1px solid #e5e5e5;
  outline: none;
  cursor: pointer;
`;

const BetweenDate = styled.span`
  padding: 6px 12px;
  background-color: #e5e5e5;
  border: 1px solid #e5e5e5;
  font-size: 14px;
  cursor: pointer;
`;

const SellerAttri = styled(DateFilter)``;

const SellerAttriBtn = styled.div``;

const AttriBtn = styled.button`
  margin: 0 3px;
  padding: 6px 12px;
  font-size: 14px;
  font-weight: 400;
  background-color: ${({ backgroundColor }) =>
    backgroundColor ? "#428bca" : "#fff"};
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  outline: none;
  cursor: pointer;

  &:hover {
    color: #333;
    background-color: ${({ backgroundColor }) =>
      backgroundColor ? "#428bca" : "#e6e6e6"};
    border-color: #adadad;
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
const DivisionBtn = styled(AttriBtn)``;
const DeliveryBtn = styled(AttriBtn)``;

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
