import { GetBag_NoCache_Query as GetBag_NoCache_Query_Type } from "App/generated/GetBag_NoCache_Query"
import { useAuthContext } from "App/Navigation/AuthContext"
import { GET_LOCAL_BAG } from "App/queries/clientQueries"
import { useEffect } from "react"

import { useLazyQuery, useQuery } from "@apollo/client"

import { GET_LOCAL_BAG_ITEMS, GetBag_NoCache_Query } from "./BagQueries"

export const useLocalBag = () => {
  const { data: getLocalBagData } = useQuery(GET_LOCAL_BAG)
  const ids = getLocalBagData?.localBagItems

  const [getLocalBag, { data, refetch }] = useLazyQuery(GET_LOCAL_BAG_ITEMS, {
    variables: {
      ids: ids?.map((i) => i.variantID),
    },
  })

  useEffect(() => {
    getLocalBag()
  }, [ids])

  return {
    bagItems:
      data?.productVariants?.map((item, i) => {
        return {
          ...ids?.[i],
          ...data?.productVariants?.[i],
          productVariant: item,
          status: "Added",
        }
      }) || [],
    refetch,
  }
}

export const useRemoteBag = () => {
  const { previousData, data = previousData, refetch } = useQuery<GetBag_NoCache_Query_Type>(GetBag_NoCache_Query)
  if (!data) {
    return {
      data: null,
      bagItems: [],
      bagSections: [],
    }
  }

  return {
    data,
    refetch,
    bagSections: data?.me?.bagSections,
  }
}

export const useBag = () => {
  const { authState } = useAuthContext()

  const isSignedIn = authState.isSignedIn
  const { bagItems: localItems } = useLocalBag()
  const { bagSections: remoteSections, data, refetch } = useRemoteBag()
  const bagSections = !isSignedIn ? [{ status: "Added", title: "Reserving", bagItems: localItems }] : remoteSections

  return {
    data,
    refetch,
    bagSections,
  }
}
