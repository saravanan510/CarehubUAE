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
  const handleRest = () => {
    setBookingDetails({
      tests: [],
      userInfo: {},
      date: "",
      time: "",
    });
  };
  return (
    <BookingContext.Provider
      value={{ bookingDetails, handleDetails, handleRest }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ loggedIn: false });
  const handleLoginContext = (value) => {
    setAuth(value);
  };
  return (
    <AuthContext.Provider value={{ auth, handleLoginContext }}>
      {children}
    </AuthContext.Provider>
  );
};
