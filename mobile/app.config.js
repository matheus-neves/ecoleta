import 'dotenv/config';

export default {
  expo: {
    name: "Ecoleta",
    slug: "mobile",
    platforms: [
      "ios",
      "android",
      "web"
    ],
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    updates: {
      fallbackToCacheTimeout: 0
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      supportsTablet: true
    },
    extra: {
      API_KEY: process.env.API_KEY,
      APP_API_URL: process.env.APP_API_URL
    }

  }
}
