import { Image } from "expo-image";

import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";

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

  useEffect(() => {
    getData();
  }, []);
  if (loadingState) {
    return <></>;
  }

  return (
    <>
      <SafeAreaView className="bg-primary h-full px-[16px]">
        <TouchableOpacity onPress={logout} className="flex w-full items-end">
          <Image
            source={icons.logout}
            // resizeMode="contain"
            className="w-6 h-6 m-5"
            alt="Logout"
          />
        </TouchableOpacity>
        <View className="flex flex-col items-center">
          <ScrollView className={`h-full w-full`}>
            <FlatList
              className="w-full h-full text-center"
              data={[
                <Image
                  className="w-[100px] h-[100px] rounded-full mx-auto"
                  source={{ uri: data.avatar }}
                  placeholder={"Avatar"}
                  contentFit="cover"
                  transition={1000}
                />,
              ]}
              renderItem={({ item }) => item}
              keyExtractor={() =>
                `${Math.random()}--${Math.random()}--${Math.random()}`
              }
              ListFooterComponent={() => (
                <View className={`flex gap-10 mt-5`}>
                  <Text className={`text-3xl font-psemibold text-white `}>
                    {data.lastName !== ""
                      ? `${data.firstName} ${data.lastName}`
                      : `${data.firstName}`}
                  </Text>
                  {data.age && (
                    <Text className={`text-2xl font-psemibold text-white`}>
                      <Text className={`text-3xl font-psemibold text-white`}>
                        Barth Day:
                      </Text>
                      {`  `}
                      {data.age}
                    </Text>
                  )}
                  {data.email && (
                    <Text className={`text-2xl font-psemibold text-white`}>
                      <Text className={`text-2xl font-psemibold text-white`}>
                        Email:
                      </Text>
                      {data.email}
                    </Text>
                  )}
                </View>
              )}
            />
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
};

export default Profile;
