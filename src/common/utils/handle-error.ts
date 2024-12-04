import { isAxiosError } from "axios"
import { Dispatch } from "redux"

import { setAppError, setAppStatus } from "../../app/app-reducer"

export const handleError = (error: unknown, dispatch: Dispatch) => {
    let errorMessage: string

    if (error instanceof Error) {
        if (isAxiosError<ServerError>(error)) {
            errorMessage = error.response
                ? error.response.data?.errorMessages[0]?.message || error.message
                : error.message
        } else {
            errorMessage = error.message
        }
    } else if (typeof error === 'string') {
        errorMessage = error
    } else {
        errorMessage = 'An unknown error occurred'
    }

    dispatch(setAppError(errorMessage))
    dispatch(setAppStatus('failed'))
}

type ServerError = {
    errorMessages: Array<{ field: string, message: string }>
}