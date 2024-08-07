import { Suspense } from "react";
import { Provider } from "react-redux";
import { PrimeReactProvider } from "primereact/api";
import { store } from "@/infraestructure/store";
import { AppRouter } from "./router/App.router";
import { ProgressSpinner } from "./core/components";
import "./App.css";

function App() {
  return (
    <>
      <Provider store={store}>
        <Suspense fallback={<ProgressSpinner darkColor="bg-[#111827]" lightColor="bg-white" />}>
          <PrimeReactProvider>
            <AppRouter />
          </PrimeReactProvider>
        </Suspense>
      </Provider>
    </>
  );
}

export default App;
