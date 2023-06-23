import * as S from "./styles"
import { Header } from "@components/Header"
import { Highlight } from "@components/Highlight"
import { Button } from "@components/Button"
import { Input } from "@components/Input"
export function NewGroup(){
    return(
        <S.Container>
            <Header showBackButton/>
            <S.Content>
                <S.Icon/>
                <Highlight title="Nova turma" subtitle="crie a turma para adicionar as pessoas"></Highlight>
                <Input placeholder="Nome da turma"/>
                <Button title="Criar" style={{marginTop: 20}}></Button>
            </S.Content>
            
        </S.Container>
    )
}