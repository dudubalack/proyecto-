import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext";
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
                                <p class="card-text">{post.text}</p>
                                <a href="#" class="btn btn-primary">LER MAS</a>
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