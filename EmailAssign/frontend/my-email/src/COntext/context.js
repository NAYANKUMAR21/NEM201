import { createContext, useState } from "react";
import axios from "axios";
export const AppContext = createContext();

function AppContextProvider({ children }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState(false);

  const login = async ({ email, password }) => {
    try {
      setEmail(email);
      let data = await axios.post("http://localhost:8080/user/login", {
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
      setEmail(email);
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

  const verify = async (email, otp) => {
    try {
      console.log(email, otp, "from frotend");
      const response = await axios.post(
        "http://localhost:8080/user/verify-otp",
        {
          email,
          otp,
        }
      );

      setState(true);
      console.log(response, "from verify");
    } catch (er) {
      console.log(er.message);
    }
  };
  return (
    <AppContext.Provider
      value={{ getDate, Auth, login, verify, email, state, setState }}
    >
      {" "}
      {children}
    </AppContext.Provider>
  );
}
export default AppContextProvider;
