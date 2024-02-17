import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { useState } from "react";
import { IoCloseSharp, IoCloudUploadSharp } from "react-icons/io5";
import { AddBanner, getBannersService } from "@/services/banners";
import { useContext } from "react";
import BannerManage from "../context/BannerManangeContext";
import { succesToastMessage } from "@/components/toastify";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

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

export default function AddAndEditBanner() {
  const { open, handleClose, selectedTab, setBannerList } =
    useContext(BannerManage);
  const [files, setFiles] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    url: "",
    category: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("url", formData.url);
      formDataToSend.append("category", formData.category);

      // Append each file to the FormData
      if (files) {
        formDataToSend.append("filename", files[0]);
      }

      // Send the formData to your server
      const response = await AddBanner(formDataToSend);
      if (response.status === 201) {
        const getBanners = await getBannersService();
        if (getBanners.status === 200) {
          succesToastMessage("Yeni Banner eklendi", 1500, "top-right");
          setBannerList(getBanners?.data?.data);
          handleClose();
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleDeleteImg = () => {
    setFiles(null);
  };

  return (
    <div>
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
              <label>Banner {selectedTab === "add" ? "Ekle" : "Düzenle"}</label>
              <button onClick={handleClose}>
                <IoCloseSharp />
              </button>
            </div>
            <hr className="my-2" />
            <form
              className="mt-2 flex flex-col items-center"
              onSubmit={handleSubmit}
            >
              <div className="w-full gap-2 flex justify-center">
                <Button
                  component="label"
                  variant="contained"
                  onChange={(e) => setFiles(e.target.files)}
                  sx={{ textTransform: "none" }}
                  className="bg-blue-600 text-white"
                  startIcon={<IoCloudUploadSharp />}
                >
                  Fotoğraf Yükle
                  <VisuallyHiddenInput type="file" />
                </Button>
                {files ? (
                  <div>
                    <img
                      src={URL?.createObjectURL(files[0])}
                      alt={files[0].name}
                      className="rounded-md shadow-md"
                      style={{ maxWidth: "100%", maxHeight: "200px" }}
                    />
                    <button
                      className="absolute z-10 top-16 p-1"
                      onClick={handleDeleteImg}
                    >
                      X
                    </button>
                  </div>
                ) : (
                  <></>
                )}
              </div>

              <div className="flex w-10/12 h-auto justify-center items-center mt-4 gap-5">
                <TextField
                  required
                  label="Başlık"
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
                <TextField
                  required
                  label="Açıklama"
                  type="text"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </div>
              <div className="flex w-10/12 h-auto justify-between items-center mt-4 gap-5">
                <TextField
                  label="Kategori"
                  type="text"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                />
                <TextField
                  required
                  label="Yönlendirme Linki"
                  type="text"
                  value={formData.url}
                  onChange={(e) =>
                    setFormData({ ...formData, url: e.target.value })
                  }
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
                  {selectedTab === "add" ? "Kaydet" : "Güncelle"}
                </Button>
              </div>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
