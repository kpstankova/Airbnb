import { TSearchReducerActions } from "./search.actions";
import { SearchBarActions, SearchState } from "./search.types";

const InitialState: SearchState = {
    searchString: "",
    startDate: new Date(),
    endDate: new Date(),
    numberOfGuests: 0,
    searchResults: []
}

export const searchBarReducer = (state = InitialState, action: TSearchReducerActions): SearchState => {
    switch (action.type) {
        case SearchBarActions.LOAD_SEARCH_RESULTS: {
            return{
                ...state,
                searchResults: action.data
            }
        }
        case SearchBarActions.TOGGLE_SEARCH_STRING: {
            return {
                ...state,
                searchString: action.data
            }
        }
        case SearchBarActions.RESET_FILTERS: {
            return {
                ...state,
                searchString: "",
                startDate: new Date(),
                endDate: new Date(),
                numberOfGuests: 0
            }
        }
        case SearchBarActions.TOGGLE_FILTER_START_DATE: {
            return {
                ...state,
                startDate: action.data
            }
        }
        case SearchBarActions.TOGGLE_FILTER_END_DATE: {
            return {
                ...state,
                endDate: action.data
            }
        }
        case SearchBarActions.TOGGLE_FILTER_GUESTS: {
            return {
                ...state,
                numberOfGuests: action.data
            }
        }
        default:
            return state;
    }
}