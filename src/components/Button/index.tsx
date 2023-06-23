import * as S from "./styles";
import { TouchableOpacityProps } from "react-native";
type Props = TouchableOpacityProps &{
    title: string,
    type?: S.ButtonTypeStyleProps,
}
export function Button({title, type = "PRIMARY", ...rest}:Props) {
    return(
        <S.Container type={type} {...rest}>
            <S.Title>{title}</S.Title>
        </S.Container>
    )
}
