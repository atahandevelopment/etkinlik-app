import Login from "@/pages/auth/login";
import { useSession } from "next-auth/react";
import Sidebar from "./Sidebar";
import Layout from "@/App";

export default function DefaultLayout({ children }) {
  const { data: session } = useSession();

  if (!session) {
    return (
      <>       
      <Login />
      </>
    );
  }
  return (
    <Layout className="container">
      <div className="container-fluid">
        <Sidebar />
        <div className="panel">{children}</div>
      </div>
    </Layout>
  );
}
