import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const { actions } = useContext(Context);
  const [user, setUser] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    rol: ""
  });
  const [roles, setRoles] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const data = await actions.GETrol(); // Asegúrate de que este método esté bien definido en `flux.js`
        if (data && Array.isArray(data)) {
          setRoles(data);
        } else {
          throw new Error("No se pudieron cargar los roles.");
        }
      } catch (error) {
        setError("Error loading roles: " + error.message);
      }
    };

    fetchRoles();
  }, [actions]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user.password !== user.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    const result = await actions.register(user);
    if (result !== true) {
      setError("Error en el registro: " + result.message);
    } else {
      navigate("/"); // Redirigir a la página principal después del registro exitoso
    }
  };

  return (
    <div className="text-center pb-5 mt-5 container">
      <div className="pb-5">
        <h3>Registro</h3>
        <img
          className="img-fluid rounded float-start image-register"
          src="https://img.freepik.com/free-vector/sign-up-concept-illustration_114360-7875.jpg?w=740&t=st=1675366412~exp=1675367012~hmac=2594a50c684e90be0d4f0f4290e4cbf3d0221d3e5f471c4e3ad0d6956f3c3995"
          alt="Registro"
        />
        <div className="mt-5">
          <div className="m-3">
            <label htmlFor="registerEmail" className="form-label">
              Correo electrónico
            </label>
            <input
              type="email"
              onChange={handleChange}
              name="email"
              className="form-control w-50 m-auto"
              id="registerEmail"
              placeholder="email@example.com"
              value={user.email}
            />
          </div>
          <div className="m-3">
            <label htmlFor="registerPassword" className="form-label">
              Contraseña
            </label>
            <input
              type="password"
              onChange={handleChange}
              name="password"
              className="form-control w-50 m-auto"
              id="registerPassword"
              placeholder="Password"
              value={user.password}
            />
          </div>
          <div className="m-3">
            <label htmlFor="confirmPassword" className="form-label">
              Confirmar Contraseña
            </label>
            <input
              type="password"
              onChange={handleChange}
              name="confirmPassword"
              className="form-control w-50 m-auto"
              id="confirmPassword"
              placeholder="Confirm Password"
              value={user.confirmPassword}
            />
          </div>
          <div className="m-3">
            <label htmlFor="registerRol" className="form-label">
              Rol
            </label>
            <select
              name="rol"
              className="form-control w-50 m-auto"
              id="registerRol"
              value={user.rol}
              onChange={handleChange}
            >
              <option value="">Selecciona un rol</option>
              {roles.map((rol) => (
                <option key={rol.id} value={rol.name}>
                  {rol.name}
                </option>
              ))}
            </select>
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          <button
            type="submit"
            onClick={handleSubmit}
            className="btn btn-primary button-blue-primary mt-3"
          >
            Registrarse
          </button>
        </div>
      </div>
    </div>
  );
};


export default Register;
