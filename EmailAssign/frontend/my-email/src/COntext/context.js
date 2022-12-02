import { createContext } from "react";
import axios from "axios";
export const AppContext = createContext();

function AppContextProvider({ children }) {
  const login = async ({ email, password }) => {
    try {
      let data = axios.post("http://localhost:8080/user/signup", {
        email,
        password,
      });
      console.log(data);
    } catch (er) {
      console.log(er.message);
    }
  };
  const Auth = async ({ email, name, password, age }) => {
    try {
      const response = await axios.post("http://localhost:8080/user/signup", {
        email,
        password,
        name,
        age,
      });
      console.log(response.data, "from getdata");
    } catch (er) {
      console.log(er.message, "from getdata");
    }
  };
  const getDate = async () => {
    try {
      const response = await axios.get("http://localhost:8080/product");
      console.log(response.data, "from getdata");
      return response.data;
    } catch (er) {
      console.log(er.message, "from getdata");
    }
  };
  return (
    <AppContext.Provider value={{ getDate, Auth, login }}> {children}
    </AppContext.Provider>
  );
}
export default AppContextProvider;
