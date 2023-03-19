import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useStore, Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { wrapper } from "../store";

function App({ Component, pageProps }: AppProps) {
  const store: any = useStore();
  const { store: myStore, props } = wrapper.useWrappedStore(pageProps);

  return (
    <PersistGate persistor={store.__persistor} loading={<div>Loading</div>}>
      <Provider store={myStore}>
        <Component {...pageProps} />
      </Provider>
    </PersistGate>
  );
}

export default wrapper.withRedux(App);
