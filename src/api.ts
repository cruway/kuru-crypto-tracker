import axios from "axios";

export async function fetchCoins() {
    return axios("https://api.coinpaprika.com/v1/coins").then(response =>
        response.data);
}