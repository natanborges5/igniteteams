import { useState,useCallback } from "react"
import { FlatList } from "react-native"
import {useNavigation, useFocusEffect} from "@react-navigation/native"
import { Header } from "@components/Header"
import { Highlight } from "@components/Highlight"
import { GroupCard } from "@components/GroupCard"
import { ListEmpty } from "@components/ListEmpty"
import { Button} from "@components/Button"
import * as S from "./styles"
import { groupsGetAll } from "@storage/group/groupRepository"
import { Loading } from "@components/Loading"
export function Groups(){

  const [groups, setGroups] = useState<string[]>([]);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true)

  function handleNewGroup(){
    navigation.navigate("new")
  }

  async function fetchGroups(){
    try {
      setIsLoading(true)
      const data = await groupsGetAll()
      setGroups(data)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  function handleOpenGroup(group: string) {
    navigation.navigate("players",{group})
  }
  useFocusEffect(useCallback(() => {
    fetchGroups()
  },[]));

  return(
    <S.Container>
      <Header/>
      <Highlight
        title="Turmas"
        subtitle="jogue com a sua turma"
      />
      { isLoading ? <Loading/> :
        <FlatList
          data={groups}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <GroupCard 
              title={item} 
              onPress={() => handleOpenGroup(item)}
            />
          )}
          contentContainerStyle={groups.length === 0 && { flex: 1 }}
          ListEmptyComponent={() => <ListEmpty message="Que tal cadastrar a primeira turma?"/>}
        />
      }
      <Button title="Criar nova turma" onPress={handleNewGroup}/>
      
    </S.Container>
  )
}

