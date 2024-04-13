import { useEffect, useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  Alert,
  Image,
  Pressable,
} from "react-native";

import { images } from "../../constants";
import { CustomButton, FormField } from "../../components";
// import { signIn } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { signIn } from "../../lib/appwrite";

const SignIn = () => {
  const { setUser, setIsLogged } = useGlobalContext();
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const submit = async () => {
    const { email, password } = form;
    if (email === "" || password === "") {
      return Alert.alert("Error", "Please fill in all fields");
    }

    setSubmitting(true);

    try {
      const data = await signIn(email, password);
      setSubmitting(false);
      await AsyncStorage.setItem("UserData", JSON.stringify(data));

      await AsyncStorage.setItem("isUserLogged", "true");
      setUser(data);
      setIsLogged(true);
      // Alert.alert("Success", "User signed in successfully");
      router.replace("/home");
    } catch (err) {
      setSubmitting(false);

      if (typeof err.response.data.message === "string") {
        return Alert.alert("Error", err.response.data.message);
      }
      Alert.alert("Error", err.response.data.message[0]);
    }
  };
  useEffect(() => {
    const handleData = async () => {};
    handleData();
  }, []);

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View
          className="w-full flex justify-center h-full px-4 my-6"
          style={{
            minHeight: Dimensions.get("window").height - 100,
          }}
        >
          <Pressable onPress={() => router.back()} className="w-full mb-10">
            <Text className="text-lg text-gray-100 font-pregular">Back</Text>
          </Pressable>
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[100px] h-[100px]"
          />

          <Text className="text-2xl font-semibold text-white mt-10 font-psemibold">
            Log in to Ajwaa
          </Text>

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />

          <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have an account?
            </Text>
            <Link
              href="/sign-up"
              className="text-lg font-psemibold text-[#2AA3CD] underline"
            >
              Signup
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
