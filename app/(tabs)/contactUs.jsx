import {
  ScrollView,
  View,
  Text,
  Dimensions,
  Image,
  Pressable,
  Alert,
} from "react-native";
import { images } from "../../constants";
import { CustomButton, FormField } from "../../components";
import { useState } from "react";
import { SendMSG } from "../../lib/appwrite";
export default function contactUs() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    msg: "",
  });
  const [isSubmitting, setSubmitting] = useState(false);
  const submit = async () => {
    const { email, name, msg } = form;
    setSubmitting(true);
    if (name.length < 2 || email.length < 11 || msg.length < 2) {
      setSubmitting(false);
      return Alert.alert("Error", "Verify the data");
    }
    try {
      const sendData = await SendMSG(name, email, msg);

      setForm({
        name: "",
        email: "",
        msg: "",
      });
      setSubmitting(false);
      if (sendData.statusCode === 200) {
        return Alert.alert("Success", sendData.message);
      }
    } catch (err) {
      setSubmitting(false);
      if (typeof err.response.data.message === "string") {
        return Alert.alert("Error", err.response.data.message);
      }
      Alert.alert("Error", err.response.data.message[0]);
    }
  };

  return (
    <ScrollView className="bg-primary flex-1 py-10 ">
      <View className={`mb-28`}>
        <Text className="text-2xl text-white font-psemibold p-3">
          Contact Us
        </Text>
        <View
          className="w-full flex justify-center h-full px-4 mb-6 "
          style={{
            minHeight: Dimensions.get("window").height - 100,
          }}
        >
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[100px] h-[100px] "
          />

          <Text className="text-lg font-semibold text-white mt-10 font-psemibold">
            do you need help?
          </Text>
          <Text className="text-lg font-semibold text-white mt-10 font-psemibold">
            24/7 Support: We are here to support you every step of the way in
            order to enjoy the best experience
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
            title="Massge"
            placeholder={"Enter your massege"}
            value={form.msg}
            handleChangeText={(e) => setForm({ ...form, msg: e })}
            otherStyles="mt-7"
          />

          <CustomButton
            title="Send"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />
        </View>
      </View>
    </ScrollView>
  );
}
