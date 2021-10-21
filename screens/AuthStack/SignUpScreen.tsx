import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import { Text, SafeAreaView, StyleSheet, ScrollView } from "react-native";
import { Appbar, TextInput, Snackbar, Button } from "react-native-paper";
import { AuthStackParamList } from "./AuthStackScreen";
import { createUserWithEmailAndPassword } from "firebase/auth";
import firebase from "firebase";

interface Props {
  navigation: StackNavigationProp<AuthStackParamList, "SignUpScreen">;
}

export default function SignUpScreen({ navigation }: Props) {
  /* Screen Requirements:
      - AppBar
      - Email & Password Text Input
      - Submit Button
      - Sign In Button (goes to Sign In Screen)
      - Snackbar for Error Messages
  
    All UI components on this screen can be found in:
      https://callstack.github.io/react-native-paper/

    All authentication logic can be found at:
      https://firebase.google.com/docs/auth/web/start
  */
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [snackbarMessage, setSnackbar] = useState("");
  const onDismissSnackbar = () => setSnackbar("");

  return (
    <>
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <TextInput
            label = "Email"
            value = {email}
            onChangeText = {(text) => setEmail(text)}
        />
        <TextInput 
            label = "Password"
            value = {password}
            onChangeText = {(text) => setPassword(text)}
        />
        <Button
          mode = "contained"
          onPress = {() => {
            firebase.auth().createUserWithEmailAndPassword(email, password).then((userCredential) => {
              let user = userCredential.user;
              navigation.navigate("RootStackScreen");
            }).catch((error) => {
              let codeError = error.code;
              let errorMessage = error.message;
              setSnackbar(errorMessage);
            });
          }}
        >
          Create New Account
        </Button>
      </SafeAreaView>
    </ScrollView>
    <Snackbar
          visible = {snackbarMessage}
          onDismiss = {onDismissSnackbar}
    >
      {snackbarMessage}
    </Snackbar>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    backgroundColor: "#ffffff",
  },
});
