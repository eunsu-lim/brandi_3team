import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import axios from "axios";

// DatePicker css 적용을 위해 css파일 만들어 준 다음 import
import "./DatePickerCss.css";

function ListFilterArea() {
  const [productData, setProductData] = useState(); // 서버로부터 get하는 페이지 data state
  const [startDate, setStartDate] = useState(); // 조회기간 시작일 state
  const [endDate, setEndDate] = useState(); // 조회기간 종료일 state
  const [sellerTypeBtn, setSellerTypeBtn] = useState({ 전체: true }); // 셀러속성 button state
  const [saleBtn, setSaleBtn] = useState({ 전체: true }); // 판매여부 button state
  const [displayBtn, setDisplayBtn] = useState({ 전체: true }); // 진열여부 button state
  const [discountBtn, setDiscountBtn] = useState({ 전체: true }); // 할인여부 button state

  useEffect(() => {
    axios
      .get(`public/Data/ProductListFilter.json`)
      .then((res) => setProductData(res.data.data));
  }, []);

  //   마스터인지 셀러인지 판단하여 isMaster에 할당. 마스터일 경우 true, 셀러일 경우 false
  const isMaster = productData && productData.account_type === "master";

  // 셀러속성 button 클릭 이벤트 발생 시 함수 실행
  const handleBtn = (title) => {
    // 셀러속성 button 객체 형태로 상태 관리, key는 button title으로 value는 boolean을 부여
    setSellerTypeBtn(() => {
      // title이 "전체"일 경우 전체button만 클릭되도록 상태 지정
      if (title === "전체") {
        return { [title]: true };
        // title이 "전체"가 아닐 경우 전체button을 false로 지정, 다른 button은 true일 경우 false, false경우 true 지정
      } else if (title !== "전체") {
        return {
          ...sellerTypeBtn,
          전체: false,
          [title]: !sellerTypeBtn[title],
        };
      }
    });
  };

  useEffect(() => {
    // dataList에 productData.filter_list[0].btnList에서 "전체"를 제외한 리스트를 정의
    const dataList =
      productData &&
      productData.filter_list[0].btnList.filter((el) => el !== "전체");
    //   trueList에 sellerTypeBtn에서 value가 true인 리스트를 정의
    const trueList = Object.values(sellerTypeBtn).filter((el) => el === true);
    dataList && dataList.length === trueList.length //  sellerTypeBtn 상태가 바뀔 때마다 dataList의 length와 trueList의 length를 비교
      ? setSellerTypeBtn({ 전체: true }) //  length가 같을 경우 전체 filter_list를 선택한 것이기 때문에 sellerTypeBtn의 상태를 전체button만 클릭되도록 상태 지정
      : null;
  }, [sellerTypeBtn]);

  return (
    <ListFilterAreaWrap>
      {/* 조회 기간 */}
      <DatePeriod>
        <label>조회 기간</label>
        <DatePickerWrap>
          {/* 시작 날짜 DatePicker */}
          <StartDate
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="yyyy-MM-dd"
            placeholderText="클릭해주세요."
            shouldCloseOnSelect={false}
          />
          <span>~</span>
          {/* 종료 날짜 DatePicker */}
          <EndDate
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            dateFormat="yyyy-MM-dd"
            placeholderText="클릭해주세요."
            shouldCloseOnSelect={false}
          />
        </DatePickerWrap>
      </DatePeriod>
      {/* 셀러명 */}
      <FilterWrap>
        {/* account_type이 마스터일 경우만 셀러명 표시 */}
        {isMaster && <label>셀러명</label>}
        {/* account_type이 마스터일 경우만 검색 Input 표시 */}
        <SearchInput isMaster={isMaster}>
          {isMaster && (
            <input placeholder="검색어를 입력하세요." autoComplete="off" />
          )}
        </SearchInput>
        {/* 상품명, 상품번호, 상품코드 select */}
        <SearchSelect>
          <select>
            <option value>Select</option>
            <option value="productName">상품명</option>
            <option value="productNo">상품번호</option>
            <option value="productCode">상품코드</option>
          </select>
        </SearchSelect>
        {/* 상품명, 상품번호, 상품코드 검색 Input */}
        <SelectInput>
          <input placeholder="검색어를 입력하세요." autoComplete="off" />
        </SelectInput>
      </FilterWrap>
      {/* 셀러속성 */}
      <FilterWrap>
        {/* account_type이 마스터일 경우만 셀러속성 표시 */}
        {isMaster && <label>{productData.filter_list[0].category} :</label>}
        {/* account_type이 마스터일 경우만 셀러속성 버튼 표시 */}
        {isMaster && (
          <SellerTypeButton>
            {/* 셀러속성의 btnList data만큼 map을 돌려 button 생성 */}
            {productData.filter_list[0].btnList.map((title) => {
              return (
                <Button
                  key={title}
                  // 셀러속성 button 클릭 시 해당 button의 title을 handleBtn 함수의 인자로 전달
                  onClick={() => handleBtn(title)}
                  // sellerTypeBtn 상태를 isClicked라는 변수명으로 props 전달
                  // 선택한 셀러속성 button title이 sellerTypeBtn 객체에서 value가 true일 경우 스타일 변화
                  isClicked={sellerTypeBtn[title]}
                >
                  {title}
                </Button>
              );
            })}
          </SellerTypeButton>
        )}
      </FilterWrap>
      {/* 판매여부 & 진열여부 */}
      <FilterWrap>
        {/* 판매여부 */}
        <label>{productData && productData.filter_list[1].category} :</label>
        <ButtonWrap>
          {/* 판매여부의 btnList data만큼 map을 돌려 button 생성 */}
          {productData &&
            productData.filter_list[1].btnList.map((title) => {
              return (
                <Button
                  key={title}
                  onClick={() => setSaleBtn({ [title]: true })}
                  isClicked={saleBtn[title]}
                >
                  {title}
                </Button>
              );
            })}
        </ButtonWrap>
        {/* 진열여부 */}
        <label>{productData && productData.filter_list[2].category} :</label>
        <ButtonWrap>
          {/* 진열여부의 btnList data만큼 map을 돌려 button 생성 */}
          {productData &&
            productData.filter_list[2].btnList.map((title) => {
              return (
                <Button
                  key={title}
                  onClick={() => setDisplayBtn({ [title]: true })}
                  isClicked={displayBtn[title]}
                >
                  {title}
                </Button>
              );
            })}
        </ButtonWrap>
      </FilterWrap>
      {/* 할인여부 */}
      <FilterWrap>
        <label>{productData && productData.filter_list[3].category} :</label>
        <ButtonWrap>
          {/* 할인여부의 btnList data만큼 map을 돌려 button 생성 */}
          {productData &&
            productData.filter_list[3].btnList.map((title) => {
              return (
                <Button
                  key={title}
                  onClick={() => setDiscountBtn({ [title]: true })}
                  isClicked={discountBtn[title]}
                >
                  {title}
                </Button>
              );
            })}
        </ButtonWrap>
      </FilterWrap>
      {/* 검색&초기화 버튼 */}
      <Submit>
        <SubmitBtn type="submit" value="검색" />
        <ClearBtn type="button" value="초기화" />
      </Submit>
    </ListFilterAreaWrap>
  );
}

export default ListFilterArea;

const ListFilterAreaWrap = styled.div`
  margin-bottom: 20px;
  padding-left: 10px;
  border: 3px solid #eee;

  label {
    display: block;
    padding-left: 15px;
    width: 100px;
    ${({ theme }) => theme.font("14px", "400")};
    color: #222222;
  }
`;

const DatePeriod = styled.div`
  ${({ theme }) => theme.flex("", "center")}
  margin-top: 10px;
  margin-bottom: 5px;
  width: 100%;
`;

const DatePickerWrap = styled.div`
  display: flex;
  border-collapse: separate;
  padding: 0 15px;
  width: 25%;
  font-size: 13px;

  span {
    padding: 6px 12px;
    min-width: 39px;
    border: 1px solid #e5e5e5;
    background: #e5e5e5;
    text-align: center;
    font-size: 14px;
    font-weight: 400;
    color: #555;
    cursor: pointer;
  }
`;

const StartDate = styled(DatePicker)`
  padding: 6px 12px;
  height: 22px;
  border: 1px solid #e5e5e5;
  border-radius: 3px 0 0 3px;
  text-align: center;
  line-height: 1.42857143;
  font-size: 14px;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #999999;
    transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
  }
`;

const EndDate = styled(StartDate)`
  border-radius: 0 3px 3px 0;
`;

const FilterWrap = styled.div`
  ${({ theme }) => theme.flex("", "center")}
  margin-bottom: 5px;
  width: 100%;
`;

const SearchInput = styled.div`
  display: ${({ isMaster }) => (isMaster ? "block" : "none")};
  padding: 0 30px 0 15px;
  width: 33.33333333%;

  input {
    padding: 6px 10px;
    width: 100%;
    height: 14px;
    border: 1px solid #e5e5e5;
    border-radius: 4px;
    font-size: 13px;
    color: #333333;
    background-color: white;

    &:focus {
      outline: none;
      border-color: #999999;
      transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
    }
  }
`;

const SearchSelect = styled.div`
  padding-left: 15px;

  select {
    padding: 2px 10px;
    width: 100px;
    height: 28px;
    border: 1px solid #e5e5e5;
    border-radius: 4px;
    line-height: 28px;
    font-size: 13px;
    color: #333333;
    background-color: white;

    &:focus {
      outline: none;
      border-color: #999999;
      transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
    }
  }
`;

const SelectInput = styled(SearchInput)`
  display: block;
  padding-left: 0;
  width: 25%;
`;

const SellerTypeButton = styled(SelectInput)`
  padding-left: 15px;
  width: auto;
`;

const Button = styled.button`
  margin-right: 2px;
  margin-bottom: 0;
  padding: 6px 12px;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  line-height: 1.42857143;
  text-align: center;
  vertical-align: middle;
  font-size: 14px;
  font-weight: 400;
  color: ${({ isClicked }) => (isClicked ? "#fff" : "#333")};
  background-color: ${({ isClicked }) => (isClicked ? "#428bca" : "#fff")};
  cursor: pointer;

  &:first-child {
    margin-right: 8px;
  }

  &:hover {
    border-color: ${({ isClicked }) => (isClicked ? "#285e8e" : "#adadad")};
    background-color: ${({ isClicked }) => (isClicked ? "#3071a9" : "#e6e6e6")};
    color: ${({ isClicked }) => (isClicked ? "#fff" : "#333")};
  }

  &:focus {
    outline: none;
  }
`;

const ButtonWrap = styled(SelectInput)`
  padding-left: 15px;
  width: 33.33333333%;
`;

const Submit = styled.div`
  ${({ theme }) => theme.flex("center")}
  margin: 10px auto;
`;

const SubmitBtn = styled.input`
  margin-right: 4px;
  padding: 6px 50px;
  line-height: 1.42857143;
  border: 1px solid #357ebd;
  font-size: 14px;
  font-weight: 400;
  color: #fff;
  background-color: #428bca;
  cursor: pointer;

  &:hover {
    border-color: #285e8e;
    background-color: #3071a9;
  }

  &:focus {
    outline: none;
  }
`;

const ClearBtn = styled(SubmitBtn)`
  margin-right: 0;
  color: #333;
  background-color: #fff;
  border-color: #e5e5e5;

  &:hover {
    border-color: #adadad;
    background-color: #e6e6e6;
  }
`;
