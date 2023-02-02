import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import useMarvelService from "../../services/MarvelService";
import "./singleCharSearch.scss";

import ErrorMassage from "../errorMassage/ErrorMassage";
import { Link } from "react-router-dom";

const SingleCharSearch = () => {
  const { loading, error, getSingleChar, clearError } = useMarvelService();

  const [char, setChar] = useState(null);

  const updateChar = (name) => {
    clearError();
    getSingleChar(name).then(onCharLoaded);
  };

  const onCharLoaded = (charName) => {
    setChar(charName);
  };

  const errorMessage = error ? (
    <div className="char__search-critical-error">
      <ErrorMassage />
    </div>
  ) : null;

  const result = char ? (
    <Link to={`/chararcter/${char.id}`}>
      <div className="char__search-success">
        There is! Visit {char.name} page?
      </div>
      <button className=" button button__secondary">
        <div className="inner">To page</div>
      </button>
    </Link>
  ) : (
    <div className="char__search-error">
      The character was not found. Check the name and try again
    </div>
  );

  return (
    <Formik
      initialValues={{
        name: "",
      }}
      validationSchema={Yup.object({
        name: Yup.string().required("This field is required"),
      })}
      onSubmit={(values) => updateChar(values.name)}
    >
      <Form>
        <div className="char__search-form">
          <label className="char__search-label" htmlFor="charName">
            Or find a character by name:
          </label>
          <div className="char__search-wrapper">
            <Field id="name" type="text" name="name" placeholder="Enter name" />
            <button
              className=" button button__main"
              type="submit"
              disabled={loading}
            >
              <div className="inner">find</div>
            </button>
          </div>
          <div className="char__search-wrapper">
            <ErrorMessage
              className="char__search-error"
              name="name"
              component="div"
            />
          </div>
          {result}
          {errorMessage}
        </div>
      </Form>
    </Formik>
  );
};

export default SingleCharSearch;
