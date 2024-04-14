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
  );
};

export default Home;
