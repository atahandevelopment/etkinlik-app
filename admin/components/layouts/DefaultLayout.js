import Login from "@/pages/auth/login";
import { getSession, useSession } from "next-auth/react";
import Sidebar from "./Sidebar";
import { useSelector, useDispatch } from "react-redux";
import Layout from "@/App";
import MetaHead from "../MetaHead";
import MobileMenuOpen from "../MobileSidebarComponent";
import { useState } from "react";
import PanelHeader from "../PanelHeader";


export default function DefaultLayout({ children }) {
  const metaTitle = useSelector((state) => state.metaTitle.title);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
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
        <MetaHead title={metaTitle} />
        <Sidebar />
        <div className="panel">
          <MobileMenuOpen
            mobileSidebarOpen={mobileSidebarOpen}
            setMobileSidebarOpen={setMobileSidebarOpen}
          />
          <PanelHeader header={metaTitle} />
          {children}
        </div>
      </div>
    </Layout>
  );
}
