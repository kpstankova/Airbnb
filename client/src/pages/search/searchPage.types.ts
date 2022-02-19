import { DroppedFile } from "../../redux/onboarding/onboarding.types";

export interface SearchPageProps {
    searchResults: HousingItem[];
    searchString: string;
    startDateFilter: Date;
    endDateFilter: Date;
    numberOfGuestsFilter: number;
}

export interface HousingItem {
    title: string;
    description: string;
    owner: number;
    rating: number;
    guests: number;
    long: number;
    lat: number;
    city: string;
    price: number;
    images: string[];
}