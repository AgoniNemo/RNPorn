package com.rnporn.Components.DB;

import android.content.Context;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;
import android.database.Cursor;

import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;

import android.content.ContentValues;

import java.util.Iterator;
import java.util.Map;

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

    public boolean batchInsertData(String name, ReadableArray array) {
        SQLiteDatabase db = this.getDatabase();
        db.beginTransaction();
        boolean result = true;
        try {
            for (int i = 0; i < array.size(); i++) {
                ReadableMap map = array.getMap(i);
                if (db.insert(name, null, this.generateSQL(map)) < 0) {
                    result = false;
                    break;
                }
            }
            if (result) {
                // 设置事务标志为成功，当结束事务时就会提交事务
                db.setTransactionSuccessful();
            }
        } catch (Exception e) {
            System.out.println("事务出错 = " + e);
            e.printStackTrace();
            return false;
        } finally {
            // 结束事务
            db.endTransaction();
        }
        System.out.println("添加多条的结果 = " + result);
        return result;
    }

    private ContentValues generateSQL(ReadableMap map) {
        ContentValues value = new ContentValues();
        Iterator<Map.Entry<String, Object>> entries = map.toHashMap().entrySet().iterator();

        while (entries.hasNext()) {
            Map.Entry<String, Object> itme = entries.next();
            value.put(itme.getKey(),itme.getValue().toString());
        }
        return value;
    }

    public Cursor getAllData(String name) {
        String sql = "select * from " + name;
        return db.rawQuery(sql, null);
    }

    public void deleteData(String name,String condition) {
        String sql = "delete from " + name + " where " + condition;
        this.getDatabase().execSQL(sql);
    }

    public void deleteAllData(String name) {
        String sql = "delete from " + name;
        this.getDatabase().execSQL(sql);
    }

    public Cursor getSingleData(String name,String key,String value) {
        String sql = String.format("select * from %s where %s='%s'", name,key,value);
        return db.rawQuery(sql, null);
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
