import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import { styled } from '@mui/material/styles';
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import { Input, TextField } from "@mui/material";
import { useState } from "react";
import { IoCloseSharp, IoCloudUploadSharp } from "react-icons/io5";
import { NewProductService } from "@/services/products";

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
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

export default function NewProductForm(props) {
  const { open, setOpen, handleClose } = props;
  const [files, setFiles] = useState(null);
  const [metaTags, setMetaTags] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    url: "",
    brand: "",
    price: "",
    meta_tags: metaTags,
    stock: "",
    category: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('brand', formData.brand);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('stock', formData.stock);
  
      // Append each file to the FormData
      if (files) {
        for (let i = 0; i < files.length; i++) {
          formDataToSend.append('filename', files[i]);
        }
      }
  
      // Send the formData to your server
      const response = await NewProductService(formDataToSend);
      console.log(response.data);
  
      // Close the modal or perform other actions based on the response
    //   handleClose();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
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
              <label>Ürün Ekleme</label>
              <button onClick={handleClose}>
                <IoCloseSharp />
              </button>
            </div>
            <hr className="my-2" />
            <form className="mt-2 flex flex-col items-center" onSubmit={handleSubmit}>
              <div className="w-full flex justify-center">
                <Button
                  component="label"
                  variant="contained"
                  onChange={(e) => setFiles(e.target.files)}
                  sx={{ textTransform: "none"}}
                  className="bg-blue-600 text-white"
                  startIcon={<IoCloudUploadSharp />}
                >
                  Fotoğraf Yükle
                  <VisuallyHiddenInput multiple type="file" />
                </Button>
              </div>
              <div className="flex w-10/12 h-auto justify-center items-center mt-4 gap-5">
                <TextField
                  required
                  label="Ürün Adı"
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
                <TextField
                  required
                  label="Ürün Açıklaması"
                  type="text"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </div>
              <div className="flex w-10/12 h-auto justify-center items-center mt-4 gap-5">
                <TextField
                  required
                  label="Ürün Markası"
                  type="text"
                  value={formData.brand}
                  onChange={(e) =>
                    setFormData({ ...formData, brand: e.target.value })
                  }
                />
                <TextField
                  label="Fiyat"
                  type="number"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                />
              </div>
              <div className="flex w-10/12 h-auto justify-between items-center mt-4 gap-5">
                <TextField
                  required
                  label="Kategori"
                  type="text"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                />
                <TextField
                  label="Stok"
                  type="text"
                  value={formData.stock}
                  onChange={(e) =>
                    setFormData({ ...formData, stock: e.target.value })
                  }
                />
              </div>
              <div className="flex w-10/12 h-auto justify-between items-center mt-4 gap-5">
                <TextField
                  label="Meta Etiketleri"
                  type="text"
                  className="w-full"
                  value={metaTags}
                  onChange={(e) =>
                    setMetaTags(e.target.value.split(","))
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
                  Kaydet
                </Button>
              </div>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
