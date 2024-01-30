// import axios from "axios";
// import React, { createContext } from "react";
// import PhoneInput from "react-native-phone-number-input";
// import { BASE_URL } from "../../backend/config";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const sentotp = (phoneNumber) => {
//     axios
//       .post("${BASE_URL}", {
//         phoneNumber,
//       })
//       .then((res) => {
//         let userInfo = res.data;
//         console.log(userInfo);
//       })
//       .catch((e) => {
//         let userInfo = res.data;
//         console.log("error ${e}");
//       });
//   };

//   return (
//     <AuthContext.Provider value={{ sentotp }}>{children}</AuthContext.Provider>
//   );
// };
