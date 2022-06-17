import AsyncStorage from "@react-native-async-storage/async-storage";

const StorageManage = {
  setItem: async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.log(error);
    }
  },
  getItem: async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        return value;
      }
    } catch (error) {
      console.log(error);
    }
  },
  removeItem: async (key) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.log(error);
    }
  },
  clear: async () => {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.log(error);
    }
  },
}

export default StorageManage;