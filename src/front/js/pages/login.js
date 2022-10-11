import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useNavigate} from "react-router-dom";

export const Login = () => {
  const { store, actions } = useContext(Context);
  const[user,setUser]=useState({})
  const navigate=useNavigate()

  return (
    <div className="text-center mt-5">
      <div className="">
        <div className="px-4 py-3">
          <div className="mb-3">
            <label htmlFor="exampleDropdownFormEmail1" className="form-label">
              Correo eletronico
            </label>
            <input
              type="email"
              onChange={(e)=>setUser({...user,email:e.target.value})}
              className="form-control"
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
              className="form-control"
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
            }} className="btn btn-primary">
            Login
          </button>
        </div>
      </div>
    </div>
  );
};
