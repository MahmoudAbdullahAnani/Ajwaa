import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image } from "react-native";

import { images } from "../../constants";
import { SignUp as createUser } from "../../lib/appwrite";
import { CustomButton, FormField } from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider";

const SignUp = () => {
  const { setUser, setIsLogged } = useGlobalContext();

  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const submit = async () => {
    const { name, email, password } = form;
    if (name === "" || email === "" || password === "") {
      return Alert.alert("Error", "Please fill in all fields");
    }
    // console.log("====================================");
    // console.log({ name, email, password });
    // console.log("====================================");
    setSubmitting(true);
    try {
      await createUser(email, password, name);
      setIsLogged(false);
      setSubmitting(false);
      Alert.alert("Success", "Check your email for verification code");
      router.replace("/verificationAccountCode");
    } catch (err) {
      setSubmitting(false);
      console.log(err);
      if (
        err.response.data.message === "The user is already exist, go to login"
      ) {
        return router.replace("/verificationAccountCode");
      }
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
            Sign Up to Ajwaa
          </Text>

          <FormField
            title="Name"
            placeholder={"Enter your name"}
            value={form.name}
            handleChangeText={(e) => setForm({ ...form, name: e })}
            otherStyles="mt-10"
          />

          <FormField
            title="Email"
            value={form.email}
            placeholder={"Enter your email"}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            placeholder={"Enter your password"}
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />

          <CustomButton
            title="Sign Up"
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

export default SignUp;
