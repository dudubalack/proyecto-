import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { store, actions } = useContext(Context);
  const [user, setUser] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    rol_id: ""
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <div className="text-center mt-5 container">
      <div className="">
        <h3>Register</h3>
        <img
          className="img-fluid rounded float-start w-50 image-register"
          src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg?w=740&t=st=1675366598~exp=1675367198~hmac=4b50179add235dccdcc5847a2e7cd194a0e0514af2f405e39385452395bff979"
          alt="register-image"
        />
        <div className="px-4 py-3">
          <div className="mb-3">
            <label htmlFor="exampleDropdownFormEmail1" className="form-label">
              Correo electrónico
            </label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
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
              name="password"
              value={user.password}
              onChange={handleChange}
              className="form-control w-50 m-auto"
              id="exampleDropdownFormPassword1"
              placeholder="Password"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleDropdownFormName" className="form-label">
              Nombre
            </label>
            <input
              type="text"
              name="first_name"
              value={user.first_name}
              onChange={handleChange}
              className="form-control w-50 m-auto"
              id="exampleDropdownFormName"
              placeholder="nombre"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleDropdownFormApellido" className="form-label">
              Apellido
            </label>
            <input
              type="text"
              name="last_name"
              value={user.last_name}
              onChange={handleChange}
              className="form-control w-50 m-auto"
              id="exampleDropdownFormApellido"
              placeholder="apellido"
            />
          </div>
          <label htmlFor="exampleDropdownFormRol" className="form-label">
            Elige tu rol
          </label>
          <select
            name="rol_id"
            value={user.rol_id}
            onChange={handleChange}
            className="form-select w-50 m-auto"
            aria-label="Default select example"
          >
            <option value="">elige tu rol</option>
            {store.rol.map((roles) => (
              <option key={roles.id} value={roles.id}>
                {roles.rol}
              </option>
            ))}
          </select>
          <div className="mb-3"></div>
          <button
            type="submit"
            onClick={() => {
              actions.register(user).then((data) => {
                if (data.user) {
                  navigate("/");
                }
              });
            }}
            className="btn btn-primary button-blue-primary"
          >
            Registrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
