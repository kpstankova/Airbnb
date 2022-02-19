import { SearchProps } from "../../components/helperFunctions";
import { HousingItem } from "../search/searchPage.types";

export interface HomepageProps {
    searchUrl: string;
    searchString: string;
    startDateFilter: Date;
    endDateFilter: Date;
    numberOfGuestsFilter: number;
    loadSearchResultsAction: (data: HousingItem[]) => void;
    redirectToSearchResultsPage: (data: SearchProps) => void;
    toggleSearchStringAction: (data: string) => void;
    toggleStartDateFilterAction: (data: Date) => void;
    toggleEndDateFilterAction: (data: Date) => void;
    toggleGuestNumberFilerAction: (data: number) => void;
}