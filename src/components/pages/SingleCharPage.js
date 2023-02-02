import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useMarvelService from "../../services/MarvelService";

const SingleCharPage = () => {
  const { charId } = useParams();
  const { getCharacters, clearError } = useMarvelService();
  const [char, setChar] = useState({});

  useEffect(() => {
    updateChar();
  }, [charId]);

  const updateChar = () => {
    clearError();
    getCharacters(charId).then(onComicsLoaded);
  };

  const onComicsLoaded = (char) => {
    setChar(char);
  };

  return (
    <div className="single-comic">
      <View char={char} />
    </div>
  );
};

const View = ({ char }) => {
  return (
    <>
      <img src={char.thumbnail} alt={char.name} className="single-comic__img" />
      <div className="single-comic__info">
        <h2 className="single-comic__name">{char.name}</h2>
        <p className="single-comic__descr">
          {char.description === "" ? "Description missing" : char.description}
        </p>
      </div>
    </>
  );
};
export default SingleCharPage;
