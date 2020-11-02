import React, { useState, Fragment } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import SellerDefaultInfo from "./SellerDefaultInfo";
import ChangePassword from "./ChangePassword";
import SellerDetailInfo from "./SellerDetailInfo";
import SellerDeliveryInfo from "./SellerDeliveryInfo";
import { User } from "@styled-icons/boxicons-solid";

export default function SellerInfo() {
  const { register, handleSubmit, errors } = useForm();
  const [isModal, setIsModal] = useState(false);

  const changePassword = (e) => {
    e.preventDefault();
    setIsModal(true);
  };

  // form Data 전송
  const onSubmit = (data) => {
    console.log("data >>> ", data);
    // alert("입력하지 않은 필수항목이 있습니다. 다시 확인해주세요.");
    // let formData = new FormData();
  };

  return (
    <Fragment>
      <SellerForm onSubmit={handleSubmit(onSubmit)}>
        {/* 셀러 기본 정보 */}
        <MemberListBox>
          <TableTitle>
            <h4>
              <User size="16" />
              기본 정보
            </h4>
          </TableTitle>
          {/* 마스터 -> 셀러 정보 변경 테이블 component */}
          <SellerDefaultInfo
            register={register}
            errors={errors}
            setIsModal={setIsModal}
            changePassword={changePassword}
          />
        </MemberListBox>
        {/* 셀러 상세 정보 */}
        <MemberListBox>
          <TableTitle>
            <h4>
              <User size="16" />
              상세 정보
            </h4>
          </TableTitle>
          {/* 마스터 -> 셀러 정보 변경 테이블 component */}
          <SellerDetailInfo register={register} errors={errors} />
        </MemberListBox>
        {/* 셀러 배송 정보 */}
        <MemberListBox>
          <TableTitle>
            <h4>
              <User size="16" />
              배송정보 및 교환/환불 정보
            </h4>
          </TableTitle>
          {/* 셀러 배송 정보 테이블 component */}
          <SellerDeliveryInfo register={register} errors={errors} />
        </MemberListBox>

        <SellerInfoBtn>
          <button
            type="submit"
            className="btn btn-success disabled"
            id="save_button"
          >
            수정
          </button>
          <button type="button" className="btn btn-default" id="back_button">
            취소
          </button>
        </SellerInfoBtn>
      </SellerForm>
      {/* 셀러 비밀번호 찾기 */}
      {isModal && <ChangePassword setIsModal={setIsModal} />}
    </Fragment>
  );
}

const MemberListBox = styled.div`
  margin-bottom: 60px;
  -webkit-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.07);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.07);
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const SellerForm = styled.form`
  width: 100%;
`;

const TableTitle = styled.div`
  ${({ theme }) => theme.flex("space-between", "center")};
  padding: 8px 12px;
  height: 38px;
  background-color: #eee;
  border-radius: 4px 4px 0 0;
  h4 {
    color: #333;
    font-size: 16px;
    line-height: 16px;
    font-weight: 400;
    margin-top: 1px;
    margin-left: 4px;
    svg {
      margin-right: 4px;
    }
  }
`;

const SellerInfoBtn = styled.div`
  ${({ theme }) => theme.flex("center", "center")};
  margin: 24px 0;
  padding-bottom: 36px;
  button {
    margin: 4px;
    padding: 6px 12px;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.42857143;
    text-align: center;
    background-color: #fff;
    color: #999;
    border: none;
    border: 1px solid #ccc;
    border-radius: 4px;
    cursor: pointer;
    &.btn-success {
      color: #fff;
      background-color: #5cb85c;
      border-color: #4cae4c;
    }
  }
`;
