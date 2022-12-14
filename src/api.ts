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

// 仮のデータを参考
export function fetchCoinHistory(coinId:string) {
    return fetch(
        `https://ohlcv-api.nomadcoders.workers.dev/?coinId=${coinId}`
    ).then((response) => response.json());
}

export function fetchTickersHistory(coinId:string) {
    return axios(`${BASE_URL}/tickers/${coinId}`).then(response =>
        response.data);
}