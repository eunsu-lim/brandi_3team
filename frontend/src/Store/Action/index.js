export const addProduct = (item) => {
  return {
    // addProduct가 실행됐을 때,
    // type과 payload를 담은 객체가 리턴되도록 설정
    type: "ADD_ITEM",
    payload: item,
  };
};

export const deleteProduct = (items) => {
  return {
    type: "DELETE_ITEM",
    payload: items,
  };
};
