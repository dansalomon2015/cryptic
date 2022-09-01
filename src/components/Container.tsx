import { Colors } from "@utils";
import styled from "styled-components/native";

interface Props {
    bgcolor?: string;
}

export const Container = styled.SafeAreaView<Props>`
    flex: 1;
    background-color: ${(props) => props.bgcolor || Colors.primary};
`;
