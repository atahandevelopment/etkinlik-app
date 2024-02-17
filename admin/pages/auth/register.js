import BlankLayout from "@/components/layouts/BlankLayout";
import { useState } from "react";
import { TextField } from "@mui/material";
import Link from "next/link";
import { RegisterService } from "@/services/auth";
import { useRouter } from "next/router";
import { errorToastMessage, succesToastMessage } from "@/components/toastify";
import { motion } from "framer-motion";
import { getTitle } from "@/store/meta-title";
import { useDispatch } from "react-redux";

function Register() {
  const dispatch = useDispatch();
  dispatch(getTitle('Admin Kayıt'));
  const defaultReferansKod = "events-app-admin-secret";
  const [userData, setUserData] = useState({
    fullname: "",
    email: "",
    referans_kod: "",
    password: "",
    role: "admin",
  });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (userData.referans_kod !== defaultReferansKod) {
        errorToastMessage("Referans kodu hatalı");
        return;
      }
      const response = await RegisterService(userData);
      if (response.status === 201) {
        succesToastMessage(
          "Kayıt başarılı giriş sayfasına yönlendiriliyorsunuz"
        );
        setTimeout(() => {
          router.push("/auth/login");
        }, 1000);
      }
    } catch (error) {
      errorToastMessage("Sunucu hatası");
    }
  };
  return (
    <div className="login-page">
      <motion.form
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="login-form"
        onSubmit={handleSubmit}
      >
        <label className="text-2xl font-bold">Kullanıcı Kayıt</label>
        <TextField
          required
          label="Tam İsim"
          type="text"
          value={userData.fullname}
          onChange={(e) =>
            setUserData({ ...userData, fullname: e.target.value })
          }
        />
        <TextField
          required
          label="E-mail"
          type="text"
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
        />
        <TextField
          type="password"
          required
          label="Şifre"
          value={userData.password}
          onChange={(e) =>
            setUserData({ ...userData, password: e.target.value })
          }
        />
        <TextField
          type="referans_kod"
          required
          label="Referans Kodu"
          value={userData.referans_kod}
          onChange={(e) =>
            setUserData({ ...userData, referans_kod: e.target.value })
          }
        />
        <div className="w-8/12 h-4 flex justify-around text-sm items-center font-semibold text-blue-700">
          <span className="text-blue-400">
            <Link href="/auth/forget-password">Şifremi Unuttum</Link>
          </span>
          <span>
            <Link href="/auth/login">Hesabım Var</Link>
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

Register.getLayout = (page) => {
  return <BlankLayout>{page}</BlankLayout>;
};
export default Register;
