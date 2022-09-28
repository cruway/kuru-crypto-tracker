import axios from "axios";

const BASE_URL = `https://api.coinpaprika.com/v1`

export async function fetchCoins() {
    return axios(`${BASE_URL}/coins`).then(response =>
        response.data);
}

export function fetchCoinInfo(coinId: string) {
    return axios(`${BASE_URL}/coins/${coinId}`).then(response =>
        response.data);
}

export function fetchCoinTickers(coinId: string) {
    return axios(`${BASE_URL}/tickers/${coinId}`).then(response =>
        response.data);
}

export function fetchCoinHistory(coinId:string) {
    const date = Math.floor(Date.now() / 1000);
    return axios(`${BASE_URL}/coins/${coinId}/ohlcv/historical?start=${date}&end=${date}`).then(response =>
        response.data);
}