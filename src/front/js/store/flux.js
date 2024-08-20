const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            message: null,
            rol: [],
            token: null,
            user: {},
            post: [],
            posts: [],
            post_privado: [],
            demo: [
                {
                    title: "FIRST",
                    background: "white",
                    initial: "white"
                },
                {
                    title: "SECOND",
                    background: "white",
                    initial: "white"
                }
            ]
        },
        actions: {
            // Example function
            exampleFunction: () => {
                getActions().changeColor(0, "green");
            },

            getMessage: async () => {
                try {
                    const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
                    const data = await resp.json();
                    setStore({ message: data.message });
                    return data;
                } catch (error) {
                    console.log("Error loading message from backend", error);
                }
            },

            register: async (user) => {
                try {
                    const resp = await fetch(process.env.BACKEND_URL + "/api/register", {
                        method: 'POST',
                        body: JSON.stringify(user),
                        headers: {
                            "Content-type": "application/json",
                        },
                    });
                    const data = await resp.json();
                    return data;
                } catch (error) {
                    console.log("Error registering user", error);
                }
                return {};
            },

            login: async (user) => {
                try {
                    const resp = await fetch(process.env.BACKEND_URL + "/api/login", {
                        method: 'POST',
                        body: JSON.stringify(user),
                        headers: {
                            "Content-type": "application/json",
                        },
                    });
                    const data = await resp.json();
                    setStore({ token: data.token });
                    localStorage.setItem("token", data.token);
                    setStore({ user: data.user });
                    return data;
                } catch (error) {
                    console.log("Error logging in", error);
                }
                return {};
            },

            updateUser: () => {
                setStore({ token: localStorage.getItem("token") });
            },

            GETrol: async () => {
                try {
                    const resp = await fetch(process.env.BACKEND_URL + "/api/rol");
                    const data = await resp.json();
                    setStore({ rol: data.rol });
                } catch (error) {
                    console.log("Error loading roles from backend", error);
                }
            },

            Logout: () => {
                localStorage.clear();
                setStore({ token: null, user: {} });
            },

            crear_post: async (post) => {
                try {
                    const resp = await fetch(process.env.BACKEND_URL + "/api/crear-post", {
                        method: 'POST',
                        body: JSON.stringify(post),
                        headers: {
                            "Content-type": "application/json",
                            Authorization: "Bearer " + localStorage.getItem("token"),
                        },
                    });
                    const data = await resp.json();
                    setStore({ post: data.post });
                    return data;
                } catch (error) {
                    console.log("Error creating post", error);
                }
                return {};
            },

            eliminar_post: async (id) => {
                try {
                    const resp = await fetch(process.env.BACKEND_URL + "/api/eliminarpost/" + id, {
                        method: 'DELETE',
                        headers: {
                            "Content-type": "application/json",
                            Authorization: "Bearer " + localStorage.getItem("token"),
                        },
                    });
                    const data = await resp.json();
                    return data;
                } catch (error) {
                    console.log("Error deleting post", error);
                }
                return {};
            },

            listar_post: async () => {
                try {
                    const resp = await fetch(process.env.BACKEND_URL + "/api/posts", {
                        method: 'GET',
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("token"),
                        },
                    });
                    const data = await resp.json();
                    setStore({ posts: data });
                    return data;
                } catch (error) {
                    console.log("Error loading posts from backend", error);
                }
                return {};
            },

            listar_privado: async () => {
                try {
                    const resp = await fetch(process.env.BACKEND_URL + "/api/post-privado", {
                        method: 'GET',
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("token"),
                        },
                    });
                    const data = await resp.json();
                    setStore({ post_privado: data });
                    return data;
                } catch (error) {
                    console.log("Error loading private posts from backend", error);
                }
                return {};
            },

            detalle_de_post: async (id) => {
                try {
                    const resp = await fetch(process.env.BACKEND_URL + "/api/post/" + id, {
                        method: 'GET',
                    });
                    const data = await resp.json();
                    return data;
                } catch (error) {
                    console.log("Error loading post details from backend", error);
                }
                return {};
            },

            ultimo_post: async () => {
                try {
                    const resp = await fetch(process.env.BACKEND_URL + "/api/ultimos-posts/", {
                        method: 'GET',
                    });
                    const data = await resp.json();

                    // Verifica que la respuesta es un array
                    if (Array.isArray(data)) {
                        return data;
                    } else {
                        console.error("Response is not an array:", data);
                        return [];
                    }
                } catch (error) {
                    console.log("Error loading latest posts from backend", error);
                    return [];
                }
            },

            changeColor: (index, color) => {
                const store = getStore();

                const demo = store.demo.map((elm, i) => {
                    if (i === index) elm.background = color;
                    return elm;
                });

                setStore({ demo: demo });
            }
        }
    };
};

export default getState;
