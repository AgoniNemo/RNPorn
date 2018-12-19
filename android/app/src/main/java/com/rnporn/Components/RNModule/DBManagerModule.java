package com.rnporn.Components.RNModule;


import android.util.Log;

import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableArray;
import com.rnporn.Components.DB.DBHelper;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.Callback;

public class DBManagerModule extends ReactContextBaseJavaModule {

    private ReactContext mReactContext;

    public DBManagerModule(ReactApplicationContext reactContext) {
        super(reactContext);
        mReactContext = reactContext;
    }

    @Override
    public String getName() {
        return "DBManagerModule";
    }

    @ReactMethod
    public void addDataTableName(String tableName,ReadableMap map) {
        DBHelper.getInstance().add(tableName,map);
    }

    @ReactMethod
    public void addMoreDataTableName(String tableName,ReadableArray array,Callback callback) {
        callback.invoke(DBHelper.getInstance().batchAdd(tableName,array));
    }

    @ReactMethod
    public void createDBTableName(String name, ReadableArray params) {
        DBHelper dbManager =  DBHelper.getInstance();
        dbManager.rnReactContext = mReactContext;
        dbManager.createDB(name,params);
    }

    @ReactMethod
    public void getAllDataTableName(String name,Callback callback) {
        callback.invoke(DBHelper.getInstance().getAllData(name));
    }

    @ReactMethod
    public void getSingleDataTableName(String name,String key,String value,Callback callback) {
        callback.invoke(DBHelper.getInstance().getSingleData(name,key,value));
    }

    @ReactMethod
    public void deleteSingleDataTableName(String name, String condition,Callback callback) {
        DBHelper.getInstance().deleteSingleData(name,condition);
        callback.invoke(true);
    }

    @ReactMethod
    public void deleteAllDataTableName(String name) {
        DBHelper.getInstance().deleteAllData(name);
    }
}
