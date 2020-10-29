import React from "react";
import styled from "styled-components";
import DaumPostcode from "react-daum-postcode";
import { MailOpen } from "@styled-icons/heroicons-outline";
import { LocationPin } from "@styled-icons/entypo";

export default function SellerAddress({ register, errors }) {
  const postCodeStyle = {
    display: "block",
    position: "absolute",
    top: "50px",
    zIndex: "100",
    padding: "7px",
  };

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    console.log(fullAddress);
  };

  return (
    <Address>
      <AddressInput>
        <SellerInput>
          <MailOpen size="14" color="#ddd" />
          <input
            type="text"
            placeholder="우편번호"
            name="postalCode"
            ref={register}
          />
          <PostalBtn className="btn">우편번호 찾기</PostalBtn>
          <DaumPostcode style={postCodeStyle} onComplete={handleComplete} />
        </SellerInput>
      </AddressInput>
      <AddressInput>
        <SellerInput>
          <LocationPin size="14" color="#ddd" />
          <input
            type="text"
            placeholder="주소 ( 택배 수령지 )"
            name="sellerAddr"
            ref={register}
          />
        </SellerInput>
      </AddressInput>
      <AddressInput>
        <SellerInput isError={errors.detailAddr}>
          <LocationPin size="14" color="#ddd" />
          <input
            type="text"
            placeholder="상세 주소 ( 택배 수령지 )"
            name="detailAddr"
            ref={register({ required: true })}
          />
        </SellerInput>
        {errors.detailAddr && <ErrorMsg>필수 입력항목입니다.</ErrorMsg>}
      </AddressInput>
    </Address>
  );
}

const Address = styled.div`
  ${({ theme }) => theme.flex("space-around", null, "column")};
`;

const AddressInput = styled.div`
  margin-bottom: 8px;
  &:last-child {
    margin-bottom: 0;
  }
  .btn {
    margin-left: 8px;
    border-radius: 4px;
    cursor: pointer;
  }
`;

const PostalBtn = styled.button`
  padding: 0 48px;
  height: 34px;
  color: #fff;
  background-color: #5cb85c;
  border: none;
  border: 1px solid #4cae4c;
`;

const SellerInput = styled.div`
  position: relative;
  ${({ theme }) => theme.flex(null, "center")};
  width: 40%;
  height: 34px;
  border-radius: 4px;

  /* isError - 에러 메세지가 있을 경우  */
  svg {
    position: absolute;
    margin: 12px;
    color: ${({ isError }) => (isError ? "#b94a48" : "#ccc")};
  }
  input {
    padding: 9px 12px;
    padding-left: 33px;
    width: 100%;
    border: 1px solid ${({ isError }) => (isError ? "#a94442" : "#ddd")};
    border-radius: 4px;
    outline: 0;
    &:placeholder {
      color: #ddd;
    }
    &:focus {
      border: 1px solid ${({ isError }) => (isError ? "#a94442" : "#999999")};
      border-radius: 4px;
    }
  }
`;

const ErrorMsg = styled.p`
  display: block;
  margin-top: 4px;
  font-size: 13px;
  color: #a94442;
`;

// const Post = styled(DaumPostcode)``;
