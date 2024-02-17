import Categories from "../models/Categories.js";
import Cities from "../models/Cities.js";
import Districts from "../models/Districts.js";
import Events from "../models/Events.js";
import Formats from "../models/Formats.js";
import Neighborhoods from "../models/Neighborhoods.js";
import Venues from "../models/Venues.js";
import { axiosInstance } from "./axiosInstance.js";

export const startDataSync = async () => {
  // İlk senkronizasyonu hemen yap
//   await syncCities();
  await syncCategories();
//   await syncFormats();
  // await syncDistricts();
  // await syncNeighborhoods();
//   await syncVenues();
//   await syncEvents();

  // Daha sonra 4 saatte bir senkronizasyon yap
  setInterval(syncEvents, 4 * 60 * 60 * 1000);
  setInterval(syncVenues, 24 * 60 * 60 * 1000);
};

const syncEvents = async () => {
  const pageSize = 300;
  const delayBetweenRequests = 5000;

  try {
    let skip = 0;
    let totalCount = 0;

    do {
      // Veriyi çek
      const { data } = await axiosInstance.get(
        `/events?take=${pageSize}&skip=${skip}`
      );
      const eventsData = data.items;

      if (eventsData && eventsData.length > 0) {
        // ID'leri olan ve olmayan etkinlikleri ayır
        const eventsWithId = [];
        const eventsWithoutId = [];

        for (const eventItem of eventsData) {
          if (eventItem.id) {
            eventsWithId.push(eventItem);
          } else {
            eventsWithoutId.push(eventItem);
          }
        }

        // ID'leri olan etkinlikleri kontrol et ve varsa eklenmesin
        if (eventsWithId.length > 0) {
          for (const eventWithId of eventsWithId) {
            const existingEvent = await Events.findOne({ id: eventWithId.id });

            if (!existingEvent) {
              await Events.create(eventWithId);
              console.log(`Yeni etkinlik eklendi: ${eventWithId.id}`);
            } else {
              console.log(`Etkinlik zaten var: ${eventWithId.id}`);
            }
          }
        }

        // ID'si olmayan etkinlikleri toplu olarak ekle
        if (eventsWithoutId.length > 0) {
          await Events.insertMany(eventsWithoutId);
          console.log(
            `${skip}'inci veriden sonraki ${pageSize} veri senkronizasyonu yapıldı.`
          );
        }
      }

      // Toplam sayıyı ve geçen süreyi güncelle
      totalCount = data?.meta?.total_count;
      skip += pageSize;

      // End tarihi geçen etkinlikleri sil
      const currentDate = new Date();
      currentDate.setHours(currentDate.getHours() + 3);
      console.log(currentDate);
      await Events.deleteMany({ end: { $lt: currentDate } });

      console.log("Veri senkronizasyonu başarıyla tamamlandı.");

      // Belirtilen süre kadar bekle
      await new Promise((resolve) => setTimeout(resolve, delayBetweenRequests));
    } while (skip < totalCount);
  } catch (error) {
    console.error("Veri senkronizasyonu hatası:", error.message);
  }
};

const syncVenues = async () => {
  const pageSize = 300;
  const delayBetweenRequests = 5000;

  try {
    let skip = 0;
    let totalCount = 0;

    do {
      // Veriyi çek
      const { data } = await axiosInstance.get(
        `/venues?take=${pageSize}&skip=${skip}`
      );
      const venuesData = data.items;

      if (venuesData && venuesData.length > 0) {
        // ID'leri olan ve olmayan etkinlikleri ayır
        const venuesWithId = [];
        const venuesWithoutId = [];

        for (const venueItem of venuesData) {
          if (venueItem.id) {
            venuesWithId.push(venueItem);
          } else {
            venuesWithoutId.push(venueItem);
          }
        }

        // ID'leri olan etkinlikleri kontrol et ve varsa eklenmesin
        if (venuesWithId.length > 0) {
          for (const venueWithId of venuesWithId) {
            const existingEvent = await Venues.findOne({ id: venueWithId.id });

            if (!existingEvent) {
              await Venues.create(venueWithId);
              console.log(`Yeni mekan eklendi: ${venueWithId.id}`);
            } else {
              console.log(`Mekan zaten var: ${venueWithId.id}`);
            }
          }
        }

        // ID'si olmayan etkinlikleri toplu olarak ekle
        if (venuesWithoutId.length > 0) {
          await Venues.insertMany(venuesWithoutId);
          console.log("ID olmayan Mekanlar toplu olarak eklendi.");
        }
      }

      // Toplam sayıyı ve geçen süreyi güncelle
      totalCount = data?.meta?.total_count;
      skip += pageSize;

      console.log(
        `${skip}'inci veriden sonraki ${pageSize} veri senkronizasyonu yapıldı.`
      );
      await new Promise((resolve) => setTimeout(resolve, delayBetweenRequests));
    } while (skip < totalCount);
  } catch (error) {
    console.error("Mekan senkronizasyonu hatası:", error.message);
  }
};

const syncCities = async () => {
  try {
    const { data } = await axiosInstance.get("/cities");

    if (data && data.length > 0) {
      // ID'leri olan ve olmayan etkinlikleri ayır
      const citiesWithId = [];
      const citiesWithoutId = [];

      for (const cityItem of data) {
        if (cityItem.id) {
          citiesWithId.push(cityItem);
        } else {
          citiesWithoutId.push(cityItem);
        }
      }

      // ID'leri olan etkinlikleri kontrol et ve varsa eklenmesin
      if (citiesWithId.length > 0) {
        for (const cityWithId of citiesWithId) {
          const existingEvent = await Cities.findOne({ id: cityWithId.id });

          if (!existingEvent) {
            await Cities.create(cityWithId);
            console.log(`Yeni şehir eklendi: ${cityWithId.id}`);
          } else {
            console.log(`Şehir zaten var: ${cityWithId.id}`);
          }
        }
      }

      // ID'si olmayan etkinlikleri toplu olarak ekle
      if (citiesWithoutId.length > 0) {
        await Cities.insertMany(citiesWithoutId);
        console.log("ID olmayan şehirler toplu olarak eklendi.");
      }
    }
  } catch (error) {
    console.error("Şehir senkronizasyonu hatası:", error.message);
  }
};

const syncDistricts = async () => {
  try {
    const cities = await Cities.find()

    for (var i in cities) {
        const cityId = cities[i].id;
        const objectId = cities[i]._id;
      const { data } = await axiosInstance.get(
        `/cities/${cityId}/districts`
      );
      if (data && data.length > 0) {
        const districtsWithId = [];
        const districtsWithoutId = [];

        for (const districtItem of data) {
          if (districtItem.id) {
            districtsWithId.push(districtItem);
          } else {
            districtsWithoutId.push(districtItem);
          }
        }

        if (districtsWithId.length > 0) {
          for (const districtWithId of districtsWithId) {
            const existingDistrict = await Districts.findOne({
              id: districtWithId.id,
            });

            if (!existingDistrict) {
              await Districts.create({...districtWithId, city_id: objectId });
              console.log(districtWithId)
              console.log(`Yeni ilçe eklendi: ${districtWithId.id}`);
            } else {
              console.log(`İlçe zaten var: ${districtWithId.id}`);
            }
          }
        }

        if (districtsWithoutId.length > 0) {
          await Districts.insertMany(districtsWithoutId);
          console.log("ID olmayan kategoriler toplu olarak eklendi.");
        }
      }
    }
  } catch (error) {
    console.error("İlçe senkronizasyonu hatası:", error.message);
  }
};

const syncNeighborhoods = async () => {
  try {
    const districts = await Districts.find();

    for (var i in districts) {
        const districtId = districts[i].id;
        const objectId = districts[i]._id;
      const { data } = await axiosInstance.get(
        `/districts/${districtId}/neighborhoods`
      );
      if (data && data.length > 0) {
        const neighborhoodsWithId = [];
        const neighborhoodsWithoutId = [];

        for (const districtItem of data) {
          if (districtItem.id) {
            neighborhoodsWithId.push(districtItem);
          } else {
            neighborhoodsWithoutId.push(districtItem);
          }
        }

        if (neighborhoodsWithId.length > 0) {
          for (const districtWithId of neighborhoodsWithId) {
            const existingDistrict = await Neighborhoods.findOne({
              id: districtWithId.id,
            });

            if (!existingDistrict) {
              await Neighborhoods.create({...districtWithId, district_id: objectId });
              console.log(districtWithId)
              console.log(`Yeni ilçe eklendi: ${districtWithId.id}`);
            } else {
              console.log(`İlçe zaten var: ${districtWithId.id}`);
            }
          }
        }

        if (neighborhoodsWithoutId.length > 0) {
          await Neighborhoods.insertMany(neighborhoodsWithoutId);
          console.log("ID olmayan kategoriler toplu olarak eklendi.");
        }
      }
    }
  } catch (error) {
    console.error("İlçe senkronizasyonu hatası:", error.message);
  }
};

const syncCategories = async () => {
  try {
    const { data } = await axiosInstance.get("/categories");

    if (data && data.length > 0) {
      // ID'leri olan ve olmayan etkinlikleri ayır
      const categoriesWithId = [];
      const categoriesWithoutId = [];

      for (const categoryItem of data) {
        if (categoryItem.id) {
          categoriesWithId.push(categoryItem);
        } else {
          categoriesWithoutId.push(categoryItem);
        }
      }

      // ID'leri olan etkinlikleri kontrol et ve varsa eklenmesin
      if (categoriesWithId.length > 0) {
        for (const categoryWithId of categoriesWithId) {
          const existingEvent = await Categories.findOne({
            id: categoryWithId.id,
          });

          if (!existingEvent) {
            await Categories.create(categoryWithId);
            console.log(`Yeni kategori eklendi: ${categoryWithId.id}`);
          } else {
            console.log(`Kategori zaten var: ${categoryWithId.id}`);
          }
        }
      }

      // ID'si olmayan etkinlikleri toplu olarak ekle
      if (categoriesWithoutId.length > 0) {
        await Categories.insertMany(categoriesWithoutId);
        console.log("ID olmayan kategoriler toplu olarak eklendi.");
      }
    }
  } catch (error) {
    console.error("Kategori senkronizasyonu hatası:", error.message);
  }
};



const syncFormats = async () => {
  try {
    const { data } = await axiosInstance.get("/formats");
    if (data && data.length > 0) {
      // ID'leri olan ve olmayan etkinlikleri ayır
      const formatsWithId = [];
      const formatsWithoutId = [];

      for (const formatItem of data) {
        if (formatItem.id) {
          formatsWithId.push(formatItem);
        } else {
          formatsWithoutId.push(formatItem);
        }
      }

      // ID'leri olan etkinlikleri kontrol et ve varsa eklenmesin
      if (formatsWithId.length > 0) {
        for (const formatWithId of formatsWithId) {
          const existingEvent = await Categories.findOne({
            id: formatWithId.id,
          });

          if (!existingEvent) {
            await Formats.create(formatWithId);
            console.log(`Yeni tür eklendi: ${formatWithId.id}`);
          } else {
            console.log(`Tür zaten var: ${formatWithId.id}`);
          }
        }
      }

      // ID'si olmayan etkinlikleri toplu olarak ekle
      if (formatsWithoutId.length > 0) {
        await Formats.insertMany(formatsWithoutId);
        console.log("ID olmayan kategoriler toplu olarak eklendi.");
      }
    }
  } catch (error) {
    console.error("Tür senkronizasyonu hatası:", error.message);
  }
};
