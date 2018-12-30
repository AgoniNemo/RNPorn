#!/usr/bin/env bash

react-native bundle --platform android --dev false --entry-file index.js  --bundle-output android/app/src/main/assets/index.android.bundle  --assets-dest android/app/src/main/res/

cd android && ./gradlew assembleRelease

cd ..

#  上传APK到FIR
bash UploadIPA.sh ./android/app/build/outputs/apk/release/app-release.apk ad503e467aa5c302293c7165a5dc717b