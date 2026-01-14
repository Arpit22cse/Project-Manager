import { createContext,useState,useEffect, useContext } from "react";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Simulate fetching user data from an API or local storage
    const fetchUser = async () => { 
      // Simulated delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const storedUser = null;
      setUser(storedUser);
      setLoading(false);
    }
    fetchUser();
  }, []);

  const login = (userData) => {
    setUser(userData);
  };
  const logout = () => {
    setUser(null);
  }
 return (
  <AuthContext.Provider value={{ user, loading, setUser, logout }}>
    {children}
  </AuthContext.Provider>
 );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;