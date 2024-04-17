import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image } from "react-native";

import { images } from "../../constants";
import { VerificationAccountCode } from "../../lib/appwrite";
import { CustomButton, FormField } from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";

const verificationAccountCode = () => {
  const { setUser, setIsLogged } = useGlobalContext();

  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    code: "",
  });

  const submit = async () => {
    const { code } = form;
    if (code === "") {
      return Alert.alert("Error", "Please fill in field code");
    }
    setSubmitting(true);
    try {
      const data = await VerificationAccountCode(code);
      setSubmitting(false);
      await AsyncStorage.setItem("UserData", JSON.stringify(data));

      await AsyncStorage.setItem("isUserLogged", "true");
      setUser(data);
      setIsLogged(true);
      return router.replace("/home");
    } catch (err) {
      setSubmitting(false);
      console.log(err);
      if (typeof err.response.data.message === "string") {
        return Alert.alert("Error", err.response.data.message);
      }
      Alert.alert("Error", err.response.data.message[0]);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View
          className="w-full flex justify-center h-full px-4 mb-6"
          style={{
            minHeight: Dimensions.get("window").height - 100,
          }}
        >
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[100px] h-[100px]"
          />

          <Text className="text-2xl font-semibold text-white mt-10 font-psemibold">
            Complete Up to Ajwaa
          </Text>

          <FormField
            title="code"
            placeholder={"Enter your code"}
            value={form.code}
            handleChangeText={(e) => setForm({ ...form, code: e })}
            otherStyles="mt-10"
          />

          <CustomButton
            title="Vify Account"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Have an account already?
            </Text>
            <Link
              href="/sign-in"
              className="text-lg font-psemibold text-[#2AA3CD] underline"
            >
              Login
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default verificationAccountCode;
