export const Title = () => {
  return <h2 className="font-bold text-xl mb-2 text-center">Sang Terpilih</h2>;
};

export const Description = ({ children }) => {
  return <p className="font-bold text-xl mb-2 text-center">{children}</p>;
};
export const Button = ({ change }) => {
  return (
    <button onClick={change} className="rounded bg-indigo-500 text-white p-4 w-full">
      Pilih pokemon
    </button>
  );
};
export const Background = ({ children }) => {
  return <div className="max-w-sm rounded overflow-hidden shadow-lg p-4 ">{children}</div>;
};
export const Image = ({ pokemon }) => {
  return <img alt="pokemon" className="my-4 mx-auto h-32" src={pokemon} />;
};
