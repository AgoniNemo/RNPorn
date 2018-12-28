package com.rnporn.Components.DB;

import android.content.ContentValues;
import android.database.Cursor;

import java.util.Map;
import java.util.Iterator;

import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableArray;

public class DBHelper {

    private static final String TAG = "StudentDB";
    private DataBaseManager dbHelper = null;
    public ReactContext rnReactContext;

    private static final DBHelper ourInstance = new DBHelper();

    public static DBHelper getInstance() {
        return ourInstance;
    }

    private DBHelper() { }

    public void createDB(String name, ReadableArray params) {
        if (this.dbHelper == null) {
            this.dbHelper = new DataBaseManager(this.rnReactContext);
        }
        this.dbHelper.createDB(name,params);
    }

    public long add(String name, ReadableMap map) {
        ContentValues value = new ContentValues();
        Iterator<Map.Entry<String, Object>> entries = map.toHashMap().entrySet().iterator();

        while (entries.hasNext()) {
            Map.Entry<String, Object> itme = entries.next();
            String values = (itme.getValue() == null) ? "" : itme.getValue().toString();
            value.put(itme.getKey(),values);
        }
        long result =  this.dbHelper.insertData(name,value);
        System.out.println("结果 = " + result);
        return result;
    }

    public boolean batchAdd(String name,ReadableArray array) {
        return this.dbHelper.batchInsertData(name,array);
    }


    public WritableArray getSingleData(String name,String key,String value) {
        Cursor cursor = this.dbHelper.getSingleData(name,key,value);
        return this.dataHandle(cursor);
    }

    public WritableArray getAllData(String name) {
        Cursor cursor =  this.dbHelper.getAllData(name);
        return this.dataHandle(cursor);
    }

    public void deleteSingleData(String name,String condition) {
        this.dbHelper.deleteData(name,condition);
    }

    public void deleteAllData(String name) {
        this.dbHelper.deleteAllData(name);
    }

    private WritableArray dataHandle(Cursor cursor) {
        WritableArray array = Arguments.createArray();
        cursor.moveToFirst();
        while (!cursor.isAfterLast()) {
            WritableMap map = Arguments.createMap();
            for (int i = 0; i < cursor.getColumnCount(); i++) {
                String columnName = cursor.getColumnName(i);// 获取数据记录第i条字段名的
                String content = cursor.getString(i);//获得获取的数据记录第i条字段的内容
                map.putString(columnName,content);
            }
            array.pushMap(map);
            cursor.moveToNext();
        }
        System.out.println("查询到的数组:"+array);
        return array;
    }

}
