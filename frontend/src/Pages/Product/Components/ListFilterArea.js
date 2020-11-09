import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";

// DatePicker css 적용을 위해 css파일 만들어 준 다음 import
import "./DatePickerCss.css";

function ListFilterArea({
  productData,
  sortData,
  setSortData,
  isMaster,
  postSortData,
}) {
  const [startDate, setStartDate] = useState(); // 조회기간 시작일 state
  const [endDate, setEndDate] = useState(); // 조회기간 종료일 state
  const [select, setSelect] = useState(); // 상품명, 상품코드, 상품번호 select state
  const [selectFilter, setSelectFilter] = useState(); // 상품명, 상품코드, 상품번호 검색어 state
  const [sellerTypeBtn, setSellerTypeBtn] = useState({ 전체: true }); // 셀러속성 button state
  const [saleBtn, setSaleBtn] = useState({ 전체: true }); // 판매여부 button state
  const [displayBtn, setDisplayBtn] = useState({ 전체: true }); // 진열여부 button state
  const [discountBtn, setDiscountBtn] = useState({ 전체: true }); // 할인여부 button state

  // 셀러속성 button 클릭 이벤트 발생 시 함수 실행
  const handleBtn = (title, id) => {
    setSellerTypeBtn(() => {
      // 셀러속성 button 객체 형태로 상태 관리, key는 button title로 value는 boolean을 부여
      if (title === "전체") {
        // title이 "전체"일 경우 전체button만 클릭되도록 상태 지정
        return { [title]: true };
      } else if (title !== "전체") {
        // title이 "전체"가 아닐 경우 전체button을 false로 지정, 다른 button은 true일 경우 false, false경우 true 지정
        return {
          ...sellerTypeBtn,
          전체: false,
          [title]: !sellerTypeBtn[title],
        };
      }
    });

    // 셀러속성 button 클릭 시 해당 button의 id를 sortData에서 sellerType의 value 값으로 지정
    // 셀러속성 button은 중복 선택이 가능하기 때문에 value 값을 배열로 관리
    setSortData(() => {
      if (id === "1") {
        // 클릭한 셀러속성 button이 "전체"일 경우
        return { ...sortData, sellerType: ["1"] }; // sortData에서 sellerType의 값을 [1]로 변경
      } else if (sortData.sellerType && sortData.sellerType.includes(id)) {
        // 클릭한 id가 sortData sellerType에 포함되어 있는지 확인
        // 포함되어 있다면 셀러속성 button이 이미 선택 되었다가 해제되는 것을 의미하기 때문에
        let idx = sortData.sellerType.indexOf(id); // 배열 안에서 해당 id의 index를 확인한 다음
        sortData.sellerType.splice(idx, 1); // sortData에서 sellerType의 value에서 해당 id 값을 제거
        return { ...sortData, sellerType: sortData.sellerType };
      } else {
        // 클릭한 셀러속성 button이 "전체"도 아니고 sortData sellerType에 포함되어 있지 않다면 해당 id를 value 값으로 저장
        return {
          ...sortData,
          sellerType:
            sortData.sellerType && !sortData.sellerType.includes("1") // sellerType 키 값과 밸류가 있을 경우
              ? [...sortData.sellerType, id] // 기존 value에 클릭한 id 추가
              : [id], // sellerType 키 값과 밸류가 없을 경우 클릭한 id만 추가
        };
      }
    });
  };

  // 셀러속성 button 클릭 이벤트 외 상태 관리
  // 1. 모든 버튼을 클릭했을 때 "전체" 버튼으로 변경
  // 2. 모든 버튼 해제했을 때 "전체" 버튼으로 변경
  useEffect(() => {
    // dataList에 productData.filter_list[0].btnList에서 "전체"를 제외한 리스트를 정의
    const dataList =
      productData &&
      productData.filter_list[0].btnList.filter((el) => el.btn !== "전체");
    //   trueList에 sellerTypeBtn에서 value가 true인 리스트를 정의
    const trueList = Object.values(sellerTypeBtn).filter((el) => el === true);
    dataList && dataList.length === trueList.length //  sellerTypeBtn 상태가 바뀔 때마다 dataList의 length와 trueList의 length를 비교
      ? setSellerTypeBtn({ 전체: true }) & //  length가 같을 경우 전체 filter_list를 선택한 것이기 때문에 sellerTypeBtn의 상태를 전체button만 클릭되도록 상태 지정
        setSortData({ ...sortData, sellerType: ["1"] }) // 전체 button으로 바뀌면 sortData에서 sellerType의 value를 [1]로 변경
      : null;

    // 선택한 셀러속성 button이 없을 경우 전체 button이 선택되도록 sellerTypeBtn state 값 변경
    Object.values(sellerTypeBtn).includes(true) === false
      ? setSellerTypeBtn({ 전체: true }) &
        setSortData({ ...sortData, sellerType: ["1"] }) // 전체 button으로 바뀌면 sortData에서 sellerType의 value를 [1]로 변경
      : null;
  }, [sellerTypeBtn]);

  // 상품이름, 상품번호, 상품코드 select 변경될 때마다 sortData 변경
  useEffect(() => {
    // 기존에 선택된 select가 있을 경우, 해당 key와 value를 삭제 후 새로 선택된 select를 sortData에 추가
    sortData.productName && delete sortData.productName;
    sortData.productNo && delete sortData.productNo;
    sortData.productCode && delete sortData.productCode;
    setSortData({ ...sortData, [select]: selectFilter });
  }, [select]);

  // 상품이름, 상품번호, 상품코드 검색어 변경될 때마다 sortData 변경
  useEffect(() => {
    setSortData({ ...sortData, [select]: selectFilter });
  }, [selectFilter]);

  // 선택한 조회기간 날짜를 서버에서 원하는 형식으로 바꿔주는 함수(ex. yyyy-mm-dd)
  const getFormattedDate = (date) => {
    const d = new Date(date);
    let year = d.getFullYear();
    let month = 1 + d.getMonth();
    let day = d.getDate();
    // month와 day가 10 이상일 경우 그대로 출력, 10 이하일 경우 앞에 0 을 붙인 뒤 출력
    return `${year}-${month >= 10 ? month : "0" + month}-${
      day >= 10 ? day : "0" + day
    }`;
  };

  return (
    <ListFilterAreaWrap>
      {/* 조회 기간 */}
      <DatePeriod>
        <label>조회 기간</label>
        <DatePickerWrap>
          {/* 시작 날짜 DatePicker */}
          <StartDate
            selected={startDate}
            onChange={(date) => {
              setStartDate(date);
              // 조회기간 시작일 선택 시 sortData에 해당 날짜 저장
              // getFormattedDate 함수를 통해 날짜 형식을 yyyy-mm-dd 형태로 변경하여 저장
              setSortData({
                ...sortData,
                filterDateFrom: getFormattedDate(date),
              });
            }}
            dateFormat="yyyy-MM-dd"
            placeholderText="클릭해주세요."
            shouldCloseOnSelect={false}
          />
          <span>~</span>
          {/* 종료 날짜 DatePicker */}
          <EndDate
            selected={endDate}
            onChange={(date) => {
              setEndDate(date);
              setSortData({
                ...sortData,
                filterDateTo: getFormattedDate(date),
              });
            }}
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
            <input
              placeholder="검색어를 입력하세요."
              autoComplete="off"
              onChange={(e) =>
                // 입력한 값을 sortData에 저장
                setSortData({ ...sortData, sellerName: e.target.value })
              }
            />
          )}
        </SearchInput>
        {/* 상품명, 상품번호, 상품코드 select */}
        <SearchSelect>
          <select onChange={(e) => setSelect(e.target.value)}>
            <option>Select</option>
            <option value="productName">상품명</option>
            <option value="productNo">상품번호</option>
            <option value="productCode">상품코드</option>
          </select>
        </SearchSelect>
        {/* 상품명, 상품번호, 상품코드 검색 Input */}
        <SelectInput>
          <input
            placeholder="검색어를 입력하세요."
            autoComplete="off"
            onChange={(e) =>
              // 입력한 값을 selectFilter에 저장
              setSelectFilter(e.target.value)
            }
          />
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
            {productData.filter_list[0].btnList.map((obj) => {
              return (
                <Button
                  key={obj.btn}
                  // 셀러속성 button 클릭 시 해당 button의 title과 id를 handleBtn 함수의 인자로 전달
                  onClick={() => handleBtn(obj.btn, obj.id)}
                  // sellerTypeBtn 상태를 isClicked라는 변수명으로 props 전달
                  // 선택한 셀러속성 button title이 sellerTypeBtn 객체에서 value가 true일 경우 스타일 변화
                  isClicked={sellerTypeBtn[obj.btn]}
                >
                  {obj.btn}
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
            productData.filter_list[1].btnList.map((obj) => {
              return (
                <Button
                  key={obj.btn}
                  onClick={() => {
                    setSaleBtn({ [obj.btn]: true }); // 클릭한 판매여부 button을 true 값으로 상태 변경
                    setSortData({ ...sortData, salesStatus: obj.id }); // 클릭한 판매여부 button의 id를 부모 컴포넌트의 sortData state에 추가
                  }}
                  // 선택한 셀러속성 button title이 sellerTypeBtn 객체에서 value가 true일 경우 스타일 변화
                  isClicked={saleBtn[obj.btn]}
                >
                  {obj.btn}
                </Button>
              );
            })}
        </ButtonWrap>
        {/* 진열여부 */}
        <label>{productData && productData.filter_list[2].category} :</label>
        <ButtonWrap>
          {/* 진열여부의 btnList data만큼 map을 돌려 button 생성 */}
          {productData &&
            productData.filter_list[2].btnList.map((obj) => {
              return (
                <Button
                  key={obj.btn}
                  onClick={() => {
                    setDisplayBtn({ [obj.btn]: true }); // 클릭한 진열여부 button을 true 값으로 상태 변경
                    setSortData({ ...sortData, displayStatus: obj.id }); // 클릭한 진열여부 button의 id를 부모 컴포넌트의 sortData state에 추가
                  }}
                  // 선택한 셀러속성 button title이 sellerTypeBtn 객체에서 value가 true일 경우 스타일 변화
                  isClicked={displayBtn[obj.btn]}
                >
                  {obj.btn}
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
            productData.filter_list[3].btnList.map((obj) => {
              return (
                <Button
                  key={obj.btn}
                  onClick={() => {
                    setDiscountBtn({ [obj.btn]: true }); // 클릭한 할인여부 button을 true 값으로 상태 변경
                    setSortData({ ...sortData, discountStatus: obj.id }); // 클릭한 할인여부 button의 id를 부모 컴포넌트의 sortData state에 추가
                  }}
                  // 선택한 셀러속성 button title이 sellerTypeBtn 객체에서 value가 true일 경우 스타일 변화
                  isClicked={discountBtn[obj.btn]}
                >
                  {obj.btn}
                </Button>
              );
            })}
        </ButtonWrap>
      </FilterWrap>
      {/* 검색&초기화 버튼 */}
      <Submit>
        <SubmitBtn type="submit" value="검색" onClick={postSortData} />
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
