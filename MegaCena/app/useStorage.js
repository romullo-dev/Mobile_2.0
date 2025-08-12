import AsyncStorage from "@react-native-async-storage/async-storage";

const useStorage = () => {
    const getItem = async (key) => {
        try {
          const data = await AsyncStorage.getItem(key);
          const parsed = JSON.parse(data);
          return Array.isArray(parsed) ? parsed : [];
        } catch (error) {
          console.log("Erro ao buscar", error);
          return [];
        }
      };
      

  const saveItem = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log("Erro ao salvar", error);
    }
  };

  const removeItem = async (key) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.log("Erro ao remover", error);
    }
  };

  return { getItem, saveItem, removeItem };
};

export default useStorage;
