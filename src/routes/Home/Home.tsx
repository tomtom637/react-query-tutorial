import Navbar from "@/components/NavBar/NavBar";

export default function Home(): JSX.Element {
  return (
    <>
      <Navbar />
      <h1>Home</h1>
      <main>
        This is the home page, you'll find react-query examples through the
        different routes.
      </main>
    </>
  );
}
