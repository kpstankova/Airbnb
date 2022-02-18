export enum SearchBarActions {
    LOAD_CONTENT_SEARCH_RESULTS = 'LOAD_CONTENT_SEARCH_RESULTS',
    TOGGLE_SEARCH_STRING = "TOGGLE_SEARCH_STRING",
    TOGGLE_FILTER_START_DATE = 'TOGGLE_FILTER_START_DATE',
    TOGGLE_FILTER_END_DATE = 'TOGGLE_FILTER_END_DATE',
    TOGGLE_FILTER_GUESTS = 'TOGGLE_FILTER_GUESTS',
    RESET_FILTERS = 'RESET_FILTERS'
}
export interface SearchState {
    searchString: string;
    startDate: Date;
    endDate: Date;
    numberOfGuests: number;
}
