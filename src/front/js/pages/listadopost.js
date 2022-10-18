import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useParams } from "react-router-dom";
const ListadoPost = ()=>{
    const {actions,store} = useContext(Context)
    useEffect(()=>{
    actions.listar_post()
    },[])
    return (
        <div className="container mt-2">
            <div className="row">
            {
                store.posts.map((post)=>{
                return (
                    <div className="col-12 col-md-4">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">{post.title}</h5>
                                <p class="card-text">{post.text.length > 30 ? `${post.text.substring(0, 30)}...` : post.text}</p>
                                <Link to={"/post/"+post.id} class="btn btn-primary">LER MAS</Link>
                            </div>
                        </div>
                    </div>
                )
                })
            }
            </div>
        </div>
    )
}
export default ListadoPost