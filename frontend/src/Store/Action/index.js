// 액션 생성 함수 정의

// Account Type 액션 생성 함수
export const saveAccountType = (type) => {
  return {
    type: "SAVE_ACCOUNT",
    payload: type,
  };
};

// Filter List 액션 생성 함수
export const saveFilterList = (list) => {
  return {
    type: "SAVE_FILTER",
    payload: list,
  };
};

// Nav List 액션 생성 함수
export const saveNavList = (list) => {
  return {
    type: "SAVE_NAV",
    payload: list,
  };
};
