import { NativeModules } from 'react-native';

const nativeModule = NativeModules.DBManagerModule;
const COLLECT = 't_collect';
const HISTORY = 't_history';

export default class DBManager {

    static addCollectData(obj) {
        nativeModule.addData(obj,COLLECT)
    }

    static addHistoryData(obj) {
        nativeModule.addData(obj,HISTORY)
    }

    static delCollectData(id,callBack) {
        nativeModule.deleteSingleDataTableName(COLLECT,`videoId='${id}'`,((obj) => {
            callBack(obj)
        }))
    }

    static getCollectData(callBack) {
        nativeModule.getAllDataTableName(COLLECT,((obj) => {
            callBack(obj)
        }))
    }

    static delHistoryData(id,callBack) {
        nativeModule.deleteSingleDataTableName(HISTORY,`videoId='${id}'`,((obj) => {
            callBack(obj)
        }))
    }

    static getHistoryData(callBack) {
        nativeModule.getAllDataTableName(HISTORY,((obj) => {
            callBack(obj)
        }))
    }

    static createDB() {
        const param = [
            'category',
            'duration',
            'hls',
            'icon',
            'playPath',
            'rating',
            'symbol',
            'title',
            'videoId',
            'views']
        nativeModule.createDBTableName(COLLECT,[...param])
        nativeModule.createDBTableName(HISTORY,[...param])
    }
}