import styled from "styled-components";

const Container = styled.div<CircleProps>`
  width: 200px;
  height: 200px;
  background-color: ${props => props.bgColor};
  border-radius: 100px;
`;

// object shapeをtypescriptに説明するための機能
interface CircleProps {
    bgColor: string;
}

const x = (a:number, b:number) => a+b

function Circle({bgColor}: CircleProps) {
    return <Container bgColor={bgColor} />;
}

export default Circle;
