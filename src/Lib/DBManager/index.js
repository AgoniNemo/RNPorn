import { NativeModules } from 'react-native';

const nativeModule = NativeModules.DBManagerModule;
const COLLECT = 't_collect';
const HISTORY = 't_history';

export default class DBManager {

    static addCollectData(obj) {
        nativeModule.addDataTableName(COLLECT,obj)
    }

    static addHistoryData(obj) {
        nativeModule.addDataTableName(HISTORY,obj)
    }

    static addMoreCollect(list,callBack) {
        nativeModule.addMoreDataTableName(COLLECT,list,((obj) => {
            if (callBack) {
                callBack(obj)
            }
        }))
    }

    static delAllCollectData() {
        nativeModule.deleteAllDataTableName(COLLECT)
    }

    static delCollectData(id,callBack) {
        nativeModule.deleteSingleDataTableName(COLLECT,`videoId='${id}'`,((obj) => {
            if (callBack) {
                callBack(obj)
            }
        }))
    }

    static getCollectData(callBack) {
        nativeModule.getAllDataTableName(COLLECT,((obj) => {
            if (callBack) {
                callBack(obj)
            }
        }))
    }

    static delHistoryData(id,callBack) {
        nativeModule.deleteSingleDataTableName(HISTORY,`videoId='${id}'`,((obj) => {
            if (callBack) {
                callBack(obj)
            }
        }))
    }

    static delAllHistoryData() {
        nativeModule.deleteAllDataTableName(HISTORY)
    }

    static historyIsDataExists(id,callBack) {
        nativeModule.getSingleDataTableName(HISTORY,'videoId',id,((ary) => {
            if (callBack) {
                callBack(ary.length > 0)
            }
        }))
    }

    static getHistoryData(callBack) {
        nativeModule.getAllDataTableName(HISTORY,((obj) => {
            if (callBack) {
                callBack(obj)
            }
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
            'video_updated_at',
            'views']
        nativeModule.createDBTableName(COLLECT,[...param])
        nativeModule.createDBTableName(HISTORY,[...param])
    }

    static complySQL(name,sql,callBack) {
        nativeModule.complyTableName(name,sql,((res) => {
            callBack(res)
        }))
    }
}