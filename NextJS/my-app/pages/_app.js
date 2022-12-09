import Link from "next/link";
function MyApp({ Component, pageProps }) {
  return (
    <>
      <nav>
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/product">Product</Link>
      </nav>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
