import * as React from "react";
import { View, StyleSheet, Button } from "react-native";
import { Video, ResizeMode } from "expo-av";

export default function VideoComponent({ uri }) {
  return (
    <View className={`w-[100%] h-[200px] mb-5`}>
      <Video
        className={`w-full h-full rounded-lg`}
        source={{
          uri,
        }}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        isLooping
      />
    </View>
  );
}
