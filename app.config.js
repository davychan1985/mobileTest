import "dotenv/config"; // 加载.env文件的环境变量


export default {
  expo: {
    name: "MyApp",
    slug: "MyApp",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        backgroundColor: "#E6F4FE",
        foregroundImage: "./assets/images/android-icon-foreground.png",
        backgroundImage: "./assets/images/android-icon-background.png",
        monochromeImage: "./assets/images/android-icon-monochrome.png",
      },
      edgeToEdgeEnabled: true,
      predictiveBackGestureEnabled: false,
      package: "com.davychan.MyApp",  // 默认包名
      hermesEnabled: true,
      enableDangerousExperimentalLeanBuilds: true,
      signingConfig: {
        storeFile: "../my-upload-key.keystore",
        storePassword: process.env.ANDROID_KEYSTORE_STORE_PASSWORD,
        keyAlias: "my-key-alias", // 别名可固定，密码用环境变量
        keyPassword: process.env.ANDROID_KEYSTORE_KEY_PASSWORD,
      },
    },
    web: {
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff",
          dark: {
            backgroundColor: "#000000",
          },
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
      reactCompiler: true,
    },
    extra: {
      router: {},
      eas: {
        projectId: "d9452f5f-3af1-43d4-80cb-c458385e176d",
      },
    },
  },
};
