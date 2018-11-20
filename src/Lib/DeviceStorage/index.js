import {
    AsyncStorage
} from 'react-native';

export default class DeviceStorage {
    static async get(key) {
        return await AsyncStorage.getItem(key).then((value) => {
            const jsonValue = JSON.parse(value);
            return jsonValue;
        });
    }
    static save(key, value) {
        try {
            let json = JSON.stringify(value);
            return AsyncStorage.setItem(key, json);
        } catch (error) {
            console.log('AsyncStorage error',error);
            return null;
        }
    }
    static update(key, value) {
        return DeviceStorage.get(key).then((item) => {
            value = typeof value === 'string' ? value : Object.assign({}, item, value);
            return AsyncStorage.setItem(key, JSON.stringify(value));
        });
    }
    static delete(key) {
        return AsyncStorage.removeItem(key);
    }
}