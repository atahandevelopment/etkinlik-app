import MetaHead from "@/components/MetaHead"
import DefaultLayout from "@/components/layouts/DefaultLayout"
export default function Partners () {
    const siteHead = "Çözüm Ortakları";
    return (
        <div>
            <MetaHead title={siteHead}/>
            <h1>Çözüm Ortakları</h1>
        </div>
    )
}

Partners.getLayout = (page) => {
    return <DefaultLayout>{page}</DefaultLayout>
  }