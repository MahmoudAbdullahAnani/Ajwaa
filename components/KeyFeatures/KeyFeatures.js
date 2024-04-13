import { Pressable, StyleSheet, Text, View } from "react-native";
import DataKeyFeatures from "./DataKeyFeatures";
import { useState } from "react";
import { ArrowDown, arrowTop } from "../../assets/SVGRIcons";

export const StyleHeader = `text-white text-2xl font-bold`;
export default function KeyFeatures() {
  const [countItemsView, setCountItemsView] = useState(3);
  return (
    <View className={` `}>
      <View>
        <Text className={`${StyleHeader}`}>Key Features</Text>
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
              <Text className={`text-white text-lg font-bold`}>
                {item.title}
              </Text>
              <View style={{}}>{item.icon}</View>
            </View>
            <Text className={`text-white text-sm `}>{item.content}</Text>
          </View>
        ))}
        <Pressable
          onPress={() => {
            if (countItemsView === DataKeyFeatures.length) {
              return setCountItemsView(3);
            }
            return setCountItemsView(DataKeyFeatures.length);
          }}
          className={`text-white text-2xl font-bold flex flex-row justify-center items-center shadow-sm shadow-white bg-green-100 w-[150px] mx-auto p-[10px] rounded-lg`}
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
