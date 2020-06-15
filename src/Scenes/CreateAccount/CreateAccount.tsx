import { CreateAccountPane } from "./CreateAccountPane"
import { SetMeasurementsPane } from "./SetMeasurementsPane"
import { useState } from "react"


interface CreateAccountProps {
    navigation: any
}

enum State {
    CREATE_ACCOUNT, SET_MEASUREMENTS, CHOOSE_PLAN
}

export const CreateAccount: React.FC<CreateAccountProps> = (props) => {
    const [state, setState] = useState(State.CHOOSE_PLAN)

    const onAuth = (credentials, profile) => {
        setState(State.SET_MEASUREMENTS)
    }

    const onSetMeasurements = () => {
        setState(State.CHOOSE_PLAN)
    }

    switch (state) {
        case State.CREATE_ACCOUNT:
            return CreateAccountPane({ onAuth })
        case State.SET_MEASUREMENTS:
            return SetMeasurementsPane({ onSetMeasurements })
        default:
            return (<></>)
    }
}