import React, { useState } from "react";
import styled from "styled-components";

export default function ImgUpload({
  refImg,
  uploadId,
  isChangeImg,
  imgFile,
  name,
  onChange,
  removeFile,
}) {
  return (
    <UploadBox>
      <ChangeImg>
        {imgFile ? (
          <InputImg>
            <img src={imgFile} />
          </InputImg>
        ) : (
          <NoImg>
            <img src="https://image.brandi.me/seller/noimage.png" />
          </NoImg>
        )}
        <ChangeBtn>
          <label htmlFor={uploadId} className={imgFile ? "reImgUpload" : ""}>
            <span>{isChangeImg ? "변경" : "이미지 선택"}</span>
            <input
              type="file"
              id={uploadId}
              name={name}
              onChange={onChange}
              ref={refImg}
              accept="image/*"
            />
          </label>
          {isChangeImg && (
            <button
              type="button"
              className="btn deleteBtn"
              onClick={removeFile}
            >
              삭제
            </button>
          )}
        </ChangeBtn>
      </ChangeImg>
    </UploadBox>
  );
}

const UploadBox = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  label {
    position: relative;
    margin-bottom: 4px;
    padding: 6px 12px;
    border: 1px solid #e5e5e5;
    border-radius: 4px;
    background-color: #fff;
    cursor: pointer;
    &:hover {
      background-color: #ddd;
      border: 1px solid #ccc;
    }
    span {
      font-size: 14px;
      font-weight: normal;
      color: #333;
      cursor: pointer;
    }

    input {
      opacity: 0;
      position: absolute;
      left: 0;
      width: 80px;
      cursor: pointer;
    }
  }
  .info {
    margin-top: 8px;
  }

  .btn {
    padding: 6px 12px;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;
  }
`;

const ChangeImg = styled.div`
  ${({ theme }) => theme.flex("flex-start", null, "column")};
`;

const ChangeBtn = styled.div`
  .reImgUpload {
    padding: 7px 12px;
    input {
      width: 50px;
    }
  }

  .deleteBtn {
    margin-left: 4px;
    color: #fff;
    background-color: #d9534f;
    border: 1px solid #d43f3a;
    &:hover {
      color: #fff;
      background-color: #c9302c;
      border-color: #ac2925;
    }
  }
`;

const NoImg = styled.div`
  margin-bottom: 8px;
  max-width: 130px;
  max-height: 100px;
  object-fit: cover;
  border-radius: 4px;
  border: 1px solid #e5e5e5;
  background-color: #fff;
  img {
    width: 90px;
    height: 90px;
    margin: 5px 20px;
  }
`;

const InputImg = styled.div`
  margin-bottom: 8px;
  padding: 4px;
  max-width: 200px;
  background-color: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  display: inline-block;
  line-height: 0;
  img {
    max-width: 100%;
    height: auto;
    max-height: 140px;
  }
`;
