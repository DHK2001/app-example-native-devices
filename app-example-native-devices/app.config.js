import "dotenv/config";

export default {
  expo: {
    name: "app-example-native-devices",
    slug: "app-example-native-devices",
    version: "1.0.0",
    extra: {
      GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
    },
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "appexamplenativedevices",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      edgeToEdgeEnabled: true,
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      [
        "expo-sqlite",
        {
          enableFTS: true,
          useSQLCipher: true,
          android: {
            enableFTS: false,
            useSQLCipher: false,
          },
          ios: {
            customBuildFlags: [
              "-DSQLITE_ENABLE_DBSTAT_VTAB=1 -DSQLITE_ENABLE_SNAPSHOT=1",
            ],
          },
        },
      ],
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff",
        },
      ],
      [
        "expo-image-picker",
        {
          cameraPermission:
            "The app needs access to your camera in order to take photos of your favorite places.",
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
  },
};
