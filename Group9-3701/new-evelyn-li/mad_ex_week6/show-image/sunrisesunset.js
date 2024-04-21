import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TextInput, View, Button, Image } from "react-native";
import GEO_API_KEY from "./.env";
import React, { useEffect, useState } from "react";

const url = "https://geocode.maps.co/search?q=";

export default function SunriseSunset() {
  const [address, setAddress] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [sunrise, setSunrise] = useState("");
  const [sunset, setSunset] = useState("");
  const [timeZone, setTimeZone] = useState("");

  useEffect(() => {
    const fetchSunriseSunset = async () => {
      try {
        if (!latitude || !longitude) {
          throw new Error("Invalid input");
        }
        const urlStr = `https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}`;
        const response = await fetch(urlStr);
        const data = await response.json();
        console.log("data", data);
        setSunrise(data.results.sunrise);
        setSunset(data.results.sunset);
        if (data.results.timezone) {
          setTimeZone(data.results.timezone);
        } else {
          setTimeZone(data.tzid);
        }
      } catch (error) {
        console.error(error);
      } finally {
        console.log("done");
      }
    };
    fetchSunriseSunset();
  }, [latitude, longitude]);

  useEffect(() => {
    console.log("timeZone updated:", timeZone);
  }, [timeZone]);
  const checkAddress = async () => {
    try {
      if (!address) {
        throw new Error("Invalid input");
      }
      console.log("Address", address);
      const urlStr = `${url}${address}&api_key=${GEO_API_KEY}`;
      // console.log("GEO_API_KEY", GEO_API_KEY);
      // console.log("URL", urlStr);
      const response = await fetch(urlStr);
      const data = await response.json();
      setDisplayName(data[0].display_name);
      console.log("display_name", displayName);
      setLongitude(data[0].lon);
      console.log("longitude", longitude);
      setLatitude(data[0].lat);
      console.log("latitude", latitude);
    } catch (error) {
      console.error(error);
    } finally {
      console.log("done");
    }
  };
  return (
    <View style={styles.address}>
      <TextInput
        placeholder="put an address"
        value={address}
        onChangeText={setAddress}
        multiline={true}
        style={{
          height: 50,
          borderColor: "gray",
          borderWidth: 1,
          width: 200,
        }}
      />
      <Button title="Search" onPress={checkAddress} />
      <Text>Name:{displayName}</Text>
      <Text>Longitude:{longitude}</Text>
      <Text>Latitude:{latitude}</Text>
      <Text>Sunrise:{sunrise}</Text>
      <Text>Sunset:{sunset}</Text>
      <Text>timeZone:{timeZone}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  address: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
