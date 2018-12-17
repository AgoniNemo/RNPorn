package com.rnporn.Components.RNModule;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;


import com.rnporn.Components.RNModule.DBManagerModule;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class DBManagerPackage implements ReactPackage {

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }

    @Override
    public List<NativeModule> createNativeModules(
            ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();

        modules.add(new DBManagerModule(reactContext));

        return modules;
    }
}
