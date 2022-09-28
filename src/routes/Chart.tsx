import {useOutletContext} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {fetchCoinHistory} from "../api";
import ApexChart from "react-apexcharts";

interface IHistorical {
    time_open: string;
    time_close: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    market_cap: number;
}

interface ChartProps {
    coinId: string;
}

function Chart() {
    const { coinId } = useOutletContext<ChartProps>();
    const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
        fetchCoinHistory(coinId),
        {
            refetchInterval: 10000, // 5 seconds refresh
        });
    return <div>{isLoading ? ("Loading chart...") : (
        <ApexChart
            type={"line"}
            series={[
                {
                    name: "sales",
                    data: data?.map(price => price.close) as number[]
                },
            ]}
            options={{
                theme: {
                    mode: "dark"
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
                    curve: "smooth",
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
                    categories: data?.map(price => price.time_close) as string[]
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

export default Chart;