import 'dotenv/config';

export default ({ config }) => {
  return {
    ...config,
    extra: {
      ...config.extra,
      iosClientId: process.env.EXPO_PUBLIC_IOS_CLIENT_ID,
      androidClientId: process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID,
    },
  };
};
