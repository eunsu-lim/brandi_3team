import React, { useState } from "react";
import styled from "styled-components";
import { InfoCircleFill } from "@styled-icons/bootstrap";

export default function UploadImg({ register }) {
  const [imgPreview, setImgPreview] = useState("");
  const [imgFile, setImgFile] = useState(null);

  // 이미지 파일 업로드 (미리보기)
  const handleUploadFile = (e) => {
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = (e) => {
      const preview = reader.result;
      if (preview) {
        setImgPreview(preview.toString());
      }
    };

    if (file) {
      reader.readAsDataURL(file);
      setImgFile(file);
    }
  };
  return (
    <UploadBox>
      {imgPreview ? ( // 이미지가 있을 경우
        <InputImg>
          <img src={imgPreview} />
        </InputImg>
      ) : (
        // 기존 이미지가 없을 경우
        <NoImg>
          <img src="https://image.brandi.me/seller/noimage.png" />
        </NoImg>
      )}

      <label htmlFor="ImgUpload">
        <span>이미지 선택</span>
        <input
          type="file"
          id="ImgUpload"
          name="uploadFile"
          onChange={handleUploadFile}
          ref={register({ required: true })}
        />
      </label>

      <span className="info">
        <InfoCircleFill size="14" />
        셀러 프로필 확장자는 <b> jpg, jpeg, png</b> 만 가능하며, 허용 가능한
        최대 파일사이즈 크기는 <b> 5MB</b> 입니다.
      </span>
    </UploadBox>
  );
}

const UploadBox = styled.div`
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
  display: flex;
  margin-bottom: 8px;
  padding: 8px;
  max-width: 130px;
  background-color: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  img {
    width: 100%;
    object-fit: contain;
  }
`;
