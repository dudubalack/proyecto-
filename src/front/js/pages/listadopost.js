import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useParams } from "react-router-dom";
const DetalleDePost = ()=>{
    const [post,setpost] = useState({})
    const params = useParams();
    const { store, actions } = useContext(Context);


    useEffect(()=>{
    actions.detalle_de_post(params.id).then(data => setpost(data))
    },[])
 return <div className="container">
    {
        post.title ? (
            <div className="col-12 ">
                <h3>{post.title}</h3>
                <p>{post.text}</p>
            </div>
        ):""
    }
 </div>
}
export default DetalleDePost