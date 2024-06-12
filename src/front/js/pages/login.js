import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useNavigate} from "react-router-dom";

export const Login = () => {
  const { store, actions } = useContext(Context);
  const[user,setUser]=useState({})
  const navigate=useNavigate()

  return (
    <div className="text-center pb-5 mt-5 container">
      <div className="pb-5">
      <h3>Log In</h3>
          <img className="img-fluid rounded float-start image-login" src='https://img.freepik.com/free-vector/access-control-system-abstract-concept_335657-3180.jpg?w=740&t=st=1675365675~exp=1675366275~hmac=bd4917ebc01d74786965d787035291124636a64f2160f46ff5ad128593c29c28'/>
        <div className="mt-5">
          
          <div className="m-3">
            <label htmlFor="exampleDropdownFormEmail1" className="form-label">
              Correo eletronico
            </label>
            <input
              type="email"
              onChange={(e)=>setUser({...user,email:e.target.value})}
              className="form-control w-50 m-auto"
              id="exampleDropdownFormEmail1"
              placeholder="email@example.com"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleDropdownFormPassword1" className="form-label">
              Contraseña
            </label>
            <input
              type="password"
              onChange={(e)=>setUser({...user,password:e.target.value})}
              className="form-control w-50 m-auto"
              id="exampleDropdownFormPassword1"
              placeholder="Password"
            />
          </div>
          <div className="mb-3"></div>
          <button type="submit" onClick={()=>{
            actions.login(user).then((data)=>{
              if(data.token){
                navigate("/")
              }
            })
            }} className="btn btn-primary button-blue-primary">
            Login
          </button>
        </div>
      </div>
    </div>
  );
};
