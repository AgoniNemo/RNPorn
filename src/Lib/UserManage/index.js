import DeviceStorage from 'lib/DeviceStorage';
import React, {Component} from 'react';

export default class UserManage extends Component{

    static get = async() => {
        try {
            let user = await DeviceStorage.get('user');
            return user
        } catch (error) {
            console.log("Error get data" + error);
            return null
        }
    }
    static save(value) {
        return DeviceStorage.save("user",value);
    }
    static update(value) {
        return DeviceStorage.update('user',value);
    }
    static delete() {
        return DeviceStorage.delete('user');
    }
}