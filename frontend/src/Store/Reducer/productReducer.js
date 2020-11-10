const productReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      // Redux는 불변성을 유지해야한다.
      return [...state, action.payload];
    case "DELETE_ITEM":
      return [...action.payload];

    default:
      return state;
  }
};

export default productReducer;

const INITIAL_STATE = [
  {
    isChecked: true,
    product_name: "플루크 new 피그먼트 오버핏 반팔 티셔츠 FST701",
    product_id: 1304,
    product_img: "/images/tShirt.jpg",
    price: 33250,
  },
  {
    isChecked: true,
    product_name: "르아브 미니멀리즘 네이비 블루 셔츠",
    product_id: 4204,
    product_img: "/images/blueShirts.png",
    price: 43250,
  },
  {
    isChecked: true,
    product_name: "랩12 20SS 오픈 카라/투 버튼 피케 티셔츠",
    product_id: 4204,
    product_img: "/images/piShirts.png",
    price: 103250,
  },
  {
    isChecked: true,
    product_name: "랩12 20SS 오픈 카라/투 버튼 피케 티셔츠",
    product_id: 4204,
    product_img: "/images/pants.png",
    price: 53250,
  },
];
