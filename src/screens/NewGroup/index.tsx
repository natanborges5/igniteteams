import * as S from "./styles"
import { Header } from "@components/Header"
import { Highlight } from "@components/Highlight"
import { Button } from "@components/Button"
import { Input } from "@components/Input"
import {useNavigation} from "@react-navigation/native"
import { useState } from "react"
import {groupCreate} from "@storage/group/groupRepository"
import { AppError } from "@utils/AppError"
import {Alert} from "react-native"

export function NewGroup(){
    const navigation = useNavigation();
    const [group, setGroup] = useState("");

    async function handleNewGroup(){
        try {
            if(group.trim().length === 0){
                return Alert.alert("Novo Grupo","Informe o nome do grupo")
            }
            await groupCreate(group)
            navigation.navigate("players",{group})
        } catch (error) {
            if(error instanceof AppError){
                Alert.alert("Novo Grupo",error.message)
            }else{
                console.log(error)
            }
        }
        
    }
    return(
        <S.Container>
            <Header showBackButton/>
            <S.Content>
                <S.Icon/>
                <Highlight title="Nova turma" subtitle="crie a turma para adicionar as pessoas"></Highlight>
                <Input placeholder="Nome da turma" onChangeText={setGroup}/>
                <Button title="Criar" style={{marginTop: 20}} onPress={handleNewGroup}></Button>
            </S.Content>
            
        </S.Container>
    )
}