import React from 'react';
import { Text, View } from "react-native";
import Navigation from './files/Navigation';
// import { AuthProvider } from "./files/utils/components/AuthContext";
import { store, persistor } from './files/backend/store';
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Signup from './files/src/screens/Signup';

const App = () => {
    console.log('RUN')
    return (
        // //<AuthProvider>
        // <Provider store={store}>
        //     <PersistGate loading={null} persistor={persistor}>
        //         <Navigation />
        //     </PersistGate>
        // </Provider>
        // //   <Login />
        // //</AuthProvider>
        <Signup />
    );
};

export default App;
