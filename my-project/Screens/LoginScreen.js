import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  TextInput,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  Platform,
  KeyboardAvoidingView,
  Dimensions,
  Pressable,
  Image,
} from "react-native";

const initialState = {
  email: "",
  password: "",
};

export const LoginScreen = () => {
  const [state, setState] = useState(initialState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [type, setType] = useState(false);
  const handleClick = () => setType("text");

  const [image, setImage] = useState(null);
  const addImage = () => {};

  const [dimensions, setDimensions] = useState(
    Dimensions.get("window").width - 8 * 2
  );

  useEffect(() => {
    onchange = () => {
      const width = Dimensions.get("window").width - 8 * 2;
      setDimensions(width);
    };
    Dimensions.addEventListener("change", onchange);
    return () => {
      Dimensions.removeEventListener("change", onchange);
    };
  }, []);

  const KeyboardHide = () => {
    Keyboard.dismiss();
    console.log(state);
    setState(initialState);
  };

  return (
    <TouchableWithoutFeedback onPress={KeyboardHide}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <View style={styles.form}>
          <View
            onLayout={() => setIsShowKeyboard(true)}
            style={{
              ...styles.inputForm,
              marginBottom: isShowKeyboard ? 110 : 150,
              width: dimensions,
            }}
          >
            <Text style={styles.title}>Войти</Text>

            <TextInput
              style={styles.input}
              placeholder={"Адрес электронной почты"}
              value={state.email}
              onChangeText={(value) =>
                setState((prevState) => ({ ...prevState, email: value }))
              }
              autoCapitalize={"none"}
              onFocus={() => setIsShowKeyboard(true)}
            />
            <View style={styles.inputSection}>
              <TextInput
                style={styles.inputPassword}
                type={type}
                placeholder={"Пароль"}
                secureTextEntry={type ? false : true}
                value={state.password}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, password: value }))
                }
                onFocus={() => setIsShowKeyboard(true)}
              />

              <Pressable style={styles.show} onPress={handleClick}>
                <Text style={styles.showText}>Показать</Text>
              </Pressable>
            </View>
            <TouchableOpacity activeOpacity={0.8} style={styles.button}>
              <Text style={styles.btnTitle}>Войти</Text>
            </TouchableOpacity>
            <Text style={styles.text}>Нет аккаунта? Зарегистрироваться</Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  form: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    alignItems: "center",
    position: "relative",
  },
  title: {
    marginTop: 32,
    marginBottom: 33,
    textAlign: "center",
    fontSize: 30,
    color: "#212121",
    fontFamily: "Roboto-Medium",
  },
  input: {
    height: 50,
    marginBottom: 16,
    backgroundColor: "#F6F6F6",
    borderColor: "#E8E8E8",
    borderWidth: 1,
    padding: 16,
    borderRadius: 8,
    color: "#212121",
    fontFamily: "Roboto-Regular",
  },
  text: {
    color: "#1B4371",
    fontSize: 16,
    textAlign: "center",
    marginTop: 16,
    fontFamily: "Roboto-Regular",
  },
  button: {
    backgroundColor: "#FF6C00",
    marginTop: 43,
    height: 51,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#FF6C00",
  },
  btnTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
  },
  inputForm: {
    marginBottom: 110,
  },
  show: {
    position: "absolute",
    right: 100,
    transform: [{ translateX: 100 }],
    padding: 16,
  },
  inputSection: {
    position: "relative",
    height: 50,
    marginBottom: 16,
    backgroundColor: "#F6F6F6",
    borderColor: "#E8E8E8",
    borderWidth: 1,
    padding: 16,
    borderRadius: 8,
    color: "#212121",
    fontFamily: "Roboto-Regular",

    justifyContent: "center",
    alignItems: "baseline",
  },
  inputPassword: {
    position: "absolute",
    padding: 16,
  },
  showText: {
    color: "#1B4371",
  },
});
