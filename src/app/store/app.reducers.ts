import { ActionReducerMap } from '@ngrx/store';
import * as reducers from './reducers';


export interface AppState {
   personajes: reducers.PersonajesState,
   personaje: reducers.PersonajeState,
}



export const appReducers: ActionReducerMap<AppState> = {
   personajes: reducers.PersonajesReducer,
   personaje: reducers.PersonajeReducer
}