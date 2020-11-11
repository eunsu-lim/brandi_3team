import React from "react";
import styled from "styled-components";

function CheckBox({
  isChecked,
  setIsChecked,
  allChecked,
  listId,
  productData,
}) {
  // 체크박스 클릭 시 해당 함수 실행
  const handleCheck = () => {
    // 클릭한 체크박스가 전체 선택일 경우 isChecked에서 allchecked의 value를 변경
    allChecked
      ? setIsChecked(() => {
          //  allChecked가 이미 true일 경우(선택되어 있는 경우)
          if (isChecked.allChecked) {
            // allChecked를 false로 지정
            return { allChecked: false };
            // allChecked가 false일 경우(선택되어 있지 않은 경우)
          } else {
            const checkedObj = {};
            productData.map((el) => {
              checkedObj[el.id] = true;
            });
            // isChecked에서 allChecked의 value를 true로 지정하고 모든 list의 id를 key, value로 true를 지정
            return { allChecked: true, ...checkedObj };
          }
        })
      : // 클릭한 체크박스가 개별 선택일 경우
        setIsChecked({
          ...isChecked,
          allChecked: false,
          [listId]: !isChecked[listId],
        });
    // isChecked에서 allChecked의 value를 false로 지정하고 해당 리스트의 id값을 key, value값을 true 또는 false로 변경
  };

  return (
    <CheckBoxWrap>
      <input
        type="checkbox"
        onClick={handleCheck}
        // isChecked에서 allChecked가 true일 경우 모든 체크박스를 true로 지정하여 전체 선택
        // 그렇지 않을 경우 isChecked에서 해당 listId의 value가 true일 경우 true, false일 경우 false로 지정하여 선택 및 해제
        checked={isChecked.allChecked ? true : isChecked[listId] ? true : false}
      />
    </CheckBoxWrap>
  );
}

export default CheckBox;

const CheckBoxWrap = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;

  input {
    width: 16px;
    height: 16px;
  }
`;
