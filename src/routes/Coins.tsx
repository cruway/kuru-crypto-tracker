import styled from "styled-components";
import {Link} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {fetchCoins} from "../api";
import {Helmet} from "react-helmet";
import {useSetRecoilState} from "recoil";
import {isDarkAtom} from "../atoms";

const Container = styled.div`
  padding: 0px 20px;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinsList = styled.ul`
`;

const Coin = styled.li`
  background-color: ${props => props.theme.cardBgcolor};
  color: ${props => props.theme.textColor};
  border-radius: 15px;
  margin-bottom: 10px;
  border: 1px solid white;
  a {
    display: flex;
    align-items: center;
    padding: 20px;
    transition: color 0.2s ease-in;
  }
  &:hover {
    a {
      color: ${props => props.theme.accentColor}
    }
  }
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${props => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

const ThemeButton = styled.button`
  margin-left: 20px;
  text-decoration: none;
  padding: 10px 30px;
  position: relative;
  border: 1px solid ${props => props.theme.textColor};
  border-radius: 4px;
  text-shadow: 0 1px 0 rgba(0,0,0,0.15);
  background-color: ${props => props.theme.cardBgcolor};
  color: ${props => props.theme.textColor};
`;

interface ICoin {
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string
}

function Coins() {
    const setDarkAtom = useSetRecoilState(isDarkAtom);
    const toggleDarkAtom = () => setDarkAtom(prev => !prev);
    const { isLoading, data } = useQuery<ICoin[]>(["allCoins"], fetchCoins);
    return (
        <Container>
            <Helmet>
                <title>
                    Coin
                </title>
            </Helmet>
            <Header>
                <Title>Coin</Title>
                <ThemeButton onClick={toggleDarkAtom}>Toggle Mode</ThemeButton>
            </Header>
            {isLoading ? (
                <Loader>Loading...</Loader>
                ) : (<CoinsList>
                {data?.slice(0, 100).map(coin => (
                    <Coin key={coin.id}>
                        <Link to={`/${coin.id}`} state={coin.name}>
                            <Img src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}/>
                            {coin.name} &rarr;
                        </Link>
                    </Coin>
                ))}
            </CoinsList>
                )}
        </Container>
    );
}

export default Coins;