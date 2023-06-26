import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION, PLAYER_COLLECTION } from "@storage/storageConfig";
import { AppError } from "@utils/AppError";

export async function groupCreate(newGroup: string){
    try {
        const storagedGroups = await groupsGetAll();

        const groupAlreadyExists = storagedGroups.includes(newGroup);
        if(groupAlreadyExists){
            throw new AppError(`Já existe um grupo cadastrado com o nome ${newGroup}`);
        }
        const storage = JSON.stringify([...storagedGroups,newGroup]);
        await AsyncStorage.setItem(GROUP_COLLECTION, storage);
    } catch (error) {
        throw error
    }
}
export async function groupsGetAll(){
    try {
        const storage = await AsyncStorage.getItem(GROUP_COLLECTION)
        const groups: string[] = storage ? JSON.parse(storage) : [];
        return groups;
    } catch (error) {
        throw error
    }
}
export async function removeGroupByName(groupName: string){
    try {
        const storagedGroups = await groupsGetAll();
        const storage = JSON.stringify(storagedGroups.filter(group => group !== groupName));
        await AsyncStorage.setItem(GROUP_COLLECTION, storage);
        await AsyncStorage.removeItem(`${PLAYER_COLLECTION}-${groupName}`)

    } catch (error) {
        throw error
    }
}
