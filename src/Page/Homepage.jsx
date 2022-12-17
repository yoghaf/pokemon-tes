import Chosen from "../component/Chosen";
import PokemonList from "../component/PokemonList";
import { Title, Description, Background } from "../component/Others";
import { pokemon } from "../pokemon";
import { useEffect, useState } from "react";
import { Image } from "../component/Others";
import { Link } from "react-router-dom";

const Page = () => {
  const [stateImage, setStateImage] = useState(pokemon[0].sprites.other.dream_world.front_default);
  const [stateName, setStateName] = useState(pokemon[0].name);
  const [data, setData] = useState([]);
  const url = "https://pokeapi.co/api/v2/pokemon";

  const pokeFetch = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    const newdata = data.results.map((ele) => ele);
    const pokedataurl = newdata.map((ele) => ele.url);
    const pokemondata = pokedataurl.map(async (url) => {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    });
    const Datapokemon = await Promise.all(pokemondata);
    setData(Datapokemon);
  };
  useEffect(() => {
    pokeFetch(url);
  }, []);
  localStorage.setItem("imagepokesatu", stateImage);
  localStorage.setItem("namepokesatu", stateName);
  return (
    <>
      <Chosen>
        <Title />
        <img alt={pokemon[0].name} className="my-4 mx-auto h-64" src={stateImage} />
        <Description>{stateName}</Description>
      </Chosen>

      <PokemonList>
        {data.map((ele) => {
          const setClick = () => {
            setStateImage(ele.sprites.other.dream_world.front_default);
            setStateName(ele.name);
          };

          return (
            <Background key={ele.id}>
              <Description>{ele.name}</Description>
              <Image pokemon={ele.sprites.other.dream_world.front_default} />
              <Link
                className="bg-violet-500 text-white active:bg-violet-600 font-bold uppercase text-xs px-4 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                to={`/location/${ele.id}`}
              >
                <i className="fas fa-heart"></i> Pokemon Location
              </Link>
              <button className="rounded bg-indigo-500 text-white p-4 w-full" onClick={setClick}>
                Pilih pokemon
              </button>
            </Background>
          );
        })}
      </PokemonList>
    </>
  );
};
export default Page;
