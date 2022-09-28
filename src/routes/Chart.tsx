import {useOutletContext} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {fetchCoinHistory} from "../api";

interface ChartProps {
    coinId: string;
}

function Chart() {
    const { coinId } = useOutletContext<ChartProps>();
    const { isLoading, data } = useQuery(["ohlcv", coinId], () => fetchCoinHistory(coinId));
    return <h1>Chart: {coinId}</h1>
}

export default Chart;