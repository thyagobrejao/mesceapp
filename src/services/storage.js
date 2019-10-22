import AsyncStorage from '@react-native-community/async-storage';

const storeData = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value))
    } catch (e) {
        console.log("Erro no storage");
    }
}

const getData = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key)
        if (value !== null) {
            return JSON.parse(value);
        } else {
            return false
        }
    } catch (e) {
        console.log(e);
    }
}

export default { storeData, getData }