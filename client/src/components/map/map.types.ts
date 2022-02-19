import { HousingItem } from "../../pages/search/searchPage.types";

export interface MapComponentProps {
    searchResults: HousingItem[];
}

export interface MapCoordinates {
    longitude: number;
    latitude: number;
}