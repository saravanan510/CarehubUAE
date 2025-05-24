import React, { useState, createContext, useContext } from "react";
const BookingContext = createContext();

export const useBookingDetails = () => {
  return useContext(BookingContext);
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
