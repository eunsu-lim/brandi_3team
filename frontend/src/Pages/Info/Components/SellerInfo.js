import React, { useState, useEffect, Fragment } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { useForm } from "react-hook-form";
import { ACCOUNT_API } from "../../../Config/api";
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

  const history = useHistory();

  // 이미지 파일 업데이트 관리
  const [profileImg, setProfileImg] = useState(null);
  const [isProfileChange, setProfileChange] = useState(false);
  const [backImg, setBackImg] = useState(null);
  const [isBackChange, setBackChange] = useState(false);
  const [checked, setChecked] = useState(false);
  // backend 통신으로 가져올 데이터 관리
  const [infos, setInfos] = useState("");

  // backend 통신 회원 정보 가져오기
  useEffect(() => {
    axios
      .get(`${ACCOUNT_API}/sellers/seller-details`, {
        headers: { Authorization: localStorage.getItem("Authorization") },
      })
      .then((res) => {
        setInfos(res.data.seller_data);
      });
  }, []);

  // formData 전송
  const onSubmit = (data) => {
    if (data) {
      const editInfo = confirm("셀러 정보를 수정하시겠습니까?");
      if (editInfo == true) {
        try {
          console.log("data:", data);
          const formData = new FormData();
          formData.append("profile_image", data.profile_image[0]);
          formData.append("background_image_url", data.background_image_url[0]);
          Object.keys(data).forEach((key) => formData.append(key, data[key]));

          const opening_time = formattedWeekdayFrom();
          const closing_time = formattedWeekdayTo();

          data = { ...data, opening_time, closing_time };

          axios
            .patch(`${ACCOUNT_API}/sellers/edit-seller-details`, formData, {
              headers: {
                Authorization: localStorage.getItem("Authorization"),
                "Content-Type": "multipart/form-data",
              },
            })
            .then((res) => {
              alert("셀러 정보가 수정되었습니다.");
              setTimeout(() => {
                window.location.reload(), window.scrollTo(0, 0), 3000;
              });
            });
        } catch (err) {
          console.log(err);
          alert("오류 발생!!");
        }
      } else {
        alert("정보 수정이 취소 되었습니다.");
      }
    }
  };
  // 이미지 파일 업로드
  const uploadProfileImg = (e) => {
    let reader = new FileReader();
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
        setProfileChange(true);
      }
    };
  };

  // 이미지 삭제 버튼 클릭시 초기화
  const removeProfileImg = () => {
    var file = document.getElementById("profile_image").files;
    setValue("profile_image", null);
    setProfileImg(null);
    setProfileChange(false);
  };

  // 이미지 파일 업로드
  const uploadBackImg = (e) => {
    let reader = new FileReader();
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
        setBackChange(true);
      }
    };
  };

  // 이미지 삭제 버튼 클릭시 초기화
  const removeBackImg = () => {
    var file = document.getElementById("background_image_url").files;
    setValue("background_image_url", null);
    setBackImg(null);
    setBackChange(false);
  };

  const formattedWeekdayFrom = () => {
    // ex) 09:00 AM
    const from = dayjs(weekdayFrom).format("h:mm a");
    return from;
  };

  const formattedWeekdayTo = () => {
    const to = dayjs(weekdayTo).format("h:mm a");
    return to;
  };

  const changePassword = (e) => {
    e.preventDefault();
    setIsModal(true);
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
            infos={infos}
            uploadId="profile_image"
            profileImg={profileImg ? profileImg : infos && infos.profile_image}
            isChangeImg={isProfileChange}
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
            infos={infos}
            checked={checked}
            setChecked={setChecked}
            uploadId="background_image_url"
            backImg={backImg ? backImg : infos && infos.background_image_url}
            isChangeImg={isBackChange}
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
          <SellerDeliveryInfo
            register={register}
            errors={errors}
            infos={infos}
          />
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
