import AsyncStorage from "@react-native-async-storage/async-storage";
import { PLAYER_COLLECTION } from "@storage/storageConfig";
import { AppError } from "@utils/AppError";
import {PlayerStorageDTO} from "./PlayerStorageDTO";

export async function playerAddByGroup(newPlayer : PlayerStorageDTO, group: string){
    try {
        const storagedPlayers = await playerGetAllByGroup(group);
        const playerAlreadyAdded = storagedPlayers.filter(player => player.name === newPlayer.name);
        if(playerAlreadyAdded.length > 0) {
            throw new AppError(`Já existe um jogador cadastrado com o nome ${newPlayer} em um time aqui.`);
        }
        const storage = JSON.stringify([...storagedPlayers, newPlayer]);
        await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`,storage)
    } catch (error) {
        throw (error)
    }
}
export async function playerGetAllByGroup(group: string){
    try {
       const storage = await AsyncStorage.getItem(`${PLAYER_COLLECTION}-${group}`)
       const players: PlayerStorageDTO[] = storage ? JSON.parse(storage) : [];
       return players;
    } catch (error) {
        throw (error)
    }
}
export async function playersGetByGroupAndTeam(group: string, team: string){
    try {
        const storage = await playerGetAllByGroup(group)
        return storage.filter(player => player.team === team);

    } catch (error) {
        throw (error)
    }
}
export async function playerRemoveByGroup(playerName: string, group: string){
    try {
        const storage = await playerGetAllByGroup(group);
        const filtered =  storage.filter(player => player.name !== playerName);
        const players = JSON.stringify(filtered)
        await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`,players)
    } catch (error) {
        throw (error)
    }
}