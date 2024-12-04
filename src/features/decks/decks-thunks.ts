import { Dispatch } from 'redux'
import { decksAPI, UpdateDeckParams } from './decks-api.ts'
import { addDeckAC, deleteDeckAC, setDecksAC, updateDeckAC } from './decks-reducer.ts'
import { setAppError, setAppStatus } from '../../app/app-reducer.ts'
import { isAxiosError } from 'axios';
import { handleError } from '../../common/utils/handle-error.ts';

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
  try {
    const res = await decksAPI.addDeck(name)
    dispatch(addDeckAC(res.data))
  }
  catch (error) {
    handleError(error, dispatch)
  }
  finally {
    dispatch(setAppStatus('idle'));
  }
}

export const deleteDeckTC = (id: string) => async (dispatch: Dispatch) => {
  try {
    const res = await decksAPI.deleteDeck(id)
    dispatch(deleteDeckAC(res.data.id))
  }
  catch (error) {
    handleError(error, dispatch)
  }
  finally {
    dispatch(setAppStatus('idle'));
  }
}

export const updateDeckTC = (params: UpdateDeckParams) => async (dispatch: Dispatch) => {
  try {
    const res = await decksAPI.updateDeck(params)
    dispatch(updateDeckAC(res.data))
    dispatch(setAppError(null))
  } catch (error) {
    handleError(error, dispatch)
  }
  finally {
    dispatch(setAppStatus('idle'));
  }
}
