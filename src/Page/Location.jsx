import React from "react";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Chosen from "../component/Chosen";
import { Background, Description, Image, Title } from "../component/Others";

const Location = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(false);
  const fetchData = async (id) => {
    const response = await fetch(`https://pokeapi.co/api/v2/location-area/${id}`);
    const data = await response.json();
    const pokeurl = data.pokemon_encounters.map((ele) => ele.pokemon.url);
    const pokemondata = pokeurl.map(async (url) => {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    });
    const Datapokemon = await Promise.all(pokemondata);
    setData(Datapokemon);
  };

  useEffect(() => {
    setLoading(true);

    try {
      fetchData(id);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }, [id]);
  console.log(data);
  const imagepoke = localStorage.getItem("imagepokesatu");
  const namepoke = localStorage.getItem("namepokesatu");
  const [poke, setPoke] = useState(namepoke);
  const [imagepokemon, setImagepokemon] = useState(imagepoke);

  if (data.length <= 0) return <h1>Loading...</h1>;
  // console.log(data.pokemon_encounters);

  return (
    <>
      <div className="flex mx-5 mt-3">
        <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
          <h1 className="text-gray-900 text-xl leading-tight font-medium mb-2">{data.name}</h1>
          <p className="text-gray-700 text-base mb-4">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <button
            type="button"
            className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
          >
            Button
          </button>
        </div>
      </div>
      <Chosen>
        <Title />
        <img alt={imagepoke} className="my-4 mx-auto h-64" src={imagepoke} />
        <Description>{namepoke}</Description>
      </Chosen>
      <div className="grid grid-cols-3 gap 4">
        {data.map((ele, index) => {
          const setClick = () => {
            setPoke(ele.name);
            setImagepokemon(ele.sprites.other.dream_world.front_default);
            localStorage.setItem("imagepokedua", poke);
            localStorage.setItem("namepokedua", imagepoke);
          };
          return (
            <div className="mx-5 mt-3" key={index}>
              <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
                <h1 className="text-gray-900 text-xl leading-tight font-medium mb-2">{ele.name}</h1>
                <Image pokemon={ele.sprites.other.dream_world.front_default} />
                <p className="text-gray-700 text-base mb-4">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <Link
                  to={"/login"}
                  type="button"
                  onClick={setClick}
                  className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                >
                  Pilih Pokemon
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
export default Location;
