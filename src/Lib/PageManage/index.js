import DeviceStorage from 'lib/DeviceStorage';
import React, {Component} from 'react';

export default class PageManage extends Component{

    static get = async() => {
        try {
            let page = await DeviceStorage.get('page');
            return page
        } catch (error) {
            console.log("Error get data" + error);
            return null
        }
    }
    static save(value) {
        return DeviceStorage.save("page",value);
    }
    static update(value) {
        return DeviceStorage.update('page',value);
    }
    static delete() {
        return DeviceStorage.delete('page');
    }
}