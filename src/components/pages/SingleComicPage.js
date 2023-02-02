import { useParams, Link } from "react-router-dom";

import "./singleComic.scss";
import useMarvelService from "../../services/MarvelService";
import { useEffect, useState } from "react";
import ErrorMassage from "../errorMassage/ErrorMassage";
import Spinner from "../spinner/Spinner";

const SingleComicPage = () => {
  const [comics, setComics] = useState({});
  const { comicId } = useParams();

  const { loading, error, getComics, clearError } = useMarvelService();

  useEffect(() => {
    updateComics();
  }, [comicId]);

  const updateComics = () => {
    clearError();
    getComics(comicId).then(onComicsLoaded);
  };

  const onComicsLoaded = (comics) => {
    setComics(comics);
  };
  console.log(comicId);

  const errorMassage = error ? <ErrorMassage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error) ? <View comics={comics} /> : null;

  return (
    <div className="single-comic">
      {errorMassage}
      {spinner}
      {content}
    </div>
  );
};

const View = ({ comics }) => {
  const { description, pageCount, prices, thumbnail, title, language } = comics;
  return (
    <>
      <img src={thumbnail} alt={title} className="single-comic__img" />
      <div className="single-comic__info">
        <h2 className="single-comic__name">{title}</h2>
        <p className="single-comic__descr">{description}</p>
        <p className="single-comic__descr">{pageCount}</p>
        <p className="single-comic__descr">{language}</p>
        <div className="single-comic__price">{prices}</div>
      </div>
      <Link to="/comics" className="single-comic__back">
        Back to all
      </Link>
    </>
  );
};

export default SingleComicPage;
