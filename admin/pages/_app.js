import DefaultLayout from "@/components/layouts/DefaultLayout";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import 'react-toastify/dist/ReactToastify.css';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const getLayout = Component.getLayout ?? ((page) => <DefaultLayout>{page}</DefaultLayout>);
  return (
    <SessionProvider session={session}>
          {getLayout(<Component {...pageProps} />)}
    </SessionProvider>
  );
}
