import React from "react";
import { BottomNavigation } from "react-native-paper";
import Home from "../../screens/Home";
import Favorites from "../../screens/Favorites";
import Places from "../../screens/Places";
import Account from "../../screens/Account";


export default function BottomNavigationComponent(props) {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'home', title: 'Anasayfa', focusedIcon: 'home-outline', unfocusedIcon: 'home'},
        { key: 'favoriler', title: 'Favoriler', focusedIcon: 'heart-outline', unfocusedIcon: 'heart'},
        { key: 'mekanlar', title: 'Mekanlar', focusedIcon: 'pin-outline', unfocusedIcon: 'pin'},
        { key: 'hesap', title: 'Hesabım', focusedIcon: 'account-outline', unfocusedIcon: 'account'},

    ]);

    const renderScene = BottomNavigation.SceneMap({
        home: Home,
        favoriler: Favorites,
        mekanlar: Places,
        hesap: Account
    });
    return (
        <BottomNavigation
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            activeColor="#000000"
            inactiveColor="#FFFFFF"
            renderScene={renderScene}
            barStyle={{ backgroundColor: '#FF2D2D', height: 70 }}
        />
    )
}