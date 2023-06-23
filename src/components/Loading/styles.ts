import styled from "styled-components/native";
export const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.COLORS.GRAY_600}
`;
export const LoadIndicator = styled.ActivityIndicator.attrs(({theme}) => ({
    size: 60,
    color: theme.COLORS.GREEN_700,
    animating: true
}))``