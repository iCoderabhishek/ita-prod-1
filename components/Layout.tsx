import React, { ReactNode } from "react";
import Head from "next/head";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  title = "Notice System",
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Notice Uploading System" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col min-h-screen bg-whitesmoke">
        <main className="flex-grow container mx-auto px-4 py-8">
          {children}
        </main>
        <ToastContainer position="bottom-right" />
      </div>
    </>
  );
};

export default Layout;
