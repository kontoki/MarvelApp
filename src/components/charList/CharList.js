import { useState, useEffect, useRef } from "react";
import { Transition } from "react-transition-group";

import "./charList.scss";
import useMarvelService from "../../services/MarvelService";
import ErrorMassage from "../errorMassage/ErrorMassage";
import Spinner from "../spinner/Spinner";
import PropTypes from "prop-types";

const CharList = (props) => {
  const [chars, setChars] = useState([]);
  const [offset, setOffset] = useState(210);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [charEnded, setCharEnded] = useState(false);

  const { loading, error, getAllCharacters } = useMarvelService();

  useEffect(() => {
    onRequest(offset, true);
  }, []);

  const onRequest = (offset, initial) => {
    initial ? setNewItemLoading(false) : setNewItemLoading(true);
    getAllCharacters(offset).then(onCharsLoaded);
  };

  const onCharsLoaded = (newChars) => {
    let ended = false;
    if (newChars.length < 9) {
      ended = true;
    }

    setChars((chars) => [...chars, ...newChars]);
    setOffset((offset) => offset + 9);
    setNewItemLoading((newItemLoading) => false);
    setCharEnded((charEnded) => ended);
  };

  const itemRefs = useRef([]);

  const showRef = (id, i) => {
    props.onInfo(id);
    itemRefs.current.forEach((item) =>
      item.classList.remove("char__item_selected")
    );

    itemRefs.current[i].classList.add("char__item_selected");
    itemRefs.current[i].focus();
  };

  function renderItems(arr) {
    let charItem = arr.map((item, i) => {
      let style =
        item.thumbnail ===
        "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
          ? { objectFit: "contain" }
          : { objectFit: "cover" };

      let items = (
        <li
          tabIndex={0}
          ref={(el) => (itemRefs.current[i] = el)}
          className="char__item"
          key={item.id}
          onClick={() => {
            showRef(item.id, i);
          }}
          onKeyPress={(e) => {
            if (e.key === " " || e.key === "Enter") {
              showRef(item.id, i);
            }
          }}
        >
          <img src={item.thumbnail} alt={`${item.name}`} style={style} />
          <div className="char__name">{item.name}</div>
        </li>
      );
      return items;
    });
    return <ul className="char__grid">{charItem}</ul>;
  }

  const duration = 300;

  const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0,
    visibility: "hidden",
  };

  const transitionStyles = {
    entering: { opacity: 0, visibility: "hidden" },
    entered: { opacity: 0, visibility: "hidden" },
    exiting: { opacity: 1, visibility: "visible" },
    exited: { opacity: 1, visibility: "visible" },
  };

  let spinner = loading && !newItemLoading ? <Spinner /> : null;
  let errorMassage = error ? <ErrorMassage /> : null;

  return (
    <Transition in={newItemLoading} timeout={duration}>
      {(state) => (
        <div
          className="char__list"
          style={{
            ...defaultStyle,
            ...transitionStyles[state],
          }}
        >
          {renderItems(chars)}
          {spinner}
          {errorMassage}
          <button
            className="button button__main button__long"
            disabled={newItemLoading}
            style={{ display: charEnded ? "none" : "block" }}
            onClick={() => {
              onRequest(offset);
            }}
          >
            <div className="inner">load more</div>
          </button>
        </div>
      )}
    </Transition>
  );
};

CharList.propTypes = {
  onInfo: PropTypes.func.isRequired,
};

export default CharList;
