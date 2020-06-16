import { CreateAccountPane } from "./CreateAccountPane"
import { GetMeasurementsPane } from "./GetMeasurementsPane"
import { ChoosePlanPane } from "./ChoosePlanPane"
import { WelcomePane } from "./WelcomePane"
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

    const onChoosePlan = () => {
        setState(State.WELCOME)
    }

    const onPressGetStarted = () => {

    }

    switch (state) {
        case State.CREATE_ACCOUNT:
            return (<CreateAccountPane onAuth={onAuth} />)
        case State.GET_MEASUREMENTS:
            return (<GetMeasurementsPane onGetMeasurements={onGetMeasurements} />)
        case State.CHOOSE_PLAN:
            return (<ChoosePlanPane onChoosePlan={onChoosePlan} />)
        case State.WELCOME:
            return (<WelcomePane onPressGetStarted={onPressGetStarted} />)
        default:
            return (<></>)
    }
}