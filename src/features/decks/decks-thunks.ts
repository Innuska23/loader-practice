import { Dispatch } from 'redux'
import { decksAPI, UpdateDeckParams } from './decks-api.ts'
import { addDeckAC, deleteDeckAC, setAppErrorAC, setDecksAC, updateDeckAC } from './decks-reducer.ts'
import { setAppStatus } from '../../app/app-reducer.ts'
import { isAxiosError } from 'axios';

export const fetchDecksTC = () => async (dispatch: Dispatch) => {
  dispatch(setAppStatus('loading'));
  try {
    const res = await decksAPI.fetchDecks();
    dispatch(setDecksAC(res.data.items));
    dispatch(setAppStatus('succeeded'));
  } catch (e) {
    console.error(e);
    dispatch(setAppStatus('failed'));
  } finally {
    dispatch(setAppStatus('idle'));
  }
};

export const addDeckTC = (name: string) => async (dispatch: Dispatch) => {
  return decksAPI.addDeck(name).then((res) => {
    dispatch(addDeckAC(res.data))
  })
}

export const deleteDeckTC = (id: string) => async (dispatch: Dispatch) => {
  return decksAPI.deleteDeck(id).then((res) => {
    dispatch(deleteDeckAC(res.data.id))
  })
}

export const updateDeckTC = (params: UpdateDeckParams) => async (dispatch: Dispatch) => {
  try {
    const res = await decksAPI.updateDeck(params)
    dispatch(updateDeckAC(res.data))
    dispatch(setAppErrorAC(null))
  } catch (error) {
    console.log(error)
    let errorMessage: string
    if (isAxiosError<ServerError>(error)) {
      errorMessage = error.response ? error.response.data?.errorMessages[0].message : error.message
    } else {
      errorMessage = (error as Error).message
    }
    dispatch(setAppErrorAC(errorMessage))
    dispatch(setAppStatus('failed'))
  }
}
type ServerError = {
  errorMessages: Array<{ field: string, message: string }>
}