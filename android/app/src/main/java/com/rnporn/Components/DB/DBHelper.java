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
            value.put(itme.getKey(),itme.getValue().toString());
        }
        long result =  this.dbHelper.insertData(name,value);
        System.out.println("结果 = " + result);
        return result;
    }

    public WritableArray getAllData(String name) {
        WritableArray array = Arguments.createArray();
        Cursor cursor =  this.dbHelper.getAllData(name);
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
        return array;
    }

    public void deleteSingleData(String name,String condition) {
        this.dbHelper.deleteData(name,condition);
    }

}
