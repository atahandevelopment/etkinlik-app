import MetaHead from "@/components/MetaHead";
import { GetAllProductsService, UpdateProductById } from "@/services/products";
import { useState, useEffect } from "react";
import { Button, Input, TextField } from "@mui/material";
import { errorToastMessage, succesToastMessage } from "@/components/toastify";
import { TiTick } from "react-icons/ti";
import { useForm } from "react-hook-form";
import { RxHamburgerMenu } from "react-icons/rx";
import MobileSidebar from "@/components/MobileSidebar";

export async function getServerSideProps(context) {
  let productData = "";
  const productId = context.query.id;
  const res = await GetAllProductsService(productId);
  if (res.status === 200) {
    productData = res.data.data;
  }
  return {
    props: {
      productId,
      productData,
    },
  };
}

export default function ProductDetail(props) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [productInfo, setProductInfo] = useState(props.productData[0]);
  const [imageGallery, setImageGallery] = useState(productInfo.gallery || []);
  const [selectedImage, setSelectedImage] = useState("");
  const [onHover, setOnHover] = useState(null);
  const { setValue, register, handleSubmit } = useForm();

  // Kapak Fotoğrafı Ayarlama işlevi
  const updateProductImage = (imageId) => {
    UpdateProductById(props.productId, {
      image: imageId,
    })
      .then((res) => {
        succesToastMessage("Kapak Fotoğrafı güncellendi", 1500, "top-right");
        setSelectedImage(imageId);
      })
      .catch((err) => {
        errorToastMessage("İşlem sırasında hata oluştu", 1500, "top-right");
      });
  };

  const handleMainPage = async (check) => {
    UpdateProductById(props.productId, {
      in_mainpage: check,
    })
      .then((res) => {
        if (res.data.data.in_mainpage) {
          succesToastMessage(
            "Ürün anasayfada gösterilecekler arasına eklendi",
            1500,
            "top-right"
          );
        } else {
          succesToastMessage(
            "Ürün anasayfada gösterilecekler arasından çıkarıldı",
            1500,
            "top-right"
          );
        }
      })
      .catch((err) => {
        errorToastMessage("İşlem sırasında hata oluştu", 1500, "top-right");
      });
  };

  const onUpdate = async (data) => {
    console.log(data);
  };

  return (
    <div className="max-sm:flex max-sm:flex-wrap max-sm:justify-center">
      <MetaHead title={productInfo?.title} />
      {mobileSidebarOpen ? (
        <div className="w-full flex justify-start items-start">
          <MobileSidebar mobileSidebarOpen={mobileSidebarOpen} setMobileSidebarOpen={setMobileSidebarOpen} />
        </div>
      ) : (
        <></>
      )}
      <div className="w-11/12 h-10 lg:hidden flex justify-start items-center">
        <RxHamburgerMenu
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className={`text-black font-semibold size-5`}
        />
      </div>
      <div className="header">
        <h1>{productInfo?.title}</h1>
      </div>
      <div className="w-full h-auto max-sm:w-11/12 max-sm:flex max-sm:flex-wrap">
        <div className="w-full h-30 flex flex-wrap justify-start items-center max-sm:justify-center gap-5">
          {imageGallery ? (
            imageGallery.map((item, index) => {
              return (
                <div
                  className="w-20 h-20"
                  onMouseEnter={(e) => setOnHover(item._id)}
                  key={index}
                >
                  {productInfo.image._id === item._id ? (
                    <TiTick className="kapak" />
                  ) : (
                    <></>
                  )}
                  <img
                    src={item?.url}
                    className={`w-full h-full rounded-lg  shadow-md`}
                    alt=""
                  />
                  {onHover === item._id &&
                  onHover !== productInfo.image?._id ? (
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      className="hover:bg-blue-600 hover:text-white shadow-md mt-2"
                      sx={{
                        textTransform: "none",
                        fontSize: "0.5rem",
                        position: "relative",
                        bottom: "30px",
                      }}
                      fullWidth={true}
                      onClick={() => {
                        updateProductImage(item?._id);
                      }}
                    >
                      Kapak Yap
                    </Button>
                  ) : (
                    <></>
                  )}
                </div>
              );
            })
          ) : (
            <></>
          )}
        </div>
        <form
          className="w-full flex flex-col h-auto mt-6"
          onSubmit={handleSubmit(onUpdate)}
        >
          <div className="flex justify-start items-center gap-2 mb-3">
            <input
              type="checkbox"
              defaultChecked={true}
              onChange={(e) => {
                if (e.target.checked) {
                  handleMainPage(true);
                } else {
                  handleMainPage(false);
                }
              }}
            />
            <label className="text-sm">Anasayfada Göster</label>
          </div>
          <div className="flex justify-between gap-2 mb-3">
            <TextField
              type="text"
              label="Ürün Adı"
              defaultValue={productInfo?.title}
              {...register("title", { required: true })}
            />
            <TextField
              type="text"
              label="Açıklama"
              defaultValue={productInfo?.description}
              {...register("description", { required: true })}
            />
          </div>
          <div className="flex justify-between gap-2 mb-3">
            <TextField
              type="text"
              label="Ürün Adı"
              defaultValue={productInfo?.title}
              {...register("title", { required: true })}
            />
            <TextField
              type="text"
              label="Açıklama"
              defaultValue={productInfo?.description}
              {...register("description", { required: true })}
            />
          </div>
          <div className="flex justify-between gap-2 mb-3">
            <TextField
              type="text"
              label="Ürün Adı"
              defaultValue={productInfo?.title}
              {...register("title", { required: true })}
            />
            <TextField
              type="text"
              label="Açıklama"
              defaultValue={productInfo?.description}
              {...register("description", { required: true })}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
