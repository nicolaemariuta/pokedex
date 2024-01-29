import { Intro, SearchBar, Pokedex } from "./components";


export default async function Home() {

  return (
    <main className="overflow-hidden">
      <Intro />

      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Pokedex</h1>
          <p>Find and catch the pokemons you might like</p>
        </div>

       <div className="home__filters">
        <SearchBar />
       </div>

       <Pokedex />

      </div>
    </main>
  );
}
