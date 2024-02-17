import DefaultLayout from "@/components/layouts/DefaultLayout";
import { getTitle } from "@/store/meta-title";
import { useDispatch } from "react-redux";
export default function Partners() {
  const dispatch = useDispatch();
  dispatch(getTitle("Çözüm Ortakları"));

  return (
    <>
      <div className="w-full h-full m-1 p-1">Sayfa Alanı</div>
    </>
  );
}

Partners.getLayout = (page) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};
