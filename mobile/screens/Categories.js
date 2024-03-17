import React, { useEffect, useState } from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
import EventCard from "../components/EventCard";
import { getEvents } from "../services";
import { useTailwind } from "tailwind-rn";
import Header from "../components/AppBarHeader";
import { useNavigation } from "@react-navigation/native";
import SearhBar from "../components/SearchBar";

const Categories = () => {
  const tailwind = useTailwind();
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [loading, setLoading] = useState(false);
  const [onSearch, setOnSearch] = useState(false);
  const navigation = useNavigation();
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
      <SearhBar />
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
    </View>
  );
};

export default Categories;
