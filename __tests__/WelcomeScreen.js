import { render } from "@testing-library/react-native";
import { Provider } from "react-redux";
import { Welcome } from "@screens";
import { persistor, store } from "@storage";
import { PersistGate } from "redux-persist/lib/integration/react";

describe("Testing Welcome screen", () => {
    it("Renders correctly", () => {
        render(
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <Welcome />
                </PersistGate>
            </Provider>
        );
    });
});
