import { createConnectTransport } from "@connectrpc/connect-web";
import { ENV } from "./env";

export const connectTransport = createConnectTransport({
  baseUrl: ENV.API,

  fetch: (url, options) => {
    return globalThis.fetch(url, {
      ...options,
      credentials: "include",
    });
  },
});
