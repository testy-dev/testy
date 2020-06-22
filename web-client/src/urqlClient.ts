import {
  Exchange,
  Operation,
  createClient,
  dedupExchange,
  fetchExchange,
  subscriptionExchange,
} from "urql";
import { SubscriptionClient } from "subscriptions-transport-ws";
import { cacheExchange } from "@urql/exchange-graphcache";
import { devtoolsExchange } from "@urql/devtools";
import { fromPromise, fromValue, map, mergeMap, pipe } from "wonka";
import firebase from "firebase/app";

export const fetchOptionsExchange = (
  fn: () => RequestInit | Promise<RequestInit>
): Exchange => ({ forward }) => ops$ =>
  pipe(
    ops$,
    mergeMap((operation: Operation) => {
      const result = fn();
      return pipe(
        typeof (result as Promise<RequestInit>).then === "function"
          ? fromPromise(result as Promise<RequestInit>)
          : fromValue(result as RequestInit),
        map((fetchOptions: RequestInit | (() => RequestInit)) => ({
          ...operation,
          context: { ...operation.context, fetchOptions },
        }))
      );
    }),
    forward
  );

const subscriptionClient = new SubscriptionClient(
  process.env.REACT_APP_GRAPHQL_ENDPOINT?.replace("http", "ws") ?? "",
  {
    reconnect: true,
  }
);

const client = createClient({
  url: process.env.REACT_APP_GRAPHQL_ENDPOINT as string,
  exchanges: [
    devtoolsExchange,
    dedupExchange,
    cacheExchange({}),
    fetchOptionsExchange(async () => {
      const token = await firebase.auth().currentUser?.getIdToken();
      return {
        headers: { authorization: token ? `Bearer ${token}` : "" },
      };
    }),
    fetchExchange,
    subscriptionExchange({
      forwardSubscription(operation) {
        return subscriptionClient.request(operation);
      },
    }),
  ],
});

export default client;
