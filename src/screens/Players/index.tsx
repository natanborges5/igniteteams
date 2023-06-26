import { Header } from "@components/Header"
import * as S from "./styles"
import { Highlight } from "@components/Highlight"
import { ButtonIcon } from "@components/ButtonIcon"
import { Input } from "@components/Input"
import { Filter} from "@components/Filter"
import { Alert, FlatList } from "react-native"
import { useState, useEffect } from "react"
import { PlayerCard } from "@components/PlayerCard"
import { ListEmpty } from "@components/ListEmpty"
import { Button } from "@components/Button"
import { useNavigation, useRoute} from "@react-navigation/native"
import { playerAddByGroup, playersGetByGroupAndTeam ,playerRemoveByGroup,} from "@storage/player/playerRepository"
import {removeGroupByName} from "@storage/group/groupRepository"
import { AppError } from "@utils/AppError"
import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO"
import { Loading } from "@components/Loading"

type RouteParams = {
    group: string;
}

export function Players(){
    const [newPlayerName, setNewPlayerName] = useState("")
    const [team, setTeam] = useState("Time A")
    const [players, setPlayers] = useState<PlayerStorageDTO[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const navigation = useNavigation();
    const route = useRoute();
    const {group} = route.params as RouteParams

    async function handleAddNewPlaye(){
        if(newPlayerName.trim().length === 0){
            return Alert.alert("Nova Pessoa","Informe o nome da pessoa para adicionar")
        }
        try {
            const newPlayer = {
                name: newPlayerName,
                team,
            }
            await playerAddByGroup(newPlayer,group)
            fetchPlayersByTeam()
            setNewPlayerName("")
        } catch (error) {
            if(error instanceof AppError){
                Alert.alert("Nova pessoa",error.message)
            }else{
                console.log(error)
            }
        }
    } 
    async function handleDeletePlayer(player: string) {
        try {
            console.log(player)
            await playerRemoveByGroup(player,group)
            fetchPlayersByTeam()
        } catch (error) {
            Alert.alert("Pessoas", "Não foi possivel remover a pessoa do time selecionado")
        }
    }
    async function handleRemover(){
        try {
            await removeGroupByName(group)
            navigation.navigate("groups")
        } catch (error) {
            Alert.alert("Pessoas", "Não foi possivel remover a pessoa do time selecionado")
        }
    }
    async function handleDeleteGroup() {
        Alert.alert("Remover", "Deseja remover o grupo?",[
            {text: "Não", style:"cancel"},
            {text: "Sim", onPress: () => handleRemover()}
        ])
        
    }
    async function fetchPlayersByTeam(){
        try {
            const playersByTeam = await playersGetByGroupAndTeam(group,team)
            setPlayers(playersByTeam)

        } catch (error) {
            Alert.alert("Pessoas", "Não foi possivel carregar as pessoas do time selecionado")
        }finally{
            setIsLoading(false);
        }
        
    }
    useEffect(() => {
        fetchPlayersByTeam()
    },[team])
    return(
        <S.Container>
            <Header showBackButton/>
            <Highlight title={group} subtitle="adicione a galera e separe os times"/>
            <S.Form>
                <Input placeholder="Nome da pessoa" autoCorrect={false} value={newPlayerName} onChangeText={setNewPlayerName}/>
                <ButtonIcon icon="add" onPress={() => handleAddNewPlaye()}/>
            </S.Form>
            <S.HeaderList>
                <FlatList
                    data={["Time A", "Time B"]}
                    keyExtractor={item => item}
                    renderItem={({item}) => (
                        <Filter title={item}
                        isActive={team === item}
                        onPress={() => setTeam(item)}
                        />
                        
                    )}
                    horizontal
                />
                <S.NumberOfPlayers>{players.length}</S.NumberOfPlayers>
            </S.HeaderList>
            { isLoading ? <Loading/> :
                <FlatList
                data={players}
                keyExtractor={item => item.name}
                renderItem={({item}) => (
                    <PlayerCard name={item.name}
                    onRemove={() => {handleDeletePlayer(item.name)}}
                    />
                )}
                ListEmptyComponent={() => <ListEmpty message="Não há pessoas nesse time"/>}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[
                    {paddingBottom: 100},
                    players.length === 0 && {flex: 1}
                ]}
            />
            }
            <Button title="Remover Turma" type="SECONDARY" onPress={handleDeleteGroup}/>
        </S.Container>
    )
}