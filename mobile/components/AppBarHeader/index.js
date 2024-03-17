import React from "react";
import { Appbar } from "react-native-paper";

export default function Header (props) {
    const { title } = props;
    return (
        <Appbar.Header style={{ backgroundColor: "#FF2D2D", height: 80}}>

            <Appbar.Content title={title} />
        </Appbar.Header>
    )
}