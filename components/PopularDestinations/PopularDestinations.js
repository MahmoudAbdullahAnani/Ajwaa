import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Image,
  ScrollView,
  ActivityIndicator,
  Modal,
} from "react-native";
import axios from "axios";

import { SliderBox } from "react-native-image-slider-box";

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

  return (
    <View style={{}}>
      {loading && (
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
      )}
      <Text style={[styles.header, { color: "#117C99" }]}>
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
        <SliderBox
          images={images}
          sliderBoxHeight={400}
          autoplay={true}
          autoplayInterval={5000}
          circleLoop
          resizeMode="cover"
          ImageComponentStyle={{
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
            width: 250,
            height: 250,
          }}
          imageLoadingColor="#2196F3"
        />

        {/* {data.map((item, index) => (
          <View
            key={index}
            style={{
              flex: 1,
              width: "100%",
              // justifyContent: "center",
              // alignItems: "center",
            }}
          >
            <Image
              source={{ uri: item.img }}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                zIndex: 5,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                // marginHorizontal: 10,
              }}
            />
          </View>
        ))} */}
      </View>

      <View
        style={{
          flex: 1,
          height: 200,
          marginVertical: 10,
          marginHorizontal: 16,
        }}
      >
        <Image
          source={{
            uri: `https://mahmoud-abdullah-anani.vercel.app/static/media/Home-Avtar.93e9c5d0be05dbf228c4.jpg`,
          }}
          resizeMode="cover"
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 20,
            objectFit: "fill",
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "start",
    // justifyContent: "start",
    // marginHorizontal: 12,
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
