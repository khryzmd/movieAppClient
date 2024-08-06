import Banner from "../components/Banner";

export default function Home() {
  const data = {
    title: "Movie App",
    content:
      "Explore a wide variety of movies with our comprehensive Movie App. Whether you’re in the mood for the latest blockbuster or an old classic, you can find it all here. Dive into the world of cinema and discover new favorites with ease!",
    destination: "/movies",
    buttonLabel: "Discover New Favorites",
  };

  return (
    <>
      <Banner data={data} />
    </>
  );
}
