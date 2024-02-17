import { useState } from "react";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import Swal from "sweetalert2";
import { errorToastMessage, succesToastMessage } from "@/components/toastify";
import { GetMessages, UpdateMessage } from "@/services/messages";
import MessageTable from "./components/MessageTable";
import MessageView from "./components/MessageView";
import { useDispatch } from "react-redux";
import { getTitle } from "@/store/meta-title";

export const getServerSideProps = async () => {
  let messages = [];
  const response = await GetMessages();
  if (response.status === 200) {
    messages = response.data.data;
  }

  return {
    props: {
      messages,
    },
  };
};

export default function Mesajlar(props) {
  const dispatch = useDispatch();
  dispatch(getTitle("Müşteri Mesajları"));
  const [messages, setMessages] = useState(
    props.messages ? props.messages : []
  );
  const [existingData, setExistingData] = useState(null);
  const [open, setOpen] = useState(false);
  const handleOpen = async () => {
    setOpen(true);
    try {
      if (existingData !== null && !existingData?.is_read) {
        const res = await UpdateMessage(existingData?._id, { is_read: true });
        if (res.status === 200) {
          const getAllMessages = await GetMessages();
          if (getAllMessages.status === 200) {
            setMessages(getAllMessages?.data?.data);
          }
        }
      }
    } catch (error) {
      errorToastMessage("Bir hata ile karşılaşıldı", 1500, "top-right");
    }
  };
  const handleClose = () => setOpen(false);

  return (
    <>
      <MessageView
        handleClose={handleClose}
        open={open}
        existingData={existingData}
      />
      <div className="w-full h-full m-1 p-1">
        <MessageTable
          messages={messages}
          setExistingData={setExistingData}
          handleOpen={handleOpen}
        />
      </div>
    </>
  );
}

Mesajlar.getLayout = (page) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};
