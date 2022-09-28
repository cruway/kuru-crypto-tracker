import {BrowserRouter, HashRouter, Route, Routes} from "react-router-dom";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";
import Price from "./routes/Price";
import Chart from "./routes/Chart";

function Router() {
    return <HashRouter>
        <Routes>
            <Route path="/:coinId" element={<Coin />}>
                <Route path="chart" element={<Chart />}/>
                <Route path="price" element={<Price />} />
            </Route>
            <Route path="/" element={<Coins />} />
        </Routes>
    </HashRouter>
}

export default Router;