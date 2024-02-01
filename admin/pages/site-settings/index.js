import DefaultLayout from "@/components/layouts/DefaultLayout";
import { getSiteSettings } from "@/services/site-settings";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export const getServerSideProps = async () => {
  let siteSettings = [];
  const settings = await getSiteSettings();
  if (settings.status === 200) {
    siteSettings = settings.data;
  }
  return {
    props: {
      siteSettings,
    },
  };
};
export default function SiteSettings(props) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [siteSettings, setSiteSettings] = useState(
    props.siteSettings ? props.siteSettings.data[0] : []
  );
  console.log(siteSettings);

  useEffect(() => {
    setValue("instagram", siteSettings.instagram);
    setValue("facebook", siteSettings.facebook);
    setValue("twitter", siteSettings.twitter);
    setValue("phone", siteSettings.phone);
    setValue("email", siteSettings.email);
    setValue("address", siteSettings.tax_informations.address);
    setValue("district", siteSettings.tax_informations.district);
    setValue("city", siteSettings.tax_informations.city);
    setValue("tax_administration", siteSettings.tax_informations.tax_administration);
    setValue("tax_no", siteSettings.tax_informations.tax_no);


  }, [siteSettings, setValue]);

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <>
      <div className="header">
        <h1>Site Ayarları</h1>
      </div>
      <div className="w-full h-full">
        <form onSubmit={handleSubmit(onSubmit)} className="site-settings-form">
          <div className="w-11/12 m-2 gap-6 flex flex-row justify-between items-start">
            <div className=" w-1/4 mb-6 flex  flex-col justify-center">
              <label
                for="X"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                X
              </label>
              <input
                type="text"
                id="x"
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Site Adı"
                {...register("twitter")}
              />
            </div>
            <div className="w-1/4 mb-6 flex flex-col justify-center">
              <label
                for="instagram"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Instagram
              </label>
              <input
                type="text"
                id="instagram"
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Instagram"
                {...register("instagram")}
              />
            </div>
            <div className="w-1/4 mb-6 flex flex-col justify-center">
              <label
                for="facebook"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Facebook
              </label>
              <input
                type="text"
                id="facebook"
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Facebook"
                {...register("facebook")}
              />
            </div>
            <div className="w-1/4 mb-6 flex flex-col justify-center">
              <label
                for="phone"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Telefon
              </label>
              <input
                type="text"
                id="phone"
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Telefon"
                {...register("phone")}
              />
            </div>
          </div>
          <div className="header">
            <h1>Şirket Mailleri</h1>
          </div>
          <div className="w-11/12 m-2 gap-6 flex flex-row justify-between items-start">
            {siteSettings &&
            siteSettings.company_mails &&
            siteSettings.company_mails.length > 0 ? (
              siteSettings.company_mails.map((mail, index) => {
                return (
                  <div
                    key={index}
                    className=" w-1/4 mb-6 flex  flex-col justify-center"
                  >
                    <label
                      for="X"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      {mail?.title}
                    </label>
                    <input
                      type="text"
                      id="x"
                      className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Site Adı"
                      {...register(mail?.email)}
                    />
                  </div>
                );
              })
            ) : (
              <></>
            )}
          </div>
          <div className="header">
            <h1>Şirket Bilgileri</h1>
          </div>
          <div className="w-11/12 m-2 gap-6 flex flex-row justify-between items-start">
            <div className=" w-1/5 mb-6 flex  flex-col justify-center">
              <label
                for="X"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Açık Adres
              </label>
              <input
                type="text"
                id="x"
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Açık Adres"
                {...register("address")}
              />
            </div>
            <div className="w-1/5 mb-6 flex flex-col justify-center">
              <label
                for="instagram"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Şehir
              </label>
              <input
                type="text"
                id="instagram"
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Instagram"
                {...register("city")}
              />
            </div>
            <div className="w-1/5 mb-6 flex flex-col justify-center">
              <label
                for="facebook"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                İlçe
              </label>
              <input
                type="text"
                id="facebook"
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="İlçe"
                {...register("district")}
              />
            </div>
            <div className="w-1/5 mb-6 flex flex-col justify-center">
              <label
                for="phone"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Vergi Dairesi
              </label>
              <input
                type="text"
                id="phone"
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Telefon"
                {...register("tax_administration")}
              />
            </div>
            <div className="w-1/5 mb-6 flex flex-col justify-center">
              <label
                for="phone"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Vergi Numarası
              </label>
              <input
                type="text"
                id="phone"
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Vergi No"
                {...register("tax_no")}
              />
            </div>
          </div>
          <div className="w-11/12 h-10 flex justify-end items-center">
            <button className="button-info">Kaydet</button>
          </div>
        </form>
      </div>
    </>
  );
}

SiteSettings.getLayout = (page) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};
