import React from "react";
import { Appbar } from "react-native-paper";
import { useNavigation } from '@react-navigation/native';

export default function DetailHeader (props) {
    const navigation = useNavigation();
    const { title } = props;
    return (
        <Appbar.Header style={{ backgroundColor: "#FF2D2D"}}>
            <Appbar.BackAction onPress={() => navigation.goBack()} />
            <Appbar.Content title={title} />
        </Appbar.Header>
    )
}