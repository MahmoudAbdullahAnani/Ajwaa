import {
  FlatList,
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { trueIcon } from "../../assets/Icons";

const data = [
  {
    _id: Math.random(),
    title: "Wide variety of cars",
    content:
      "We offer a variety of cars in different categories and models, allowing customers to choose the car that precisely suits their needs.",
  },
  {
    _id: Math.random(),
    title: "Excellent customer service",
    content:
      "Our customer service team is dedicated to providing support and assistance to customers at all times, ensuring their complete satisfaction and comfortable experience during the rental process.",
  },
  {
    _id: Math.random(),
    title: "Competitive offers and prices",
    content:
      "We are keen to provide attractive offers and competitive prices that suit customers’ budgets, which makes us the ideal choice for car rental at the best possible value.",
  },
];
export default function SafetyGuaranteeCertificatesTow() {
  const goToWebSite = () => {
    // Define the URL you want to open
    const url = "https://ittrip.vercel.app";

    // Open the URL in the device's default browser
    Linking.openURL(url).catch((error) =>
      console.error("An error occurred: ", error)
    );
  };

  const Item = ({ title, content }) => (
    <View
      style={{
        marginBottom: 18,
        gap: 10,
      }}
    >
      <Text style={{ fontSize: 16, fontWeight: "bold" }}>{title}</Text>
      <Text style={{ fontSize: 16, color: "black" }}>{content}</Text>
    </View>
  );
  return (
    <View style={[styles.container]}>
      {/* Image-2 */}
      <View>
        <TouchableOpacity
          style={{
            marginBottom: 10,
          }}
          onPress={goToWebSite}
        >
          <Image
            style={{
              width: "100%",
              height: 300,
              resizeMode: "contain",
              borderRadius: 6,
              shadowColor: "#117C99",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
            }}
            source={require("./../../assets/service/4.png")}
          />
          <Text
            style={{
              fontSize: 12,
              opacity: 0.6,
            }}
          >
            Click to go to the website
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        renderItem={({ item, content }) => (
          <Item title={item.title} content={item.content} />
        )}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    // marginLeft: 16,
  },
});
