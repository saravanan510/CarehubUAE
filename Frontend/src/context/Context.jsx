import React, { useState, createContext, useContext } from "react";
const BookingContext = createContext();
const AuthContext = createContext();

export const useBookingDetails = () => {
  return useContext(BookingContext);
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export const BookingProvider = ({ children }) => {
  const [bookingDetails, setBookingDetails] = useState({
    tests: [],
    userInfo: {},
    date: "",
    time: "",
  });
  const handleDetails = (data) => {
    setBookingDetails(data);
  };
  return (
    <BookingContext.Provider value={{ bookingDetails, handleDetails }}>
      {children}
    </BookingContext.Provider>
  );
};

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ loggedIn: false });
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
