package com.rnporn.Components.DB;

import android.content.Context;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;
import android.util.Log;

import com.facebook.react.bridge.ReadableArray;

public class DataBaseManager extends SQLiteOpenHelper {
    private static final String DB_NAME = "DataStore.db"; //数据库名称
    private static final int version = 1; //数据库版本
    private SQLiteDatabase db;

    public DataBaseManager(Context context) {
        super(context, DB_NAME, null, version);
        System.out.println("这是什么 ");
    }

    @Override
    public void onCreate(SQLiteDatabase db) {
        System.out.println("onCreate");
        this.db = db;
    }

    public void createDB(String name, ReadableArray array) {
        String sql = "create table if not exists ";
        sql = sql + name + " (id integer primary key autoincrement,";
        for (int i = 0; i < array.size(); i++) {
            String symbol = (i == array.size()- 1)?")":",";
            String key = array.getString(i);
            sql = sql + key + " text" + symbol;
        }
//        System.out.print(this.db);
//        System.out.print(sql);
//        this.db.execSQL(sql);
    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
        System.out.println("onUpgrade");
        Log.i("这个","onUpgrade");
    }
}
