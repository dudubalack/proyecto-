import React,{useState, useContext, useEffect} from "react";
import {Context} from "../store/appContext"
import { Link} from "react-router-dom";

const UltimoPost = () => {
    const [posts, setPosts] = useState([])
    const {actions,store} = useContext(Context)
    useEffect(()=>{
        actions.ultimo_post().then((data)=>{
            setPosts(data)
        })
    }, [])
    return (
        <div className="row">
            <h3>Post Recente</h3>
            {
                posts.map((value)=>{
                    return (
                        <div className="col-12 col-md-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{value.title}</h5>
                                <p className="card-text">{value.text.length > 30 ? `${value.text.substring(0, 30)}...` : value.text}</p>
                                <Link to={"/post/"+value.id} className="btn btn-primary button-blue-primary">LER MAS</Link>
                            </div>
                        </div>
                    </div>
                    )
                })
            }
        </div>
    )
}
export default UltimoPost