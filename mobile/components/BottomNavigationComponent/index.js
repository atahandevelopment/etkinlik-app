import React from "react";
import { BottomNavigation } from "react-native-paper";
import Categories from "../../screens/Categories";
import Sinema from "../../screens/Sinema";
import Tiyatro from "../../screens/Tiyatro";


export default function BottomNavigationComponent(props) {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'home', title: 'Anasayfa', focusedIcon: 'home', unfocusedIcon: 'home-outline'},
        { key: 'favoriler', title: 'Favoriler', focusedIcon: 'heart', unfocusedIcon: 'heart-outline'},
        { key: 'yakinimda', title: 'Yakınımda', focusedIcon: 'google-nearby', unfocusedIcon: 'google-nearby'},
        { key: 'hesap', title: 'Hesabım', focusedIcon: 'account', unfocusedIcon: 'account-outline'},

    ]);

    const renderScene = BottomNavigation.SceneMap({
        home: Categories,
        favoriler: Sinema,
        hesap: Tiyatro
    });
    return (
        <BottomNavigation
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderScene={renderScene}
            barStyle={{ backgroundColor: '#FF2D2D', height: 70 }}
        />
    )
}