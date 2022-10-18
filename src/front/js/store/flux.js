const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			rol: [],
			token: null,
			user:{},
			post:[],
			posts:[],
			post_privado:[],
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
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
	

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}},
			register: async (user) => {
				console.log(user)
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/register",{
						method:'POST',
						body:JSON.stringify(user),
						headers: {
							"Content-type": "application/json",
						},
					},)
				const data = await resp.json()
				return data
				}catch(error){
					console.log("Error loading message from backend", error)
				}
				return {}
			},
			login: async (user) => {
				console.log(user)
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/login",{
						method:'POST',
						body:JSON.stringify(user),
						headers: {
							"Content-type": "application/json",
						},
					},)
				const data = await resp.json()
				setStore({token: data.token})
				localStorage.setItem("token", data.token)
				setStore({user:data.user})
				return data
				}catch(error){
					console.log("Error loading message from backend", error)
				}
				return {}
			},
			updateUser:  ()=>{
				setStore({token: localStorage.getItem("token")})
				},
			GETrol: async ()=>{
				const resp = await fetch(process.env.BACKEND_URL + "/api/rol")
					const data = await resp.json()
					setStore({ rol: data.rol })
					console.log(data.rol)

				
				},
			Logout:()=>{
				localStorage.clear()
				setStore({token:null,user:{}})
			},
			crear_post: async (post) => {
				
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/crear-post",{
						method:'POST',
						body:JSON.stringify(post),
						headers: {
							"Content-type": "application/json",
							Authorization: "Bearer " + localStorage.getItem("token"),
						},
					},)
				const data = await resp.json()
				setStore({post: data.post})
				return data
				}catch(error){
					console.log("Error loading message from backend", error)
				}
				return {}
			},
			listar_post: async (post) => {
				
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/posts",{
						method:'GET',
						headers: {
							
							Authorization: "Bearer " + localStorage.getItem("token"),
						},
					},)
				const data = await resp.json()
				setStore({posts: data})
				return data
				}catch(error){
					console.log("Error loading message from backend", error)
				}
				return {}
			},
			listar_privado: async (post) => {
				
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/post-privado",{
						method:'GET',
						headers: {
							
							Authorization: "Bearer " + localStorage.getItem("token"),
						},
					},)
				const data = await resp.json()
				setStore({post_privado: data})
				return data
				}catch(error){
					console.log("Error loading message from backend", error)
				}
				return {}
			},
			detalle_de_post: async (id) => {
				
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/post/"+id,{
						method:'GET',
					},)
				const data = await resp.json()
				return data
				}catch(error){
					console.log("Error loading message from backend", error)
				}
				return {}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
