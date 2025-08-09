import AsyncStorage from "@react-native-async-storage/async-storage";

const useStorage = () => {
    const getItem = async (key) => {
        try {
            const numbers = await AsyncStorage.getItem(key);
            return JSON.parse(numbers) || [];
        } catch (error) {
            console.log("erro ao buscar", error);
            return [];
        }
    };


}