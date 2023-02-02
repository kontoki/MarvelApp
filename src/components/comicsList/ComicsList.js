import "./comicsList.scss";
import useMarvelService from "../../services/MarvelService";
import { Link } from "react-router-dom";

import ErrorMassage from "../errorMassage/ErrorMassage";
import Spinner from "../spinner/Spinner";
import { useEffect, useState } from "react";

const ComicsList = () => {
  const [comics, setComics] = useState([]);
  const [comicsEnded, setComicsEnded] = useState(false);
  const [offset, setOffset] = useState(0);
  const [newItemLoading, setNewItemLoading] = useState(false);

  const { loading, error, getAllComics } = useMarvelService();

  useEffect(() => {
    onRequest(offset, true);
  }, []);

  const onRequest = (offset, initial) => {
    initial ? setNewItemLoading(false) : setNewItemLoading(true);

    getAllComics(offset).then(onComicsLoaded);
  };

  const onComicsLoaded = (newComics) => {
    let ended = false;
    if (newComics.length < 7) {
      ended = true;
    }
    setOffset((offset) => offset + 8);
    setComics((comics) => [...comics, ...newComics]);
    setNewItemLoading((newItemLoading) => false);
    setComicsEnded(ended);
  };

  const renderComics = () => {
    let items = comics.map((item) => {
      return (
        <li className="comics__item" key={item.id} tabIndex={0}>
          <Link to={`/comics/${item.id}`}>
            <img
              src={item.thumbnail}
              alt={item.title}
              className="comics__item-img"
            />
            <div className="comics__item-name">{item.title}</div>
            <div className="comics__item-price">{item.prices}</div>
          </Link>
        </li>
      );
    });
    return <ul className="comics__grid"> {items} </ul>;
  };

  let spinner = loading && !newItemLoading ? <Spinner /> : null;
  let errorMassage = error ? <ErrorMassage /> : null;

  return (
    <div className="comics__list">
      {renderComics()}
      {spinner}
      {errorMassage}

      <button
        className="button button__main button__long"
        onClick={() => {
          onRequest(offset);
        }}
        style={{ display: comicsEnded ? "none" : "block" }}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

export default ComicsList;
