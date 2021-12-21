import Head from "next/head";
import Header from './partials/Header'
import Footer from './partials/Footer'

export default function Layout({ children }) {
    return (
        <>
            <Head>
                <title>Ventes par région</title>
            </Head>
            <Header />
            <main>{children}</main>
            <Footer />
        </>
    )
}