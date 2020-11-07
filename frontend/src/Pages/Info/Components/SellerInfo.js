import React, { useState, useEffect, Fragment } from "react";
import styled from "styled-components";
import axios from "axios";
import { useForm } from "react-hook-form";
import Resizer from "react-image-file-resizer";
import dayjs from "dayjs";
import SellerDefaultInfo from "./SellerDefaultInfo";
import ChangePassword from "./ChangePassword";
import SellerDetailInfo from "./SellerDetailInfo";
import SellerDeliveryInfo from "./SellerDeliveryInfo";
import { User } from "@styled-icons/boxicons-solid";

export default function SellerInfo() {
  const { register, handleSubmit, errors, setValue } = useForm();
  const [isModal, setIsModal] = useState(false);
  const [weekdayFrom, handleWeekdayFrom] = useState(
    new Date("2020-10-28T09:00:00")
  );
  const [weekdayTo, handleWeekdayTo] = useState(
    new Date("2020-10-28T18:00:00")
  );
  const [weekendFrom, handleWeekendFrom] = useState(
    new Date("2020-10-28T09:00:00")
  );
  const [weekendTo, handleWeekendTo] = useState(
    new Date("2020-10-28T18:00:00")
  );

  // 이미지 파일 업데이트 관리
  const [profileImg, setProfileImg] = useState();
  const [backImg, setBackImg] = useState();

  const [checked, setChecked] = useState(false);

  // backend 통신 회원 정보 가져오기
  useEffect(() => {
    console.log(getData);
  }, []);

  // 이미지 파일 업로드
  const uploadProfileImg = (e) => {
    let reader = new FileReader();
    console.log("e.target.files >>> ", e.target.files);

    let file = e.target.files[0];

    if (file) {
      reader.readAsDataURL(file);
      // 이미지의 새로운 base64 URI로 반환
      // file, maxWidth, maxHeight, compressFormat, quality, rotation, responseUriFunc, outputType, minWidth, minHeight;
      Resizer.imageFileResizer(
        file,
        300,
        300,
        "",
        100,
        0,
        (uri) => {
          // 이미지 업데이트
          setProfileImg(uri);
        },
        "base64",
        200,
        200
      );
    }

    reader.onloadend = (e) => {
      const preview = reader.result;
      // 이미지 미리보기
      if (preview) {
        setProfileImg(preview.toString());
      }
    };
  };

  // 이미지 삭제 버튼 클릭시 초기화
  const removeProfileImg = () => {
    var file = document.getElementById("profileImg").files;
    console.log("file >>> ", file);
    setValue("sellerProfileImg", (file.FileList = null));
    console.log("del >>> ", file);
    setProfileImg();
  };

  // 이미지 파일 업로드
  const uploadBackImg = (e) => {
    let reader = new FileReader();
    console.log("e.target.files >>> ", e.target.files);

    let file = e.target.files[0];

    if (file) {
      reader.readAsDataURL(file);
      // 이미지의 새로운 base64 URI로 반환
      // file, maxWidth, maxHeight, compressFormat, quality, rotation, responseUriFunc, outputType, minWidth, minHeight;
      Resizer.imageFileResizer(
        file,
        300,
        300,
        "",
        100,
        0,
        (uri) => {
          // 이미지 업데이트
          setBackImg(uri);
        },
        "base64",
        200,
        200
      );
    }

    reader.onloadend = (e) => {
      const preview = reader.result;
      // 이미지 미리보기
      if (preview) {
        setBackImg(preview.toString());
      }
    };
  };

  // 이미지 삭제 버튼 클릭시 초기화
  const removeBackImg = () => {
    var file = document.getElementById("backImg").files;
    console.log("file >>> ", file);
    setValue("sellerBackImg", (file.FileList = null));
    console.log("del >>> ", file);
    setBackImg();
  };

  const formattedWeekdayFrom = () => {
    const from = dayjs(weekdayFrom).format(THHmm);
    // Time  09:00 형식으로 변경
    return from;
  };

  const formattedWeekdayTo = () => {
    const to = dayjs(weekdayTo);
    const endTime = `${to.hour() < 10 ? "0" + to.hour() : to.hour()}:${
      to.minute() < 10 ? "0" + to.minute() : to.minute()
    }`;
    return endTime;
  };

  const changePassword = (e) => {
    e.preventDefault();
    setIsModal(true);
  };

  // form Data 전송
  const onSubmit = (data) => {
    console.log("data >>> ", data);
    const startTime = formattedWeekdayFrom();
    const endTime = formattedWeekdayTo();
    data = { ...data, startTime, endTime };
    console.log("new data >>> ", data);
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
            uploadId="profileImg"
            profileImg={profileImg}
            uploadProfileImg={uploadProfileImg}
            removeProfileImg={removeProfileImg}
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
          <SellerDetailInfo
            register={register}
            errors={errors}
            checked={checked}
            setChecked={setChecked}
            uploadId="backImg"
            backImg={backImg}
            uploadBackImg={uploadBackImg}
            removeBackImg={removeBackImg}
            weekdayFrom={weekdayFrom}
            weekdayTo={weekdayTo}
            weekendFrom={weekendFrom}
            weekendTo={weekendTo}
            handleWeekdayFrom={handleWeekdayFrom}
            handleWeekdayTo={handleWeekdayTo}
            handleWeekendFrom={handleWeekendFrom}
            handleWeekendTo={handleWeekendTo}
          />
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
