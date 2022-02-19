import { HousingItem } from "../../pages/search/searchPage.types";
import { SearchBarActions } from "./search.types";

export interface ISearchBaseAction {
    type: SearchBarActions;
}

export interface ILoadSearchResults extends ISearchBaseAction {
    type: SearchBarActions.LOAD_SEARCH_RESULTS;
    data: HousingItem[];
}
export interface IToggleSearchString extends ISearchBaseAction {
    type: SearchBarActions.TOGGLE_SEARCH_STRING;
    data: string;
}

export interface IToggleFilterStartDate extends ISearchBaseAction {
    type: SearchBarActions.TOGGLE_FILTER_START_DATE;
    data: Date;
}

export interface IToggleFilterEndDate extends ISearchBaseAction {
    type: SearchBarActions.TOGGLE_FILTER_END_DATE;
    data: Date;
}

export interface IToggleFilterGuests extends ISearchBaseAction {
    type: SearchBarActions.TOGGLE_FILTER_GUESTS;
    data: number;
}

export interface IResetFilters extends ISearchBaseAction {
    type: SearchBarActions.RESET_FILTERS;
}

export type TSearchReducerActions = IToggleSearchString | IResetFilters | IToggleFilterStartDate | IToggleFilterEndDate | IToggleFilterGuests | ILoadSearchResults;