import {
  FlatList,
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { trueIcon } from "./../../assets/Icons";

const data = [
  {
    _id: Math.random(),
    title: "Information Technology Certificate in Car Rental",
  },
  {
    _id: Math.random(),
    title: "Fleet management certificate",
  },
  {
    _id: Math.random(),
    title: "Certificate in Marketing and Promotion of Car Rental Services",
  },
  {
    _id: Math.random(),
    title: "Customer Service Certificate in Car Rental",
  },
  {
    _id: Math.random(),
    title: "Insurance tax is bad for cars",
  },
];
export default function SafetyGuaranteeCertificates() {
  const goToWebSite = () => {
    // Define the URL you want to open
    const url = "https://ittrip.vercel.app";

    // Open the URL in the device's default browser
    Linking.openURL(url).catch((error) =>
      console.error("An error occurred: ", error)
    );
  };

  const Item = ({ title }) => (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 18,
        gap: 10,
      }}
    >
      <Text style={{}}>{trueIcon}</Text>
      <Text style={{ fontSize: 16, fontWeight: "bold" }}>{title}</Text>
    </View>
  );
  return (
    <View style={[styles.container]}>
      <View>
        <Text style={[styles.header, { color: "#117C99" }]}>
          Safety guarantee certificates
        </Text>
        <Text style={[styles.text, { marginLeft: 10 }]}>
          These are some of the certificates we have obtained in the field of
          car rental over the years of experience we have obtained
        </Text>
      </View>
      <View style={{}}>
        {/* Image-1 */}
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
              source={require("./../../assets/service/2.png")}
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
          renderItem={({ item }) => <Item title={item.title} />}
          keyExtractor={(item) => item._id}
        />
      </View>
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
