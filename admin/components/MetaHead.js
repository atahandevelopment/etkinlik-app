import Head from "next/head"

export default function MetaHead({ title }) {
    return (
        <Head>
            <title>{title} | Dream Telecom</title>
        </Head>
    )
}