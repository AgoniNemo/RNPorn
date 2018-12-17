package com.rnporn.Components.DB;

import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReadableArray;

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

    private String generateSQL(String name, ReadableArray array) {
        String sql = "create table if not exists ";
        sql = sql + name + " (id integer primary key autoincrement,";
        for (int i = 0; i < array.size(); i++) {
            String symbol = (i == array.size()- 1)?")":",";
            String key = array.getString(i);
            sql = sql + key + " text" + symbol;
        }
        return sql;
    }
}
