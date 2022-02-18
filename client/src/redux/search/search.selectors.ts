import { createSelector } from "reselect";
import { StoreState } from "../root-reducer";

const selectSearchBar = (state:StoreState) => state.search;

export const selectSearchString = createSelector(
    [selectSearchBar],
    (search) => search.searchString
);

export const selectStartDate = createSelector(
    [selectSearchBar],
    (search) => search.startDate
);

export const selectEndDate = createSelector(
    [selectSearchBar],
    (search) => search.endDate
);

export const selectNumberOfGuests = createSelector(
    [selectSearchBar],
    (search) => search.numberOfGuests
)