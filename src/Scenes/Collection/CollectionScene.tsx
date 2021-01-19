import React from "react"
import { Schema, screenTrack } from "App/utils/track"
import { Collection } from "@seasons/eclipse"
import { useAuthContext } from "App/Navigation/AuthContext"
import { usePopUpContext } from "App/Navigation/ErrorPopUp/PopUpContext"

export const CollectionScene = screenTrack({
  entityType: Schema.EntityTypes.Collection,
})((props: any) => {
  const { route } = props
  const { authState } = useAuthContext()
  const { showPopUp, hidePopUp } = usePopUpContext()

  const collectionID = route?.params?.collectionID
  return <></>
})

// return <Collection collectionID={collectionID} hidePopUp={hidePopUp} showPopUp={showPopUp} authState={authState} />
