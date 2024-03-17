import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { getDetailEvent } from "../../services";
import { useTailwind } from "tailwind-rn";
import { ActivityIndicator } from "react-native-paper";
import DetailHeader from "../../components/DetailHeaderBar";
import RenderHTML from "react-native-render-html";

const EventDetails = (props) => {
  const eventId = props.route.params.props.id;
  const tailwind = useTailwind();
  const [eventDetail, setEventDetail] = useState();
  const [loading, setLoading] = useState(true);
  const startDate = new Date(eventDetail?.start);
  const endDate = new Date(eventDetail?.end);
  const day = startDate.getDate();
  const month = startDate.getMonth() + 1;
  const year = startDate.getFullYear();
  const startTime =
    startDate.toLocaleTimeString().split(":")[0] +
    ":" +
    startDate.toLocaleTimeString().split(":")[1];
  const endTime =
    endDate.toLocaleTimeString().split(":")[0] +
    ":" +
    endDate.toLocaleTimeString().split(":")[1];
  const endday = endDate.getDate();
  const endmonth = endDate.getMonth() + 1;
  const endyear = endDate.getFullYear();
  const startDateString = `${day}/${month}/${year} - ${startTime}`;
  const endDateDateString = `${endday}/${endmonth}/${endyear} - ${endTime}`;

  const source = { html: eventDetail?.content };
  
  useEffect(() => {
    // if(loading) return;
    getDetailEvent(eventId)
      .then((res) => {
        setEventDetail(res.data.data);
      })
      .catch((err) => {
        console.error(err);
      }).finally(() => {
        setLoading(false);
      });
  }, []);


  if(loading) {
    return (
      <View style={tailwind("w-full h-auto flex justify-center items-center")}>
        <ActivityIndicator />
      </View>
    )
  }

  return (
    <View style={tailwind("w-full h-auto flex justify-center items-center")}>
      <View style={{ width: "100%", height: "auto" }}>
        <DetailHeader title={eventDetail?.name} />
      </View>
      <ScrollView>
        <View
          style={tailwind("w-full h-[250px] flex justify-center items-center")}
        >
          {eventDetail?.poster_url !== undefined ? (
            <Image
              source={{ uri: eventDetail?.poster_url }}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <ActivityIndicator />
          )}
        </View>
        <View
          style={tailwind(
            "w-full h-auto flex justify-center items-start px-4 py-2"
          )}
        >
          <Text style={tailwind("font-bold text-montserrat text-2xl")}>
            {eventDetail?.name}
          </Text>
        </View>
        <View
          style={tailwind(
            "w-full h-auto flex justify-center items-start px-4 py-2"
          )}
        >
          <Text style={tailwind("font-bold text-xl")}>Adres:</Text>
          <Text
            style={tailwind("text-xl")}
          >{`${eventDetail?.venue?.address}, ${eventDetail?.venue?.district.name}/${eventDetail?.venue?.city.name}`}</Text>
        </View>
        <View
          style={tailwind(
            "w-full h-auto flex justify-center items-start px-4 py-2"
          )}
        >
          <Text style={tailwind("font-bold text-xl")}>Tarih:</Text>
          <Text
            style={tailwind("text-xl")}
          >{`Başlangıç: ${eventDetail?.start ? startDateString : ''}`}</Text>
          <Text
            style={tailwind("text-xl")}
          >{`Bitiş: ${eventDetail?.end ? endDateDateString : ''}`}</Text>
        </View>
        <View
          style={tailwind(
            "w-full h-auto flex justify-center items-start px-4 py-4"
          )}
        >
          <RenderHTML source={source} />
        </View>
      </ScrollView>
    </View>
  );
};

export default EventDetails;
