import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  FlatList,
  Image,
  RefreshControl,
  Text,
  View,
  ScrollView,
} from "react-native";

import PopularDestinations from "../../components/PopularDestinations/PopularDestinations";

import AsyncStorage from "@react-native-async-storage/async-storage";
import KeyFeatures from "../../components/KeyFeatures/KeyFeatures";
import SafetyGuaranteeCertificates from "../../components/SafetyGuaranteeCertificates/SafetyGuaranteeCertificates";
import SafetyGuaranteeCertificatesTow from "../../components/SafetyGuaranteeCertificates/SafetyGuaranteeCertificatesTow";
import { useGlobalContext } from "../../context/GlobalProvider";
import { router } from "expo-router";
const Home = () => {
  const { setUser, setIsLogged } = useGlobalContext();

  useEffect(() => {
    const handleData = async () => {
      const data = await AsyncStorage.getItem("UserData");
      if (data === null) {
        setIsLogged(false);
        setUser(null);
        return router.push("/index");
      }
    };

    handleData();
  }, []);

  return (
    <SafeAreaView className="bg-primary">
      <ScrollView className="bg-primary">
        <PopularDestinations />
        <View className={`my-6 px-4`}>
          <KeyFeatures />
          <SafetyGuaranteeCertificates />
          <SafetyGuaranteeCertificatesTow />
        </View>
      </ScrollView>
    </SafeAreaView>

    // <SafeAreaView className="bg-primary">
    //   <FlatList
    //     data={posts}
    //     keyExtractor={(item) => item.$id}
    //     renderItem={({ item }) => (
    //       <VideoCard
    //         title={item.title}
    //         thumbnail={item.thumbnail}
    //         video={item.video}
    //         creator={item.creator.username}
    //         avatar={item.creator.avatar}
    //       />
    //     )}
    //     ListHeaderComponent={() => (
    //       <View className="flex my-6 px-4 space-y-6">
    //         <View className="flex justify-between items-start flex-row mb-6">
    //           <View>
    //             <Text className="font-pmedium text-sm text-gray-100">
    //               Welcome Back
    //             </Text>
    //             <Text className="text-2xl font-psemibold text-[#2AA3CD]">
    //               Ajwaa
    //             </Text>
    //           </View>

    //           <View className="mt-1.5">
    //             <Image
    //               source={images.logoSmall}
    //               className="w-[70px] h-[70px]"
    //               resizeMode="contain"
    //             />
    //           </View>
    //         </View>
    //         {/* <PopularDestinations /> */}
    //         {/* <SearchInput /> */}

    //         {/* <View className="w-full flex-1 pt-5 pb-8">
    //           <Text className="text-lg font-pregular text-gray-100 mb-3">
    //             Latest Videos
    //           </Text>

    //           <Trending posts={latestPosts ?? []} />
    //         </View> */}
    //       </View>
    //     )}
    //     ListEmptyComponent={() => (
    //       <EmptyState
    //         title="No Videos Found"
    //         subtitle="No videos created yet"
    //       />
    //     )}
    //     refreshControl={
    //       <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    //     }
    //   />
    // </SafeAreaView>
  );
};

export default Home;
