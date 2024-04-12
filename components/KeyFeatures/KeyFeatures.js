import { Pressable, StyleSheet, Text, View } from "react-native";
import DataKeyFeatures from "./DataKeyFeatures";
import Svg, { Path } from "react-native-svg";
import { useState } from "react";
import { ArrowDown, arrowTop } from "../../assets/Icons";
export default function KeyFeatures() {
  const [countItemsView, setCountItemsView] = useState(3);
  return (
    <View style={[styles.container]}>
      <View>
        <Text style={[styles.header, , { color: "#117C99" }]}>
          Key Features
        </Text>
        {DataKeyFeatures.slice(0, countItemsView).map((item) => (
          <View style={{ marginBottom: 18 }} key={`${item._id}--${item._id}`}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 18,
              }}
            >
              <Text style={[styles.text, { fontWeight: "bold" }]}>
                {item.title}
              </Text>
              <View style={{}}>{item.icon}</View>
            </View>
            <Text style={styles.text}>{item.content}</Text>
          </View>
        ))}
        <Pressable
          onPress={() => {
            if (countItemsView === DataKeyFeatures.length) {
              return setCountItemsView(3);
            }
            return setCountItemsView(DataKeyFeatures.length);
          }}
          style={{
            fontWeight: "bold",
            padding: 10,
            backgroundColor: "white",
            width: 150,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            gap: 8,
            alignItems: "center",
            borderRadius: 10,
            alignSelf: "center",
            marginBottom: 10,
            shadowColor: "#117C99",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
        >
          <Text
            style={{
              color: "#117C99",
              fontSize: 16,
              borderRadius: 10,
              textAlign: "center",
            }}
          >
            {countItemsView === DataKeyFeatures.length
              ? "see less"
              : "see more"}
          </Text>
          <View>
            {countItemsView !== DataKeyFeatures.length ? ArrowDown : arrowTop}
          </View>
        </Pressable>
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
