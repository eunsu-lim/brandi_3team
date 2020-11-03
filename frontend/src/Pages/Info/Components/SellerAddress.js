import React, { useState } from "react";
import styled from "styled-components";
import DaumPostcode from "react-daum-postcode";
import { MailOpen } from "@styled-icons/heroicons-outline";
import { LocationPin } from "@styled-icons/entypo";

export default function SellerAddress({ register, errors }) {
  const [isPostOpen, setIsPostOpen] = useState(false);
  const [isAddress, setIsAddress] = useState("");
  const [isZoneCode, setIsZoneCode] = useState();

  const handlePostOpen = (e) => {
    e.preventDefault();
    setIsPostOpen(true);
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
    setIsZoneCode(data.zonecode);
    setIsAddress(fullAddress);
    setIsPostOpen(false);
  };

  const postCodeStyle = {
    display: "block",
    position: "absolute",
    top: "50%",
    left: "50%",
    marginLeft: "-200px",
    marginTop: "-250px",
    width: "400px",
    height: "500px",
    padding: "7px",
    border: "3px solid black",
    background: "#fff",
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
            defaultValue={isZoneCode}
            ref={register}
            readOnly={true}
          />
          <PostalBtn className="btn" onClick={(e) => handlePostOpen(e)}>
            우편번호 찾기
          </PostalBtn>
          {isPostOpen && (
            <PostWrap
              onClick={() => {
                setIsPostOpen(false);
              }}
            >
              <DaumPostcode style={postCodeStyle} onComplete={handleComplete} />
            </PostWrap>
          )}
        </SellerInput>
      </AddressInput>
      <AddressInput>
        <SellerInput>
          <LocationPin size="14" color="#ddd" />
          <input
            type="text"
            placeholder="주소 ( 택배 수령지 )"
            name="sellerAddr"
            defaultValue={isAddress}
            ref={register}
            readOnly={true}
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

const PostWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 100;
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
    top: 0;
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
