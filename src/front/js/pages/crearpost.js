import React,{useState, useContext, useEffect} from "react";
import {Context} from "../store/appContext"
import { useNavigate} from "react-router-dom";


const Crearpost = ()=> {
  const{store,actions}=useContext(Context)
  const [data, setdata] = useState({})
  const navigate=useNavigate()
  const handleChange = (event)=>{
    setdata({...data, [event.target.name]: event.target.value})
  }
  const handleSubmit = (e)=>{
    e.preventDefault()
    actions.crear_post(data).then((res)=>{
     navigate("/listado-post")
    })
  }
  useEffect(()=>{
  if(!store.token){
    navigate("/login")
  } 
  },[])
return <div className="container mt-2">
    
    <div className="row">
      <div className="col-12 col-md-6 mx-auto">
      <h3> Crear post</h3>
      <form onSubmit={handleSubmit}>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Titulo</label>
          <input onChange={handleChange} type="text" class="form-control" id="title" name="title"/>
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Contenido de post</label>
          <textarea onChange={handleChange} class="form-control" placeholder="" rows={"15"} id="text " name="text"></textarea>
        </div>
        <button type="submit" class="btn btn-primary">Crearpost</button>
      </form>
      </div>
    </div>
</div>
}
export default Crearpost