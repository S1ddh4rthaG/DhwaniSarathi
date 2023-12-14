import React from "react";
import {
    Text,
    View,
    TextInput,
    ImageBackground,
    StyleSheet,
    Dimensions
} from "react-native";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const BackgroundImg = () => {
    return (
        <View>
            <ImageBackground
                source={{
                    uri:
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlsdVPz-ZVsL0c_7Ectrjza0GFnJi_QgyTTbO1S35KaQ&s"
                }}
                style={styles.img}
            ></ImageBackground>
        </View>
    );
};

export default BackgroundImg;

const styles = StyleSheet.create({
    img: {
        height: 100,
        width: 100
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 2,
        padding: 10
    }
});
