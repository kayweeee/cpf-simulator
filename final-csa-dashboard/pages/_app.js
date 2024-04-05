import "tailwindcss/tailwind.css";
// components
import Header from "../components/Layouts/Header";
import Footer from "../components/Layouts/Footer";

export default function App({ Component, pageProps }) {
  return (
    <div>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}
