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
      data?.productVariants?.map((item, i) => ({
        ...ids?.[i],
        ...data?.productVariants?.[i],
        productVariant: item,
        status: "Added",
      })) || [],
    refetch,
  }
}

export const useRemoteBag = () => {
  const { previousData, data = previousData, refetch } = useQuery<GetBag_NoCache_Query_Type>(GetBag_NoCache_Query)

  if (!data) {
    return {
      data: null,
      bagItems: [],
      groupedBagItems: [],
    }
  }

  const me = data.me
  const bagItems =
    me?.bag?.map((item) => ({
      ...item,
      variantID: item.productVariant.id,
      productID: item.productVariant.product.id,
    })) || []

  return {
    data,
    bagItems,
    refetch,
    groupedBagItems: data?.groupedBagItems,
  }
}

export const useBag = () => {
  const { authState } = useAuthContext()

  const isSignedIn = authState.isSignedIn
  const { bagItems: localItems } = useLocalBag()
  const { groupedBagItems, bagItems: remoteItems, data, refetch } = useRemoteBag()

  const bagItems = !isSignedIn ? localItems : remoteItems

  return {
    data,
    refetch,
    bagItems,
    groupedBagItems,
  }
}
