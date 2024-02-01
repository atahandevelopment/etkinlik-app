import { useForm, Controller } from "react-hook-form";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import { Select, TextField } from "@mui/material";
import { IoCloseSharp } from "react-icons/io5";
import { useContext, useEffect } from "react";
import { UpdateCategory, addCategoryService } from "@/services/categories";
import { errorToastMessage, succesToastMessage } from "@/components/toastify";
import MenuItem from "@mui/material/MenuItem";
import CategoryContext from "../contexts/CategoryContext";

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

export default function AddAndEditCategory(props) {
  const {
    open,
    allCategories,
    setCategories,
    selectedTab,
    existingData,
    handleClose} = useContext(CategoryContext);
  const { control, setValue, handleSubmit } = useForm();
  useEffect(() => {
    setValue("label", existingData?.label);
    setValue("parent", existingData?.parent?._id);
  }, [setValue, existingData]);

  const onSubmit = async (data) => {
    try {
      if (selectedTab === "add") {
        const response = await addCategoryService(data);
        if (response.status === 201) {
          succesToastMessage("Kategori eklendi", 1500, "top-right");
          setCategories(response?.data?.data);
          handleClose();
        }
      } else {
        const response = await UpdateCategory(existingData?._id, data);
        if (response.status === 200) {
          succesToastMessage(
            `${existingData?.label} isimli kategori güncellendi.`,
            1500,
            "top-right"
          );
          const filteredItems = allCategories.filter(
            (f) => f._id !== existingData?._id
          );
          const updatedItems = [...filteredItems, response?.data?.data];
          setCategories(updatedItems);
          handleClose();
        }
      }
    } catch (error) {
      errorToastMessage("Bir hata ile karşılaşıldı", 1500, "top-right");
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
          <Box className="max-sm:w-11/12" sx={style}>
            <div className="w-full h-5 flex flex-wrap justify-between text-lg items-center">
              <label>Banner {selectedTab === "add" ? "Ekle" : "Düzenle"}</label>
              <button onClick={handleClose}>
                <IoCloseSharp />
              </button>
            </div>
            <hr className="my-2" />
            <form
              className="mt-2 flex flex-col items-center"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex w-10/12 max-sm:flex-col h-auto justify-center items-center mt-4 gap-5">
                <Controller
                  name="label"
                  control={control}
                  defaultValue={existingData?.label}
                  render={({ field }) => {
                    return (
                      <TextField
                        required
                        label="Kategori Adı"
                        type="text"
                        {...field}
                      />
                    );
                  }}
                />
                <Controller
                  name="parent"
                  control={control}
                  defaultValue={existingData?.parent || 'seciniz'}
                  render={({ field }) => {
                    return (
                      <Select
                        labelId="category-parent"
                        id="parent-select"
                        {...field}
                      >
                        <MenuItem value="seciniz">Seçiniz</MenuItem>
                        {allCategories && allCategories.length > 0 ? (
                          allCategories.map((c, index) => {
                            return (
                              <MenuItem key={index} value={c?._id}>
                                {c.label}
                              </MenuItem>
                            );
                          })
                        ) : (
                          <></>
                        )}
                      </Select>
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
                  {selectedTab === "add" ? "Kaydet" : "Güncelle"}
                </Button>
              </div>
            </form>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
