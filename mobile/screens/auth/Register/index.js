import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTailwind } from "tailwind-rn";
import BackButton from "../../../components/BackButton";
import { Button, Dialog, TextInput } from "react-native-paper";
import { Cities } from "../../../services/cities";
import { useForm, Controller } from "react-hook-form";
import { Dropdown } from 'react-native-element-dropdown';
import { UserRegister } from "../../../services/auth/register";
import { useNavigation } from "@react-navigation/native";

const Register = () => {
  const tailwind = useTailwind();
  const navigation = useNavigation();
  const [cities, setCities] = useState([]);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await UserRegister(data)

      if(response.status === 201) {
        navigation.navigate("Login");
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    Cities()
      .then((res) => setCities(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <View style={tailwind("w-full h-full flex justify-center items-center")}>
      <BackButton />

      <View style={tailwind("w-11/12 h-auto flex justify-start items-center")}>
        <Text style={tailwind("text-2xl mb-3 font-semibold")}>
          Ücretsiz Kayıt Olun
        </Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              onChangeText={onChange}
              onBlur={onBlur}
              label="Adınız*"
              mode="outlined"
              value={value}
              style={tailwind("w-full mb-3")}
            />
          )}
          name="first_name"
          rules={{ required: "İsim zorunlu alandır." }}
        />

        {errors.first_name && (
          <Text className="text-red-500 text-xs">{errors.first_name}</Text>
        )}
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              onChangeText={onChange}
              onBlur={onBlur}
              label="Soyadınız*"
              mode="outlined"
              value={value}
              style={tailwind("w-full mb-3")}
            />
          )}
          name="last_name"
          rules={{ required: "Soyadı zorunlu alandır." }}
        />
        {errors.email && (
          <Text className="text-red-500 text-xs">{errors.last_name}</Text>
        )}
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              onChangeText={onChange}
              onBlur={onBlur}
              label="E-posta adresiniz*"
              mode="outlined"
              value={value}
              style={tailwind("w-full mb-3")}
            />
          )}
          name="email"
          rules={{ required: "E-mail zorunlu alandır." }}
        />
        {errors.email && (
          <Text className="text-red-500 text-xs">{errors.email}</Text>
        )}
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={cities}
              search
              maxHeight={300}
              labelField="name"
              valueField="value"
              placeholder="Şehir Seçiniz"
              searchPlaceholder="Şehir ara..."
              value={value?.city}
              onChange={(item) => onChange(item._id)}
              onBlur={onBlur}
            />
          )}
          name="city"
          rules={{ required: "City is required" }}
        />
        {errors.city && <Text>{errors.city.message}</Text>}

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              onChangeText={onChange}
              onBlur={onBlur}
              label="Parola*"
              mode="outlined"
              value={value}
              style={tailwind("w-full mb-3")}
            />
          )}
          name="password"
          rules={{
            minLength: 8,
            maxLength: 20,
            required: "Parola zorunlu alandır.",
          }}
        />

        {errors.email && (
          <Text className="text-red-500 text-xs">{errors.password}</Text>
        )}
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              onChangeText={onChange}
              onBlur={onBlur}
              label="Parola Tekrar*"
              mode="outlined"
              value={value}
              style={tailwind("w-full mb-3")}
            />
          )}
          name="password_confirmation"
          rules={{
            minLength: 8,
            maxLength: 20,
            required: "Parola zorunlu alandır.",
          }}
        />
        {errors.email && (
          <Text className="text-red-500 text-xs">
            {errors.password_confirmation}
          </Text>
        )}

        <Button
          style={tailwind("w-8/12 mt-5 h-14 flex items-center justify-center")}
          onPress={handleSubmit(onSubmit)}
          mode="contained"
        >
          <Text style={tailwind("text-lg")}>Şimdi Kayıt Ol</Text>
        </Button>
      </View>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  dropdown: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: "#FFFFFF",
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
