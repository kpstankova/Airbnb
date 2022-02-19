import React from 'react';
import { StoreState } from '../../redux/root-reducer';
import { selectEndDate, selectNumberOfGuests, selectSearchResults, selectSearchString, selectStartDate } from '../../redux/search/search.selectors';
import './searchPage.styles.scss';
import { HousingItem, SearchPageProps } from './searchPage.types';
import { connect } from 'react-redux';
import { format } from 'date-fns';
import HousingItemComponent from '../../components/housings/housing-item.component';
import MapComponent from '../../components/map/map.component';

const SearchPageComponent: React.FC<SearchPageProps> = ({ ...props }) => {

    const { searchResults, searchString, startDateFilter, endDateFilter, numberOfGuestsFilter } = props;

    const formattedStartDate = format(new Date(startDateFilter), "dd MMMM yy");
    const formattedEndDate = format(new Date(endDateFilter), "dd MMMM yy");

    return (
        <div>
            <main className='main-component'>
                <section className='section-component'>
                    <p className='search-info-text'>300 + Stays for {numberOfGuestsFilter} number of guests from {formattedStartDate} to {formattedEndDate}</p>
                    <h1 className="search-string-text">Stays in {searchString}</h1>

                    <div className="items-container">
                        {searchResults.map((searchResult) => {
                            return <HousingItemComponent key={searchResult.title} item={searchResult} />
                        })}
                    </div>
                </section>
                <section className='map-component'>
                    <MapComponent searchResults={searchResults}/>
                </section>
            </main>
        </div>
    )
}

const mapStateToProps = (state: StoreState): { searchResults: HousingItem[], searchString: string, startDateFilter: Date, endDateFilter: Date, numberOfGuestsFilter: number } => {
    return {
        searchResults: selectSearchResults(state),
        searchString: selectSearchString(state),
        startDateFilter: selectStartDate(state),
        endDateFilter: selectEndDate(state),
        numberOfGuestsFilter: selectNumberOfGuests(state)
    }
}

export default connect(mapStateToProps, null)(SearchPageComponent);