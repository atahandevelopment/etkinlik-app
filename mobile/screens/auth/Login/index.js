import React from "react";
import { Text, View } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useTailwind } from "tailwind-rn";
import BackButton from "../../../components/BackButton";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import { GetMe, LoginService } from "../../../services/auth/login";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Buffer } from "buffer";

const Login = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const tailwind = useTailwind();
  const navigation = useNavigation();

  const goRegister = () => {
    navigation.navigate("Register");
  };

  const onSubmit = async (data) => {
    try {
      const response = await LoginService(data);
      if (response.status === 200) {
        const { access, refresh } = response.data;
        const parts = access.split(".").map((part) => {
          return Buffer.from(
            part.replace(/-/g, "+").replace(/_/g, "/"),
            "base64"
          );
        });
        const { userId } = JSON.parse(parts[1].toString());
        if (userId) {
          const getMe = await GetMe(userId);

          if (getMe.status === 200) {
            const info = getMe.data.data;
            await AsyncStorage.setItem(
              "@token",
              JSON.stringify({ user: info, access: access, refresh: refresh })
            );
            setTimeout(() => {
              navigation.navigate("Home");
            }, 1000);
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={tailwind("w-full h-full flex justify-center items-center")}>
      <BackButton />
      <View style={tailwind("w-11/12 h-auto flex justify-start items-center")}>
        <Text style={tailwind("text-2xl mb-3 font-semibold")}>Giriş Yapın</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur } }) => (
            <TextInput
              onChangeText={onChange}
              onBlur={onBlur}
              label="Email"
              mode="outlined"
              style={tailwind("w-full mb-3")}
            />
          )}
          name="email"
          rules={{ required: "Lütfen geçerli bir mail giriniz." }}
        />

        {errors.email && (
          <Text className="text-red-500 text-xs">{errors.email}</Text>
        )}
        <Controller
          control={control}
          render={({ field: { onChange, onBlur } }) => (
            <TextInput
              onChangeText={onChange}
              onBlur={onBlur}
              secureTextEntry
              label="Parola"
              mode="outlined"
              style={tailwind("w-full")}
            />
          )}
          name="password"
          rules={{ required: "Lütfen parolanızı giriniz." }}
        />
        <View style={tailwind("w-full h-auto flex items-start justify-center")}>
          <Button style={tailwind("text-blue-500 my-4 font-semibold")}>
            Şifremi Unuttum
          </Button>
        </View>
      </View>
      <View
        style={[
          tailwind("w-11/12 h-auto flex flex-row justify-center items-center"),
          { gap: 5 },
        ]}
      >
        <Button
          mode="contained"
          textColor="#000000"
          buttonColor="#deba1d"
          onPress={handleSubmit(onSubmit)}
          style={tailwind("w-7/12 h-auto rounded-md")}
        >
          Giriş Yap
        </Button>
        <Button
          mode="outlined"
          textColor="#000000"
          style={tailwind("w-5/12 h-auto rounded-md")}
          onPress={goRegister}
        >
          Üye Ol
        </Button>
      </View>
    </View>
  );
};

export default Login;
