import { createReducer, on } from '@ngrx/store';
import { cargarPersonajes, cargarPersonajesError, cargarPersonajesSuccess } from '../actions';
import { Character } from './../../models/Character';


export interface PersonajesState {
    personajes  : Character[],
    loading: boolean,
    page: number,
    totalPages: number,
    error  : any
}

export const personajesInitialState: PersonajesState = {
    personajes: [],
    loading: false,
    page: 0,
    totalPages: 100000,
    error: null
}

const _personajesReducer = createReducer(personajesInitialState,

    on( cargarPersonajes, state => ({ ...personajesInitialState, loading: true })),
    
    
    on( cargarPersonajesSuccess, (state, { data, page }) => ({ 
        ...state, 
        loading: false,
        page: page,
        totalPages: data.info.pages,
        personajes: data.results 
    })),

    on( cargarPersonajesError, (state, { payload }) => ({ 
        ...state, 
        loading: false,
        page: 0,
        totalPages: 1,
        error: payload.error.error
    })),




);

export function PersonajesReducer(state: any, action: any) {
    return _personajesReducer(state, action);
}