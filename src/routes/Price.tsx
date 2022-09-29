import {useOutletContext} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import { fetchTickersHistory} from "../api";
import ApexChart from "react-apexcharts";

interface IHistorical {
    timestamp: string;
    price: number;
    volume_24h: number;
    market_cap: number;
}

interface ChartProps {
    coinId: string;
    isDark: boolean;
}
function Price() {
    const { coinId, isDark } = useOutletContext<ChartProps>();
    const { isLoading, data } = useQuery<IHistorical[]>(["ticker", coinId], () =>
            fetchTickersHistory(coinId),
        {
            refetchInterval: 10000, // 5 seconds refresh
        });
    return <div>{isLoading ? ("Loading chart...") : (
        <ApexChart
            type={"line"}
            series={[
                {
                    name: "sales",
                    data: data?.map(price => price.price) as number[]
                },
            ]}
            options={{
                theme: {
                    mode: isDark ? "dark" : "light",
                },
                chart: {
                    height: 300,
                    width: 300,
                    toolbar: {
                        show: false,
                    },
                    background: "transparent",
                },
                grid: {
                    show: false
                },
                stroke: {
                    curve: "stepline",
                    width: 4,
                },
                yaxis: {
                    show: false
                },
                xaxis: {
                    axisBorder: {
                        show: false
                    },
                    axisTicks: {
                        show: false
                    },
                    labels: {
                        show: false
                    },
                    type: "datetime",
                    categories: data?.map(price => price.timestamp) as string[]
                },
                fill: {
                    type: "gradient",
                    gradient: {
                        gradientToColors: ["#0be881"]
                    },
                },
                colors: ["#0fbcf9"],
                tooltip: {
                    y: {
                        formatter: (value) => `$${value.toFixed(3)}`,
                    }
                }
            }} />)}</div>
}

export default Price;