
## Android 打包

### 1.生成一个签名密钥

```
keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

### 2.设置gradle变量
把my-release-key.keystore文件放到你工程中的android/app文件夹下。
编辑~/.gradle/gradle.properties（没有这个文件你就创建一个），添加如下的代码（注意把其中的**替换为相应密码）
注意：~表示用户目录，比如windows上可能是C:\Users\用户名，而mac上可能是/Users/用户名。
```
MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
MYAPP_RELEASE_KEY_ALIAS=my-key-alias
MYAPP_RELEASE_STORE_PASSWORD=*
MYAPP_RELEASE_KEY_PASSWORD=*
```

### 3.添加签名到项目的gradle配置文件
编辑你项目目录下的android/app/build.gradle，添加如下的签名配置
```
android {
...
defaultConfig { ... }
signingConfigs {
    release {
        storeFile file(MYAPP_RELEASE_STORE_FILE)
        storePassword MYAPP_RELEASE_STORE_PASSWORD
        keyAlias MYAPP_RELEASE_KEY_ALIAS
        keyPassword MYAPP_RELEASE_KEY_PASSWORD
    }
}
buildTypes {
    release {
        ...
        signingConfig signingConfigs.release
        }
    }
}
```

### 4.生成发行APK包
```
cd android && ./gradlew assembleRelease
```

### 运行闪退
1.创建assets
```
mkdir -p android/app/src/main/assets
```
2.生成index.android.bundle
```
react-native bundle --platform android --dev false --entry-file index.js  --bundle-output android/app/src/main/assets/index.android.bundle  --assets-dest android/app/src/main/res/
```