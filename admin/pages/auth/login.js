import { useState } from "react";
import { signIn } from "next-auth/react";
import { TextField } from "@mui/material";
import BlankLayout from "@/components/layouts/BlankLayout";
import Link from "next/link";
import { succesToastMessage, errorToastMessage } from "@/components/toastify";
import { useRouter } from "next/router";
import Image from "next/image";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { getTitle } from "@/store/meta-title";

function Login() {
  const dispatch = useDispatch();
  dispatch(getTitle('Admin Giriş'));
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await signIn("credentials", {
      redirect: false,
      ...credentials,
    });

    if (!error) {
      await succesToastMessage("Başarılı giriş!");
      await router.push("/");
    } else {
      errorToastMessage(`Giriş hatası: ${error}`);
    }
  };

  return (
    <div className="login-page">
      <motion.form
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1}}
        className="login-form"
        onSubmit={handleSubmit}
      >
        <Image
          src="/assets/images/dreamtelecom.png"
          alt="dreamtelecom"
          width={150}
          height={50}
        />
        <TextField
          required
          label="E-mail"
          type="text"
          value={credentials.email}
          onChange={(e) =>
            setCredentials({ ...credentials, email: e.target.value })
          }
        />
        <TextField
          type="password"
          required
          label="Şifre"
          value={credentials.password}
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
        />
        <div className="w-8/12 h-4 flex justify-around text-sm items-center font-semibold text-blue-700">
          <span className="text-blue-400">
            <Link href="/auth/forget-password">Şifremi Unuttum</Link>
          </span>
          <span>
            <Link href="/auth/register">Hesabım Yok</Link>
          </span>
        </div>
        <div className="w-full flex justify-center">
          <button className="button-info w-7/12" type="submit">
            Giriş Yap
          </button>
        </div>
      </motion.form>
    </div>
  );
}

Login.getLayout = (page) => {
  return <BlankLayout>{page}</BlankLayout>;
};

export default Login;
