import {useOutletContext} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import { fetchTickersHistory} from "../api";
import styled from "styled-components";

const Label = styled.div`
  font-size: 1rem;
  font-weight: 700;
  opacity: 0.6;
  text-align: center;
`;

const Content = styled.div`
  font-size: 2rem;
  margin-top: 10px;
`;

const Overview = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
  margin-bottom: 10px;
`;

interface IHistorical {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: string;
    last_updated: string;
    quotes: {
        USD: {
            ath_date: string;
            ath_price: number;
            market_cap: number;
            market_cap_change_24h: number;
            percent_change_1h: number;
            percent_change_1y: number;
            percent_change_6h: number;
            percent_change_7d: number;
            percent_change_12h: number;
            percent_change_15m: number;
            percent_change_24h: number;
            percent_change_30d: number;
            percent_change_30m: number;
            percent_from_price_ath: number;
            price: number;
            volume_24h: number;
            volume_24h_change_24h: number;
        };
    };
}

interface PriceProps {
    coinId: string;
}
function Price() {
    const { coinId } = useOutletContext<PriceProps>();
    const { isLoading, data } = useQuery<IHistorical>(["ticker", coinId], () =>
            fetchTickersHistory(coinId),
        {
            refetchInterval: 10000, // 5 seconds refresh
        });

    const quotes = data?.quotes.USD;
    const athDate = quotes?.ath_date !== undefined ? new Date(quotes.ath_date) : new Date();
    const athDateString = athDate.toLocaleDateString("ja-jp");
    const athTimeString = athDate.toLocaleTimeString("ja-jp");
    return <div>{isLoading ? ("Loading chart...") : (
        <div>
            <Overview>
                <Label>
                    {athDateString} {athTimeString}
                    <br/>
                    High Price!
                </Label>
                <Content>${quotes?.ath_price.toFixed(3)}</Content>
            </Overview>
            <Overview>
                <Label>
                    percent change before 1 hours
                </Label>
                <Content>${quotes?.percent_change_1h}</Content>
            </Overview>
            <Overview>
                <Label>
                    percent change before 6 hours
                </Label>
                <Content>${quotes?.percent_change_6h}</Content>
            </Overview>
            <Overview>
                <Label>
                    percent change before 12 hours
                </Label>
                <Content>${quotes?.percent_change_12h}</Content>
            </Overview>
            <Overview>
                <Label>
                    percent change before 24 hours
                </Label>
                <Content>${quotes?.percent_change_24h}</Content>
            </Overview>
            <Overview>
                <Label>
                    percent change before 7 days
                </Label>
                <Content>${quotes?.percent_change_7d}</Content>
            </Overview>
            <Overview>
                <Label>
                    percent change before 30 days
                </Label>
                <Content>${quotes?.percent_change_30d}</Content>
            </Overview>
        </div>
        )}</div>
}

export default Price;