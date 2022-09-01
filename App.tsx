import React from "react";
import { SafeAreaView, StatusBar } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Colors } from "@utils";
import Router from "@navigation";
import { persistor, store } from "@storage";

const App = () => {
    return (
        <SafeAreaView style={{ backgroundColor: Colors.primary, flex: 1 }}>
            <StatusBar barStyle={"light-content"} />
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <Router />
                </PersistGate>
            </Provider>
        </SafeAreaView>
    );
};

export default App;
