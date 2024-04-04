import "../styles/global.css";

// components
import Header from "../components/Layouts/Header";
import Footer from "../components/Layouts/Footer";

export default function App({ Component, pageProps }) {
  return (
    <div className="overflow-y-scroll overflow-x-clip scrollbar-hide">
      <Header />
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}
