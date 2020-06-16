import { CreateAccountPane } from "./CreateAccountPane"
import { GetMeasurementsPane } from "./GetMeasurementsPane"
import React, { useState } from "react"


interface CreateAccountProps {
    navigation: any
}

enum State {
    CREATE_ACCOUNT, GET_MEASUREMENTS, CHOOSE_PLAN, WELCOME
}

export const CreateAccount: React.FC<CreateAccountProps> = (props) => {
    const [state, setState] = useState(State.CREATE_ACCOUNT)

    const onAuth = (credentials, profile) => {
        setState(State.GET_MEASUREMENTS)
    }

    const onGetMeasurements = () => {
        setState(State.CHOOSE_PLAN)
    }

    switch (state) {
        case State.CREATE_ACCOUNT:
            return CreateAccountPane({ onAuth })
        case State.GET_MEASUREMENTS:
            return GetMeasurementsPane({ onGetMeasurements })
        default:
            return (<></>)
    }
}