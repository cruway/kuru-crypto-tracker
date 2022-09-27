import {useLocation, useParams} from "react-router-dom";
import styled from "styled-components";
import {useState} from "react";


const Container = styled.div`
  padding: 0px 20px;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${props => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

interface RouteParams {
    coinId: string;
}

interface RouteState {
    state: string;
}

function Coin() {
    const [loading, setLoading] = useState(true);
    const { coinId } = useParams<keyof RouteParams>();
    const { state } = useLocation() as RouteState;
    return (
        <Container>
            <Header>
                <Title>{state?.toString() || "loading..." }</Title>
            </Header>
            {loading ? <Loader>Loading...</Loader> : null}
        </Container>
    );
}

export default Coin;