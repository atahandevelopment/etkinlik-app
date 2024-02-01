import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { IoCloseSharp } from "react-icons/io5";
import { motion } from "framer-motion";

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

export default function MessageView(props) {
  const { handleClose, existingData, open } = props;

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
              <label>{existingData?.fullname}</label>
              <button onClick={handleClose}>
                <IoCloseSharp />
              </button>
            </div>
            <hr className="my-2" />
            <motion.div
              inital={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="w-full max-h-[500px] overflow-x-auto flex flex-col gap-2"
            >
              <label className="font-semibold">{existingData?.title}</label>
              <p className="w-full flex flex-wrap">{existingData?.message}</p>
            </motion.div>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
