import React from 'react'
import useSWR from 'swr'
const fetcher = (url) => fetch(url).then((result) => result.json());
export default function useRequestAllProduct() {
  const { data, error } = useSWR("/api/home", fetcher);
  return {
    data,
    error
  }
}
