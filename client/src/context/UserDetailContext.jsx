import { createContext, useContext, useState } from "react";

const UserDetailContext = createContext();

export const useUserDetail = () => {
  const context = useContext(UserDetailContext);
  if (context === undefined) {
    throw new Error("useUserDetail must be used within a UserDetailProvider");
  }
  return context;
};

export const UserDetailProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState({
    favourites: [],
    bookings: [],
    token: null,
  });
  return (
    <UserDetailContext.Provider value={{ userDetails, setUserDetails }}>
      {children}
    </UserDetailContext.Provider>
  );
};
