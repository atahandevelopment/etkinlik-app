import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  SafeAreaView,
} from "react-native";
import EventCard from "../components/EventCard";
import { getEvents } from "../services";
import { useTailwind } from "tailwind-rn";
import Header from "../components/AppBarHeader";

const Tiyatro = () => {
  const tailwind = useTailwind();
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [loading, setLoading] = useState(false);
  //   const loadMoreEvents = async () => {
  //     if (loading) return;

  //     setLoading(true);
  //     try {
  //       const response = await getEvents(page, pageSize)
  //       setEvents((prevEvents) => [...prevEvents, ...response.data.results]);
  //       setPage((prevPage) => prevPage + 1);
  //     } catch (error) {
  //       console.error("Error fetching events:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   useEffect(() => {
  //     loadMoreEvents();
  //   }, []);

  return (
    <View
      style={tailwind(
        "w-full h-auto px-3 flex flex-row flex-wrap items-center"
      )}
    >
      <Header title="Tiyatrolar"/>
      {/* <FlatList
          data={events}
          horizontal={false}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          onEndReached={loadMoreEvents}
          onEndReachedThreshold={0.7}
          ListFooterComponent={loading && <ActivityIndicator />}
          renderItem={({ item, index }) => (
            <View
              key={index}
              style={tailwind(
                "w-[160px] h-[250px] m-1 border border-gray-300 border-solid rounded-sm"
              )}
            >
              <EventCard data={item} />
            </View>
          )}
          keyExtractor={(item) => item._id}
        /> */}
    </View>
  );
};

export default Tiyatro;
