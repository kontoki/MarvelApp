import useHttp from "../hooks/http.hook";

const useMarvelService = () => {
  const { loading, request, error, clearError } = useHttp();

  const _apiBase = "https://gateway.marvel.com:443/v1/public/";
  const _apiKey = "apikey=ff278881957ec5f747e7aa612ec09cf3";
  const _baseOffset = 210;

  const getAllCharacters = async (offset = _baseOffset) => {
    const res = await request(
      `${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`
    );
    return res.data.results.map(_transformCharacter);
  };

  const getCharacters = async (id) => {
    const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
    return _transformCharacter(res.data.results[0]);
  };

  const getAllComics = async (offset = 0) => {
    const res = await request(
      `${_apiBase}comics?orderBy=issueNumber&limit=8&offset=${offset}&${_apiKey}`
    );
    return res.data.results.map(_transformComics);
  };

  const getComics = async (id) => {
    const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
    return _transformComics(res.data.results[0]);
  };

  const getSingleChar = async (name) => {
    const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
    return _transformCharacter(res.data.results[0]);
  };

  const _transformCharacter = (character) => {
    return {
      id: character.id,
      name: character.name,
      description: character.description,
      thumbnail: character.thumbnail.path + "." + character.thumbnail.extension,
      homepage: character.urls[0].url,
      wiki: character.urls[1].url,
      comics: character.comics.items,
    };
  };

  const _transformComics = (comic) => {
    return {
      id: comic.id,
      title: comic.title,
      description:
        comic.description === ""
          ? "Description is not available"
          : comic.description,
      prices: comic.prices[0].price
        ? `${comic.prices[0].price}$`
        : "Price is not available",
      thumbnail: comic.thumbnail.path + "." + comic.thumbnail.extension,
      pageCount: comic.pageCount,
      language: comic.textObjects[0]
        ? `${comic.textObjects[0].language}`
        : "en-us",
    };
  };

  return {
    loading,
    error,
    getAllCharacters,
    getCharacters,
    clearError,
    getAllComics,
    getComics,
    getSingleChar,
  };
};

export default useMarvelService;
