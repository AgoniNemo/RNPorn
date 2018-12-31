#!/usr/bin/env bash

#  android编译为原生命令
react-native bundle --platform android --dev false --entry-file index.js  --bundle-output android/app/src/main/assets/index.android.bundle  --assets-dest android/app/src/main/res/

#  打包APK命令
cd android && ./gradlew assembleRelease

cd ..

#  上传APK到FIR
bash UploadIPA.sh ./android/app/build/outputs/apk/release/app-release.apk ad503e467aa5c302293c7165a5dc717b