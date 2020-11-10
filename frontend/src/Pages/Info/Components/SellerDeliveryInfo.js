import React from "react";
import styled from "styled-components";
import { InfoCircleFill, TelephoneFill } from "@styled-icons/bootstrap";

export default function SellerDeliveryTable({ register, errors, infos }) {
  return (
    <TableContainer>
      <SellerTable>
        <tbody>
          <tr>
            <td>
              배송 정보
              <Require> *</Require>
            </td>
            <td>
              <DeliveryContent isError={errors.delivery_description}>
                <textarea
                  placeholder="ex)&#13;&#10;도서산간 지역은 배송비가 추가비용이 발생할 수 있습니다.&#13;&#10;결제 완료 후 1~3일 후 출고됩니다."
                  name="delivery_description"
                  defaultValue={infos.delivery_description}
                  ref={register({ required: true })}
                />
                {errors.delivery_description && (
                  <ErrorMsg>필수 입력 항목입니다.</ErrorMsg>
                )}
                <InfoLine>
                  <InfoSmall>
                    <InfoCircleFill size="14" />
                    <span className="info">
                      문장이 끝나면 엔터로 줄바꿈을 해주세요.
                    </span>
                  </InfoSmall>
                </InfoLine>
              </DeliveryContent>
            </td>
          </tr>
          <tr>
            <td>
              교환/환불 정보
              <Require> *</Require>
            </td>
            <td>
              <DeliveryContent isError={errors.refund_description}>
                <textarea
                  placeholder="ex)&#13;&#10;브랜디는 소비자보호법 및 전자상거래법을 기반한 환불보장제를 운영 중에 있습니다. &#13;&#10;정당하지 않은 사유로 인한 환불 거부 등은 제재 사유가 될 수 있는 점 참고 부탁드립니다."
                  name="refund_description"
                  defaultValue={infos.refund_description}
                  ref={register({ required: true })}
                />
                {errors.refund_description && (
                  <ErrorMsg>필수 입력 항목입니다.</ErrorMsg>
                )}
                <InfoLine>
                  <InfoSmall>
                    <InfoCircleFill size="14" />
                    <span className="info">
                      문장이 끝나면 엔터로 줄바꿈을 해주세요.
                    </span>
                  </InfoSmall>
                </InfoLine>
              </DeliveryContent>
            </td>
          </tr>
        </tbody>
      </SellerTable>
    </TableContainer>
  );
}

const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  margin: 10px 0;
  padding: 0 10px;
`;

const SellerTable = styled.table`
  padding: 10px;
  width: 100%;
  border: 1px solid #dddddd;
  tr,
  th,
  td {
    padding: 8px;
    border: 1px solid #ddd;
    white-space: nowrap;
    vertical-align: middle;
    font-size: 13px;
    line-height: 1.8;
  }
  tr:nth-child(odd) {
    background-color: #f9f9f9;
  }
  tr:nth-child(even) {
    background-color: #fff;
  }

  span {
    svg {
      margin-right: 4px;
    }
  }
`;

const InfoLine = styled.div`
  ${({ theme }) => theme.flex(null, null, "column")};
  margin-top: 8px;
  color: #1e90ff;
`;

const InfoSmall = styled.div`
  .info {
    font-size: 13px;
    font-weight: normal;
    color: #1e90ff;
    margin: 8px 0;
    &:first-child {
      margin-top: 8px;
    }
  }

  svg {
    margin-right: 4px;
    color: #1e90ff;
  }
`;

const Require = styled.span`
  color: red !important;
  font-weight: bold;
  font-size: 16px !important;
`;

const DeliveryContent = styled.div`
  textarea {
    padding: 9px;
    width: 70%;
    height: 100px;
    border: 1px solid ${({ isError }) => (isError ? "#a94442" : "#ddd")};
    border-radius: 4px;
    outline: 0;
    &:placeholder {
      color: #ddd;
      line-height: 1.8;
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

const BtnDanger = styled.button`
  margin-left: 8px;
  padding: 1px 5px;
  font-size: 12px;
  line-height: 1.5;
  border-radius: 3px;
  color: #fff;
  border: none;
  cursor: pointer;
  background-color: #d9534f;
  outline: 0;
`;
