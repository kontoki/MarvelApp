import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import Boundary from "../boundary/Boundary";
import decoration from "../../resources/img/vision.png";

import { useState } from "react";
import SingleCharSearch from "../singleCharSearch/SingleCharSearch";

const MainPage = () => {
  const [charId, setCharId] = useState(null);

  const onInfo = (charId) => {
    setCharId(charId);
  };
  return (
    <>
      <Boundary>
        <RandomChar />
      </Boundary>
      <div className="char__content">
        <Boundary>
          <CharList onInfo={onInfo} />
        </Boundary>
        <div>
          <Boundary>
            <CharInfo charId={charId} />
          </Boundary>
          <SingleCharSearch />
        </div>
      </div>
      <img className="bg-decoration" src={decoration} alt="vision" />
    </>
  );
};
export default MainPage;
