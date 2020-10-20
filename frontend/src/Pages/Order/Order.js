import React from "react";
import styled from "styled-components";
import { ListUl } from "@styled-icons/bootstrap/ListUl";
import { ArrowForwardIos } from "@styled-icons/material-sharp/ArrowForwardIos";

function Order() {
  return (
    <div>
      <div>
        <div>
          <h3>주문 관리</h3>
          <span>상품 준비 관리</span>
        </div>
        <p>
          ( 상품준비 단계에서는 구매회원의 주문취소가 가능하며, 배송준비단계로
          처리할 경우 3영업일 동안은 구매회원의 주문취소가 불가능합니다. )
        </p>
        <p>
          ( 배송준비로 변경하신 후 3영업일 이내로 상품 배송이 시작되지 않을 경우
          구매회원의 주문취소가 가능하며 이에 따른 책임은 판매자 회원에게
          있습니다. (전자상거래법 제 15조 1항에 근거) )
        </p>
        <div>
          <div>
            <select name="" id="">
              <option value="">Select..</option>
              <option value="">주문번호</option>
              <option value="">2</option>
              <option disabled="disabled">-------</option>
              <option value="">3</option>
              <option value="">4</option>
              <option disabled="disabled">-------</option>
              <option value="">5</option>
              <option value="">6</option>
            </select>
          </div>
          <div>
            <input type="text" placeholder="검색어를 입력하세요." />
          </div>
        </div>
        <div>
          <label htmlFor="">결제완료일:</label>
        </div>
        <div>
          <input type="button" value="전체" />
          <input type="button" value="오늘" />
          <input type="button" value="3일" />
          <input type="button" value="1주일" />
          <input type="button" value="1개월" />
          <input type="button" value="3개월" />
        </div>
        <div>
          <div>
            <input type="text" placeholder="클릭해주세요." />
            <span> ~ </span>
            <input type="text" placeholder="클릭해주세요." />
          </div>
        </div>
        <div>
          <label htmlFor="">셀러속성:</label>
        </div>
        <div>
          <button type="button">전체</button>
          <button type="button">쇼핑몰</button>
          <button type="button">마켓</button>
          <button type="button">로드샵</button>
          <button type="button">디자이너브랜드</button>
          <button type="button">제너럴브랜드</button>
          <button type="button">내셔널브랜드</button>
          <button type="button">뷰티</button>
        </div>
        <div>
          <div>
            <label htmlFor="">셀러구분:</label>
          </div>
          <div>
            <button type="button">전체</button>
            <button type="button">일반</button>
            <button type="button">헬피</button>
            <div>
              <input type="radio" />
              <span>전체</span>
              <input type="radio" />
              <span>헬피1</span>
              <input type="radio" />
              <span>헬피2</span>
            </div>
          </div>
        </div>
        <div>
          <label htmlFor="">배송구분:</label>
        </div>
        <div>
          <button type="button">전체</button>
          <button type="button">일반배송</button>
          <button type="button">오늘출발</button>
          <button type="button">새벽도착</button>
          <button type="button">저녁도착</button>
        </div>
        <div>
          <input type="button" value="검색" />
          <input type="button" value="초기화" />
        </div>
      </div>
      <div>
        <div>
          <ul>
            <ListMenu size="15" />
            <li>주문관리</li>
            <ArrowForward size="15" />
            <li>상품준비 관리</li>
            <ArrowForward size="15" />
            <li>상품준비 리스트</li>
          </ul>
        </div>
        <div>
          <div>
            <select name="" id="">
              <option value="">최신주문일순</option>
              <option value="">주문일의 역순</option>
            </select>
          </div>
          <div>
            <select name="" id="">
              <option value="10">10개씩보기</option>
              <option value="20">20개씩보기</option>
              <option value="50">50개씩보기</option>
              <option value="100">100개씩보기</option>
              <option value="150">150개씩보기</option>
            </select>
          </div>
        </div>
        <div>
          <div>
            <span>전체 조회건 수 : </span>
            <span>1,220 건</span>
            <button>배송준비처리</button>
            <button>주문취소처리</button>
          </div>
        </div>
        <div>
          <button>전체주문 엑셀다운로드</button>
          <button>선택주문 엑셀다운로드</button>
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default Order;

const ListMenu = styled(ListUl)``;

const ArrowForward = styled(ArrowForwardIos)``;
