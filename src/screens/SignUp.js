import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";

const SignUp = () => {
  return (
    <SafeAreaView>
      <View>
        <Text>Login Here</Text>
        <View>
          <TextInput placeholder="Email" placeholderTextColor={blue} />
          <TextInput placeholder="Password" />
        </View>
        <View>
          <TouchableOpacity>
            <Text>Clear</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>Sign In</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity>
            <Text>Switch to : sign up a new account </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export { SignUp };
