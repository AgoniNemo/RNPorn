package com.rnporn.Components.DB;

import android.content.Context;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;
import android.database.Cursor;

import com.facebook.react.bridge.ReadableArray;
import android.content.ContentValues;

public class DataBaseManager extends SQLiteOpenHelper {
    private static final String DB_NAME = "DataStore.db"; //数据库名称
    private static final int version = 1; //数据库版本
    private static SQLiteDatabase db = null;

    public DataBaseManager(Context context) {
        super(context, DB_NAME, null, version);
        System.out.println("DataBaseManager创建");
    }

    @Override
    public void onCreate(SQLiteDatabase db) {
        System.out.println("onCreate");

    }

    public void createDB(String name, ReadableArray array) {
        String sql = "create table if not exists ";
        sql = sql + name + " (id integer primary key autoincrement,";
        for (int i = 0; i < array.size(); i++) {
            String symbol = (i == array.size()- 1)?")":",";
            String key = array.getString(i);
            sql = sql + key + " text" + symbol;
        }
        this.getDatabase().execSQL(sql);
        System.out.println(name);
    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
        System.out.println("onUpgrade");
    }

    public long insertData(String name, ContentValues values) {
        long result =  this.getDatabase().insert(name,null,values);
        return result;
    }

    public Cursor getAllData(String name) {
        String sql = "select * from " + name;
        return db.rawQuery(sql, null);
    }

    public void deleteData(String name,String condition) {
        String sql = "delete from " + name + " where " + condition;
        this.getDatabase().execSQL(sql);
    }


    public synchronized SQLiteDatabase getDatabase() {
        if (db == null) {
            db = this.getWritableDatabase();
        }
        return db;
    }

    //关闭数据库
    public void close(){
        if(this.getDatabase() != null){
            this.getDatabase().close();
        }
    }


}
