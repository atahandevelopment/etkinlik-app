import React, { useEffect, useState } from "react";
import { View, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import EventCard from "../../components/EventCard";
import { getEvents } from "../../services";
import { useTailwind } from "tailwind-rn";
import Header from "../../components/AppBarHeader";
import { useNavigation } from "@react-navigation/native";
import SearhBar from "../../components/SearchBar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FAB } from "react-native-paper";

const Home = () => {
  const tailwind = useTailwind();
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [loading, setLoading] = useState(false);
  const [onSearch, setOnSearch] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const navigation = useNavigation();

  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem("@token");
      return token != null ? setUserInfo(JSON.parse(token)) : null;
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getToken();
  }, []);

  const loadMoreEvents = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const response = await getEvents(page, pageSize);
      setEvents((prevEvents) => [...prevEvents, ...response.data.results]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMoreEvents();
  }, []);

  return (
    <View style={tailwind("flex-1")}>
      <View style={tailwind("px-0")}>
        <Header title="Anasayfa" />
      </View>
      <SearhBar onSearch={onSearch} setOnSearch={setOnSearch} />
      <View style={tailwind("w-full h-auto p-1 flex flex-row items-center")}>
        <FlatList
          data={events}
          horizontal={false}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={{ gap: 5 }}
          contentContainerStyle={{
            gap: 4,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingRight: 10,
            paddingLeft: 5,
          }}
          onEndReached={loadMoreEvents}
          onEndReachedThreshold={0.7}
          style={{ width: "100%", height: "auto" }}
          ListFooterComponent={loading && <ActivityIndicator />}
          renderItem={({ item, index }) => (
            <EventCard key={index} data={item} />
          )}
          keyExtractor={(item) => item._id}
        />
      </View>
      <FAB
        icon="magnify"
        style={styles.fab}
        size="medium"
        onPress={() => setOnSearch(true)}
      />
    </View>
  );
};

export default Home;


const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    borderRadius: 99,
  },
});
