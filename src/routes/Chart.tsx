import {useOutletContext} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {fetchCoinHistory} from "../api";
import ApexChart from "react-apexcharts";
import {useRecoilValue} from "recoil";
import {isDarkAtom} from "../atoms";

interface IHistorical {
    time_open: number;
    time_close: number;
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
    const isDark = useRecoilValue(isDarkAtom);
    const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
        fetchCoinHistory(coinId),
        {
            refetchInterval: 10000, // 5 seconds refresh
        });

    let validData = data ?? [];
    if ("error" in validData) {
        validData = []
    }

    return <div>{isLoading ? ("Loading chart...") : (
        <div>
        <ApexChart
            type={"line"}
            series={[
                {
                    name: "sales",
                    data: validData.map(price => price.close)
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
                    categories: data?.map(price => price.time_close)
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
        }}
        />
            <ApexChart
                type={"candlestick"}
                series={[
                    {
                        name: "sales",
                        data: validData.map(price => ({
                            x: new Date(price.time_close * 1000),
                            y: [price.open, price.high, price.low, price.close],
                        })),
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
                }}
            />
        </div>
        )}
    </div>
}

export default Chart;