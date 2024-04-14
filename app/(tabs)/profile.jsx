import { Image } from "expo-image";

import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, FlatList, TouchableOpacity, Text } from "react-native";

import { icons } from "../../constants";
import { useGlobalContext } from "../../context/GlobalProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useEffect, useState } from "react";

const Profile = () => {
  const { user, setUser, setIsLogged, setLoading } = useGlobalContext();
  const logout = async () => {
    await AsyncStorage.removeItem("UserData");
    setUser(null);
    setIsLogged(false);

    router.replace("/sign-in");
  };

  const [loadingState, setLoadingState] = useState(true);
  const [data, setData] = useState({});
  const getData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://my-trip-back-end.onrender.com/me",
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setLoading(false);
      setLoadingState(false);
      setData(response.data);
      setUser({ token: user.token, ...response.data });
    } catch (error) {
      setLoading(false);
      setLoadingState(false);
      console.error("Error fetching data:", error);
    }
  };

  console.log("test...");
  console.log(user);
  useEffect(() => {
    getData();
  }, []);
  if (loadingState) {
    return <></>;
  }
  return (
    <SafeAreaView className="bg-primary h-full ">
      <TouchableOpacity onPress={logout} className="flex w-full items-end">
        <Image
          source={icons.logout}
          // resizeMode="contain"
          className="w-6 h-6 m-5"
          alt="Logout"
        />
      </TouchableOpacity>
      <View className="flex flex-col items-center ">
        <View className={`flex justify-center items-center`}>
          <Image
            className="w-[100px] h-[100px] rounded-full m-5"
            source={data.avatar}
            placeholder={"Avatar"}
            contentFit="cover"
            transition={1000}
          />
          {/* <Image
            source={{
              uri: data.avatar,
            }}
            resizeMode="contain"
            className="w-[100px] h-[100px] rounded-full m-5"
            alt="Avatar"
          /> */}
        </View>
        <Text className={`text-3xl font-psemibold text-white`}>
          {data.lastName !== ""
            ? `${data.firstName} ${data.lastName}`
            : `${data.firstName}`}
        </Text>
      </View>
      {data.age && (
        <View className="flex justify-center m-5">
          <Text className={`text-3xl font-psemibold text-white`}>
            Barth Day:
          </Text>
          <Text className={`text-3xl font-psemibold text-white`}>
            {data.age}
          </Text>
        </View>
      )}
      {data.email && (
        <View className="flex justify-center m-5">
          <Text className={`text-2xl font-psemibold text-white`}>Email:</Text>
          <Text className={`text-2xl font-psemibold text-white`}>
            {data.email}
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Profile;
