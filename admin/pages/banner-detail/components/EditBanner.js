import { useForm, Controller } from "react-hook-form";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import { Checkbox, Select, TextField } from "@mui/material";
import { IoCloseSharp } from "react-icons/io5";
import { useContext, useEffect, useState } from "react";
import { errorToastMessage, succesToastMessage } from "@/components/toastify";
import { UpdateBannerInfo } from "@/services/banners";
import BannerContext from "../context/BannerContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
};

export default function EditBanner() {
  const { handleClose, open, existingData, setBannerInfo } =
    useContext(BannerContext);
  const { control, setValue, handleSubmit } = useForm();
  useEffect(() => {
    setValue("title", existingData?.title);
    setValue("description", existingData?.description);
    setValue("is_active", existingData?.is_active);
  }, [setValue, existingData]);

  const onSubmit = async (data) => {
    try {
      const response = await UpdateBannerInfo(existingData?._id, data);
      if (response.status === 200) {
        const newData = response?.data?.data;
        succesToastMessage("Banner bilgileri güncellendi", 1500, "top-right");
        setBannerInfo(newData);
        handleClose();
      }
    } catch (error) {
      errorToastMessage(
        "Banner güncellenirken bir hata oluştu",
        1500,
        "top-right"
      );
    }
  };
  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <div className="w-full h-5 flex justify-between text-lg items-center">
              <label>Düzenleme</label>
              <button onClick={handleClose}>
                <IoCloseSharp />
              </button>
            </div>
            <hr className="my-2" />
            <form
              className="mt-2 flex flex-col items-center"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex flex-col w-10/12 h-auto justify-center items-center mt-4 gap-3">
                <Controller
                  name="title"
                  control={control}
                  defaultValue={existingData?.title}
                  render={({ field }) => {
                    return (
                      <TextField
                        required
                        label="Banner Başlığı"
                        type="text"
                        {...field}
                      />
                    );
                  }}
                />
                <Controller
                  name="description"
                  control={control}
                  defaultValue={existingData?.description}
                  render={({ field }) => {
                    return (
                      <TextField
                        labelId="banner-description"
                        label="Banner Açıklama"
                        id="banner-description"
                        {...field}
                      />
                    );
                  }}
                />
                <Controller
                  name="is_active"
                  control={control}
                  defaultValue={existingData?.is_active}
                  render={({ field }) => {
                    return (
                      <Checkbox
                        labelId="avtive-select"
                        id="active-select"
                        onChange={field.onChange} // field.onChange kullanılmalı
                        checked={field.value}
                        {...field}
                      />
                    );
                  }}
                />
              </div>
              <div className="w-11/12 h-auto flex justify-end items-center gap-3 mt-3 me-3">
                <Button
                  variant="outlined"
                  color="error"
                  className="hover:bg-red-700 hover:text-white"
                  sx={{
                    textTransform: "none",
                  }}
                  onClick={handleClose}
                >
                  İptal
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  className="bg-blue-600 text-white"
                  type="submit"
                >
                  Güncelle
                </Button>
              </div>
            </form>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
