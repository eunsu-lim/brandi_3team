import React from "react";
import styled from "styled-components";
import { ArrowForwardIos } from "@styled-icons/material-sharp/ArrowForwardIos";

function OrderProductInfo() {
  return (
    <ProductInfoContainer>
      <ProductInfoTitle>
        <ArrowForwardIos size="10" />
        <span>상품 정보</span>
      </ProductInfoTitle>
      <ProductNumberName>
        <div>
          <div>상품번호:</div>
          <label htmlFor="">17082238 (17082237)</label>
        </div>
        <div>
          <div>상품명: </div>
          <label htmlFor="">vivi 반팔자켓 린넨자켓 2col_무드글램</label>
        </div>
      </ProductNumberName>
      <hr />
      <ProductPriceDiscountRate>
        <div>
          <div>상품 판매가 : </div>
          <label htmlFor="">18,700 원 </label>
        </div>
        <div>
          <div>상품 할인율 : </div>
          <label htmlFor="">0 %</label>
        </div>
      </ProductPriceDiscountRate>
      <hr />
      <ProductBrandOption>
        <div>
          <div>브랜드명 : </div>
          <label htmlFor="">무드글램</label>
        </div>
        <div>
          <div>옵션정보 : </div>
          <label htmlFor="">베이지</label>
        </div>
      </ProductBrandOption>
      <hr />
      <ProductQuantity>
        <div>
          <div>구매수량 : </div>
          <label htmlFor="">1 개</label>
        </div>
      </ProductQuantity>
    </ProductInfoContainer>
  );
}

export default OrderProductInfo;

const ProductInfoContainer = styled.div`
  padding: 0 10px 2px 20px;
  margin-bottom: 20px;
  border-radius: 4px 4px 0 0;
  border: 1px solid #eee;
  font-size: 13px;

  label {
    color: #333;
    font-size: 14px;
    height: 38px;
    font-weight: 400;
    margin-top: 1px;
    margin-bottom: 15px;
    margin-left: 5px;
    padding: 0;
  }
`;

const ProductInfoTitle = styled.div`
  height: 38px;
  background-color: #eee;
  border-radius: 4px 4px 0 0;
  padding: 10px 10px 2px 10px;
  margin-left: -20px;
  margin-right: -10px;

  span {
    display: inline-block;
    margin-top: 1px;
    margin-left: 5px;
    padding: 0;
    line-height: 16px;
    font-size: 16px;
    font-weight: 400;
    color: #333;
  }
`;

const ProductNumberName = styled.div`
  width: 100%;
  padding: 10px 10px 0 10px;

  div {
    display: inline-block;
    width: 50%;
    margin-bottom: 5px;

    div {
      width: 33.3%;
    }

    label {
      width: 66.6%;
    }
  }
`;

const ProductPriceDiscountRate = styled(ProductNumberName)``;
const ProductBrandOption = styled(ProductNumberName)``;
const ProductQuantity = styled(ProductNumberName)``;
