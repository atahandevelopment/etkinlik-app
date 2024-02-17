import { ToastContainer } from "react-toastify";

export default function Layout({ children }) {

  return (
    <div className="container">
      <ToastContainer />
      {children}
    </div>
  );
}
