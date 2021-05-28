import React from 'react'
import useSWR from 'swr'
const fetcher = (url) => fetch(url).then((result) => result.json());
export default function useRequestShippingCost() {
  const { data, error } = useSWR("/api/cost", fetcher);
  return {
    data,
    error
  }
}
