import React from "react";
import { View, Text } from "react-native";
import { WebView } from "react-native-webview";
import router, { useLocalSearchParams } from "expo-router";
const ML = ({ route }) => {
  const params = useLocalSearchParams();
  console.log(params.uri);

  return (
    <View style={{ width: "100%", height: "100%", borderWidth: 2 }}>
      {/* <Text style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center', padding: 10}}>Audiogram Digitization</Text> */}
      <WebView
        source={{
          html: `
                  <!DOCTYPE html>
                  <html style="height: 100%; width: 100%;">
                    <body style="height: 100%; width: 100%;">
                      <iframe
                      src="https://weiren119-audiogramdigitization.hf.space"
                      height="100%"
                      width="100%"
                    ></iframe>
                    </body>
                  </html>
            `,
        }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        initialScale={200}
        // Add h1 tag to the html string
        injectedJavaScript={
          'document.body.style.backgroundColor = "#B5B6BA";' +
          'document.body.style.color = "black";' +
          "const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=0.5, maximum-scale=0.5, user-scalable=0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta);"
        }
        scalesPageToFit={true}
        // userAgent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36
        // (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36"
      />
    </View>
  );
};

export default ML;
