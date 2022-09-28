import {useOutletContext} from "react-router-dom";

interface ChartProps {
    coinId: string;
}
function Price() {
    const { coinId } = useOutletContext<ChartProps>();
    return <h1>Price</h1>
}

export default Price;