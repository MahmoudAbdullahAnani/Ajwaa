import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const handleData = async () => {
      const isUserLogged = await AsyncStorage.getItem("isUserLogged");

      setLoading(false);
      if (isUserLogged === "true") {
        setIsLogged(true);
        const dataUser = await AsyncStorage.getItem("UserData");
        setUser(JSON.parse(dataUser));
        setLoading(false);
        return router.push("/home");
      }
    };

    handleData();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isLogged,
        setIsLogged,
        user,
        setUser,
        loading,
        setLoading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
