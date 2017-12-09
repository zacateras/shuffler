import { AsyncStorage } from 'react-native';

export default class {
    
    // TODO
    // static STORAGE_KEY = "token";
    
    async getToken() {
        return AsyncStorage.getItem("token");
    }

    async setToken(token) {
        AsyncStorage.setItem("token", token);
    }

    async removeToken() {
        AsyncStorage.removeItem("token");
    }
}