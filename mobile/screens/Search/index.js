import React, { useEffect,useState } from "react";
import { View, FlatList } from "react-native";
import { useTailwind } from "tailwind-rn";
import DetailHeader from "../../components/DetailHeaderBar";
import { SearchService } from "../../services/search";
import EventCard from "../../components/EventCard";
import { ActivityIndicator } from "react-native-paper";

const Search = (props) => {
  const tailwind = useTailwind();
  const query = props.route.params.props.query || "";
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);

  const loadMoreEvents = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const response = await SearchService(query, page, pageSize);
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
    <View style={tailwind("w-full h-auto flex justify-center items-center")}>
      <View style={{ width: "100%", height: "auto" }}>
        <DetailHeader title={query} />
      </View>
      <View style={tailwind("w-full h-auto p-1 flex flex-row items-center")}>
        <FlatList
          data={events}
          horizontal={false}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={{ gap: 2 }}
          contentContainerStyle={{ gap: 4 }}
          onEndReached={loadMoreEvents}
          onEndReachedThreshold={0.7}
          style={{ width: "100%", height: "auto", display: "flex", gap: 5 }}
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

export default Search;
