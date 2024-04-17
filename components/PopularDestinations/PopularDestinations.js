import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  ScrollView,
  ActivityIndicator,
  Modal,
} from "react-native";
import axios from "axios";
import { Image } from "expo-image";

import Swiper from "react-native-swiper";

// import VideoPlayer from "react-native-video-player";
export const exampleMainImage =
  "https://res.cloudinary.com/dxrgztsfz/image/upload/v1712662767/wiuk0p8a8tv6qpwfvcgc.jpg";

export default function PopularDestinations() {
  const [data, setData] = useState([
    {
      id: 1,
      img: exampleMainImage,
      titleAR: "مصر",
      titleEN: "Egypt",
    },
    {
      id: 2,
      img: exampleMainImage,
      titleAR: "مكة",
      titleEN: "Macca",
    },
    {
      id: 1,
      img: exampleMainImage,
      titleAR: "المغرب",
      titleEN: "Morocco",
    },
    {
      id: 1,
      img: exampleMainImage,
      titleAR: "القاهرة",
      titleEN: "Egypt",
    },
    {
      id: 1,
      img: exampleMainImage,
      titleAR: "القاهرة",
      titleEN: "Egypt",
    },
    {
      id: 1,
      img: exampleMainImage,
      titleAR: "القاهرة",
      titleEN: "Egypt",
    },
    {
      id: 1,
      img: exampleMainImage,
      titleAR: "القاهرة",
      titleEN: "Egypt",
    },
  ]);
  const [indexImage, setIndexImage] = useState(0);

  useEffect(() => {
    getData();
  }, []);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const getData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://my-trip-back-end.onrender.com/static-sections/popular-destinations"
      );
      setLoading(false);
      setImages(response.data.data.map((item) => item.img));
      setData(response.data.data);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data:", error);
    }
  };

  if (loading) {
    return (
      <Modal
        style={{
          backgroundColor: "black",
          opacity: 0.5,
          flex: 1,
          padding: 50,
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "black",
          }}
        >
          <Image
            source={require("./../../assets/loadStart.gif")}
            style={{ width: "100%", height: "30%" }}
          />
        </View>
      </Modal>
    );
  }

  return (
    <View className={`h-[250px] pt-5`}>
      <Text style={[styles.header, { color: "#fff" }]}>
        Popular Destinations ({data.length})
      </Text>
      <View
        style={{
          flex: 1,
          height: 250,
          flexDirection: "row",
          overflow: "scroll",
          gap: 10,
        }}
      >
        <Swiper style={[{}]} loop={true} autoplay={true}>
          {data.map((item, index) => (
            <View key={index} className={`w-[100%] h-[100%]`}>
              <Image
                source={item.img.replace("http://", "https://")}
                placeholder={"ajwaa"}
                contentFit="cover"
                transition={1000}
                className={`w-[100%] h-[100%] z-[5] rounded-t-[10px]`}
              />
            </View>
          ))}
        </Swiper>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 16,
    marginBottom: 8,

    color: "red",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    marginLeft: 16,
  },
});
