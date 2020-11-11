import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../../Components/Header/Header";
import Nav from "../../Components/Nav/Nav";
import Footer from "../../Components/Footer/Footer";
import { Chart } from "@styled-icons/evil";
import axios from "axios";
import { api } from "../../Config/api";

import { render } from "react-dom";
// import Highcharts from "highcharts";
// import HighchartsReact from "highcharts-react-official";

export default function Home() {
  // const axios = require('axios')
  const [data, setData] = useState();
  const [chartData, setChartData] = useState();

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const result = await axios
          .get(`${api}/sellers/home`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("access_token"),
            },
          })
          .then((res) => {
            setData(res.data);
            setChartData(
              res.data.order_counts.reduce((acc, cur, idx) => {
                if (idx === 0) {
                  return {
                    date: [cur.date],
                    counts: [Number(cur.counts)],
                    amounts: [Number(cur.amounts)],
                  };
                }
                return {
                  date: [...acc.date, cur.date],
                  counts: [...acc.counts, Number(cur.counts)],
                  amounts: [...acc.amounts, Number(cur.amounts)],
                };
              }, {})
            );
          });
      } catch (error) {
        console.log(error);
      }
    };
    fetchChartData();
  }, []);

  const countOptions = {
    title: {
      text: "주문건수",
    },
    xAxis: {
      //여기!!
      categories: chartData && chartData.date,
    },
    yAxis: {
      //y축
      title: {
        text: "단위 (건)",
      },
    },
    colors: ["#495464"],
    credits: {
      enabled: false,
    },
    series: [
      {
        //여기!!
        data: chartData && chartData.counts,
      },
    ],
    legend: {
      enabled: false,
    },
  };

  const amountOptions = {
    title: {
      text: "주문금액",
    },
    xAxis: {
      //x축
      categories: chartData && chartData.date,
    },
    yAxis: {
      //y축
      title: {
        text: "단위 (원)",
      },
    },
    colors: ["#aa3a3a"],
    credits: {
      enabled: false,
    },
    series: [
      {
        data: chartData && chartData.amounts,
      },
    ],
    legend: {
      enabled: false,
    },
  };

  return (
    <MainWrap>
      <Header />
      <MainBox>
        <Nav />
        <MainContainer>
          {/* 상단 컴포넌트 */}
          <TopStatusContainer>
            <StatusPanal>
              <PanelList>
                <PanelBody>
                  <PanelContentsText>상품 준비:</PanelContentsText>
                  <PanelContentsCount>
                    {data &&
                      data.seller_data.filter(
                        (el) => el.order_status_id === 1
                      )[0].count}
                    건
                  </PanelContentsCount>
                </PanelBody>
                <PanelBody>
                  <PanelContentsText>배송 준비:</PanelContentsText>
                  <PanelContentsCount>0건</PanelContentsCount>
                </PanelBody>
                <PanelBody>
                  <PanelContentsText>배송 중:</PanelContentsText>
                  <PanelContentsCount>
                    {data &&
                      data.seller_data.filter(
                        (el) => el.order_status_id === 3
                      )[0].count}
                    건
                  </PanelContentsCount>
                </PanelBody>
                <PanelBody>
                  <PanelContentsText>배송 완료:</PanelContentsText>
                  <PanelContentsCount>
                    {data &&
                      data.seller_data.filter(
                        (el) => el.order_status_id === 4
                      )[0].count}
                    건
                  </PanelContentsCount>
                </PanelBody>
                <PanelBody>
                  <PanelContentsText>구매 확정:</PanelContentsText>
                  <PanelContentsCount>
                    {data &&
                      data.seller_data.filter(
                        (el) => el.order_status_id === 5
                      )[0].count}
                    건
                  </PanelContentsCount>
                </PanelBody>
              </PanelList>
            </StatusPanal>
            <StatusPanal>
              <PanelList>
                <PanelBody>
                  <PanelContentsText>즐겨 찾기 수:</PanelContentsText>
                  <PanelContentsCount>0건</PanelContentsCount>
                </PanelBody>
                <PanelBody>
                  <PanelContentsText>전체 상품 수:</PanelContentsText>
                  <PanelContentsCount>0건</PanelContentsCount>
                </PanelBody>
                <PanelBody>
                  <PanelContentsText>노출 상품 수:</PanelContentsText>
                  <PanelContentsCount>0건</PanelContentsCount>
                </PanelBody>
                <PanelBody>
                  <PanelContentsText></PanelContentsText>
                  <PanelContentsCount></PanelContentsCount>
                </PanelBody>
              </PanelList>
            </StatusPanal>
          </TopStatusContainer>
          {/* 차트 컴포넌트 */}
          <ChartContainer>
            <ChartPanel>
              <ChartTop>
                <ChartTitle>
                  <Chart size="25" />
                  매출 통계 [최근 30일간의 결제완료된 주문 건수의 합계]
                </ChartTitle>
              </ChartTop>
              <ChartBottom>
                <div>
                  <HighchartsReact
                    highcharts={Highcharts}
                    options={countOptions}
                  />
                </div>
              </ChartBottom>
            </ChartPanel>
            <ChartPanel>
              <ChartTop>
                <ChartTitle>
                  <Chart size="25" />
                  매출 통계 [최근 30일간의 결제완료된 주문 금액의 합계]
                </ChartTitle>
              </ChartTop>
              <ChartBottom>
                <div>
                  <HighchartsReact
                    highcharts={Highcharts}
                    options={amountOptions}
                  />
                </div>
              </ChartBottom>
            </ChartPanel>
          </ChartContainer>
        </MainContainer>
      </MainBox>
      <Footer />
    </MainWrap>
  );
}

const MainWrap = styled.div`
  position: relative;
`;

const MainBox = styled.div`
  display: flex;
`;

const MainContainer = styled.div`
  flex: 1;
  min-height: 100vh;
  height: auto;
  padding-top: 45px;
`;

// 주문현황 컨테이너
const TopStatusContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-content: center;
  align-items: center;
  border: 1px solid transparent;
  height: 200px;
`;

const StatusPanal = styled.div`
  flex: 1 1 auto;
  flex-basis: auto;
  margin: 20px;
  width: 100px;
  height: 160px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
  background-color: #fff;
  box-sizing: border-box;
  margin-bottom: 20px;
`;

const PanelList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-content: center;
  align-items: center;
`;

const PanelBody = styled.li`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 5px 50px;
  font-family: "Open Sans", sans-serif;
  font-size: 13px;
  margin: 3px;
  direction: ltr;
`;

const PanelContentsText = styled.span`
  // flex: 1 1 auto;
  flex-basis: auto;
  font-family: "Open Sans", sans-serif;
  font-size: 13px;
  direction: ltr;
`;

const PanelContentsCount = styled.span`
  // flex: 1 1 auto;
  flex-basis: auto;
  font-family: "Open Sans", sans-serif;
  font-weight: bold;
  font-size: 13px;
  direction: ltr;
`;

// 차트 컨테이너
const ChartContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-content: center;
  align-items: center;
  border: 1px solid transparent;
  padding-bottom: 60px;
`;

const ChartPanel = styled.div`
  flex: 1 1 auto;
  flex-basis: auto;
  margin: 20px;
  width: 100px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
  background-color: #fff;
  box-sizing: border-box;
  margin-bottom: 20px;
`;

const ChartTop = styled.div`
  display: flex;
  align-items: center;
  flex-basis: auto;
  height: 40px;
  border: 1px solid #ddd;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
  background-color: #f5f5f5;
`;

const ChartBottom = styled.div`
  // flex: 1 1 auto;
  flex-basis: auto;
  border: 1px solid #ddd;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
  background-color: #fff;
`;

const ChartTitle = styled.span`
  font-family: "Open Sans", sans-serif;
  font-size: 13px;
  direction: ltr;
  color: gray;
  margin-left: 10px;
`;
