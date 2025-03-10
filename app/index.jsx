import { StatusBar } from "expo-status-bar";
import { Redirect, router } from "expo-router";
import { View, Text, Image, ScrollView, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "../constants";
import { CustomButton, Loader } from "../components";
import { useGlobalContext } from "../context/GlobalProvider";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { iconPath } from "../assets/SVGRIcons";
import { i18n } from "../localization/local";

const Welcome = () => {
  const { loading, setLoading } = useGlobalContext();

  useEffect(() => {
    // console.log("test Index page...")
    setLoading(true);
    const handleData = async () => {
      // const isUserLogged = await AsyncStorage.getItem("isUserLogged");
      const data = await AsyncStorage.getItem("UserData");

      setLoading(false);
      if (data) {
        return router.push("/home");
      }
    };

    handleData();
  }, []);
  // if (loading) {
  //   return (
  //     <Modal
  //       style={{
  //         backgroundColor: "black",
  //         opacity: 0.5,
  //         flex: 1,
  //         padding: 50,
  //       }}
  //     >
  //       <View
  //         style={{
  //           flex: 1,
  //           justifyContent: "center",
  //           alignItems: "center",
  //           backgroundColor: "black",
  //         }}
  //       >
  //         <Image
  //           source={require("../assets/loadStart.gif")}
  //           style={{ width: "100%", height: "30%" }}
  //         />
  //       </View>
  //     </Modal>
  //   );
  // }
  return (
    <SafeAreaView className="bg-primary h-full">
      <Loader isLoading={loading} />

      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className="w-full flex justify-center items-center h-full px-4">
          <Image
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          />

          <Image
            source={images.cards}
            className="max-w-[380px] w-full h-[298px]"
            resizeMode="contain"
          />

          <View className="relative mt-5">
            <Text className="text-3xl text-white font-bold">
              Discover Endless{"\n"}
              Possibilities with <Text className="text-[#2AA3CD]">Ajwaa</Text>
            </Text>
            {/* <View className={`w-[200px] h-[48px] ml-auto mr-[20px]`}>{iconPath}</View> */}
            <Image
              source={images.path}
              className="w-[136px] h-[15px] absolute -bottom-2 -right-8 mt-2"
              resizeMode="contain"
            />
          </View>

          <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
            Where Creativity Meets Innovation: Embark on a Journey of Limitless
            Exploration with Ajwaa
          </Text>

          <CustomButton
            title="Continue with Email"
            handlePress={() => router.push("/sign-in")}
            containerStyles="w-full mt-7"
          />
        </View>
      </ScrollView>

      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default Welcome;
