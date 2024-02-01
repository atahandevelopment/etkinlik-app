// layouts/AuthLayout.js
import Layout from "@/App";
import React from "react";

export default function BlankLayout({ children }) {

    return (
      <Layout className="container">
        <div className="container-fluid">{children}</div>
      </Layout>
    );  
};

