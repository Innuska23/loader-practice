export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
  status: 'idle' as RequestStatusType,
  error: null as string | null,
}

type AppStateType = typeof initialState

export const appReducer = (state: AppStateType = initialState, action: ActionsType): AppStateType => {
  switch (action.type) {
    case 'SET_STATUS': {
      return {
        ...state,
        status: action.payload.status
      }
    }
    case "SET_ERROR":
      return {
        ...state,
        error: action.payload.error
      }
    default:
      return state
  }
}
export const setAppStatus = (status: RequestStatusType) => {
  return {
    type: 'SET_STATUS',
    payload: { status },
  } as const
}

export const setAppError = (error: string | null) => {
  return {
    type: 'SET_ERROR',
    payload: { error },
  } as const
}

export type SetAppStatus = ReturnType<typeof setAppStatus>
export type SetAppError = ReturnType<typeof setAppError>

type ActionsType = SetAppStatus
  | SetAppError
