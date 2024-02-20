"use client"
import axios from "axios";
import useSwr from "swr";

export const client = axios.create({
  baseURL: "/api",
  headers: {},
});

export function useAxiosQuery<T>(key: string) {
  const result = useSwr(key, (uri) =>
    client.get<T>(uri).then((res) => res.data)
  );
  return result;
}
