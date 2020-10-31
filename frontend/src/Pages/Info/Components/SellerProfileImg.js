import React, { useState } from "react";
import styled from "styled-components";

export default function SellerProfileImg({ register }) {
  // 이미지 미리보기
  const [imgPreview, setImgPreview] = useState("");
  // 이미지 파일 업데이트 관리
  const [imgFile, setImgFile] = useState();

  // 이미지 파일 업로드 (미리보기)
  const handleUploadFile = (e) => {
    let reader = new FileReader();
    console.log("e.target.files >>> ", e.target.files);
    let file = e.target.files[0];

    reader.onloadend = (e) => {
      const preview = reader.result;
      // 이미지 미리보기
      if (preview) {
        setImgPreview(preview.toString());
      }
    };

    if (file) {
      reader.readAsDataURL(file);
      // 이미지 업데이트
      setImgFile(file);
    }
  };

  // onClick={() => this.props.handleID(인자)}

  return (
    <UploadBox>
      {imgPreview ? ( // 이미지가 있을 경우
        <div>
          <InputImg>
            <img src={imgPreview} />
          </InputImg>
          <label htmlFor="ImgUpload">
            <span>변경</span>
            <input
              type="file"
              id="ImgUpload"
              name="SellerProfileImg"
              onChange={handleUploadFile}
              ref={register({ required: true })}
            />
          </label>
        </div>
      ) : (
        // 기존 이미지가 없을 경우
        <div>
          <NoImg>
            <img src="https://image.brandi.me/seller/noimage.png" />
          </NoImg>
          <label htmlFor="ImgUpload">
            <span>이미지 선택</span>
            <input
              type="file"
              id="ImgUpload"
              name="SellerProfileImg"
              onChange={handleUploadFile}
              ref={register({ required: true })}
            />
          </label>
        </div>
      )}
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
    padding: 4px 12px;
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
