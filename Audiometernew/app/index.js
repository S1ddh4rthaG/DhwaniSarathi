import React from "react";
import { useState, useEffect } from "react";
import { View, Text, ScrollView, SafeAreaView } from "react-native";

const Home = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("http://192.168.1.5:80/users/", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((json) => {
        setData(json), console.log(json);
      })
      .catch((error) => console.error(error));
  }, []);
  return (
    <SafeAreaView>
      <ScrollView>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
          }}
        >
          <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
            Home
          </Text>
          <Text>Welcome to our homepage!</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
