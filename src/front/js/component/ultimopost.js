import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

const UltimoPost = () => {
  const [posts, setPosts] = useState([]);
  const { actions } = useContext(Context);

  useEffect(() => {
    actions.ultimo_post().then((data) => {
      setPosts(data.reverse());
    });
  }, []);
  return (
    <div className="row pt-4 pb-4 ">
      <h3>RECIENTE POST</h3>
      {posts.map((value) => (
        <div key={value.id} className="col-12 col-md-4">
          <div className="card p-3 mb-2 bg-light text-dark">
            <div className="card-body">
              <h5 className="card-title">{value.title}</h5>
              <p className="card-text">
                {value.text.length > 30
                  ? `${value.text.substring(0, 30)}...`
                  : value.text}
              </p>
              <Link
                to={"/post/" + value.id}
                className="btn btn-primary button-blue-primary"
              >
                LEER MAS
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UltimoPost;
