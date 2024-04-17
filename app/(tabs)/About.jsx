import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, ScrollView } from "react-native";
import VideoComponent from "../../components/Vid/Video";
import PopularDestinations from "../../components/PopularDestinations/PopularDestinations";
import KeyFeatures from "../../components/KeyFeatures/KeyFeatures";
const About = () => {
  return (
    <ScrollView className="bg-primary flex-1 py-10 ">
      <View className={`mb-16`}>
        <Text className="text-2xl text-white font-psemibold p-3">About</Text>
        <View className="px-[16px]">
          <View>
            <Text className="mb-4 text-3xl font-[900] !leading-tight text-[#117C99] sm:text-4xl md:text-[48px]">
              About the atmosphere
            </Text>
            <Text className="text-base !leading-relaxed text-white md:text-lg">
              This video explains what Ajwaa is and about the features it offers
            </Text>
          </View>
        </View>
        <View className={`my-5`}>
          <VideoComponent
            uri={
              "https://res.cloudinary.com/dxrgztsfz/video/upload/v1713341509/sjxrmmaibiljtmxluoct.mp4"
            }
          />
        </View>

        <View className={`px-[16px]`}>
          <KeyFeatures />
        </View>
      </View>
    </ScrollView>
  );
};

export default About;
