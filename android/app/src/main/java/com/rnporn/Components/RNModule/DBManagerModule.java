package com.rnporn.Components.RNModule;


import android.util.Log;

import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;
import com.rnporn.Components.DB.DBHelper;
import com.facebook.react.bridge.ReadableArray;

import java.util.Dictionary;

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
    public void addData(Dictionary studentName, String tableName) {
//        DBHelper dbManager = new DBHelper(mReactContext);
//        if (!dbManager.isStudentExists(studentName)) {
//            dbManager.saveStudent(studentName, schoolName, className);
//        }
    }

    @ReactMethod
    public void createDBTableName(String name, ReadableArray params) {
        DBHelper dbManager =  DBHelper.getInstance();
        dbManager.rnReactContext = mReactContext;
        dbManager.createDB(name,params);
        System.out.print("数据库表名：");
        System.out.println(name);
        Log.v("问题","这是");
    }
}
