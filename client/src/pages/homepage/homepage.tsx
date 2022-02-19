import axios from 'axios';
import React, { useEffect, useState } from 'react';
import backgroundImage from '../../assets/backgroundImage.jpg';
import { ILoadSearchResults, IToggleFilterEndDate, IToggleFilterGuests, IToggleFilterStartDate, IToggleSearchString, TSearchReducerActions } from '../../redux/search/search.actions';
import { SearchBarActions } from '../../redux/search/search.types';
import { HousingItem } from '../search/searchPage.types';
import './homepage.styles.scss'
import { HomepageProps } from './homepage.types';
import { connect } from 'react-redux';
import { Dispatch } from "redux";
import { StoreState } from '../../redux/root-reducer';
import { composeSearchUrl, decomposeSearchUrl, SearchProps, SearchUrlProps } from '../../components/helperFunctions';
import { CallHistoryMethodAction, push } from 'connected-react-router';
import { selectEndDate, selectNumberOfGuests, selectSearchString, selectStartDate } from '../../redux/search/search.selectors';

const Homepage: React.FC<HomepageProps> = ({ ...props }) => {
    const { searchUrl, searchString, startDateFilter, endDateFilter, numberOfGuestsFilter, loadSearchResultsAction, 
        redirectToSearchResultsPage, toggleSearchStringAction, toggleStartDateFilterAction, toggleEndDateFilterAction, toggleGuestNumberFilerAction } = props;
    const accessToken = localStorage.getItem('accessToken');

    const [searchValues, setSearchValues] = useState<SearchUrlProps>();
    
    const getSearchResults = () => {
        return axios
            .get(`http://localhost:3001/api/housing/`, {
                'headers': {
                    Authorization: 'Bearer ' + accessToken
                }
            })
            .then((response: any) => {
                console.log(response.data)
                loadSearchResultsAction(response.data);
            })
            .catch((error: any) => {
                console.log(error);
            })
    }

    const toggleFiltersFromUrl = (params: SearchUrlProps) => {
        toggleSearchStringAction(params.searchString);

        if (params.startDate) {
            const date = new Date(params.startDate)
            toggleStartDateFilterAction(date);
        }

        if (params.endDate) {
            const date = new Date(params.endDate)
            toggleEndDateFilterAction(date);
        }

        if (params.numberOfGuests) {
            toggleGuestNumberFilerAction(parseInt(params.numberOfGuests))
        }
    }

    useEffect(()=> {
        if(searchUrl) {
            const searchVals = decomposeSearchUrl(searchUrl);
            setSearchValues({
                searchString: searchVals.searchStringUrl,
                startDate: searchVals.startDateFilterUrl,
                endDate: searchVals.endDateFilterUrl,
                numberOfGuests: searchVals.guestNumberFilterUrl
            })
        }
    }, [searchUrl])

    useEffect(() => {
        if (searchValues) {
            toggleFiltersFromUrl(searchValues);
        }
    }, [searchValues])

    const handleButtonCLick = () => {
        getSearchResults();
        redirectToSearchResultsPage({
            searchString: searchString,
            startDate: startDateFilter,
            endDate: endDateFilter,
            numberOfGuests: numberOfGuestsFilter
        });
        
    }

    return (
        <div className="homepage">
            <img className='home-image' src={backgroundImage} alt="backgorund" />
            <div className='homepage-banner'>
                <p className='banner-text'>Not sure where to go? Perfect?</p>
                <button className='banner-button' onClick={handleButtonCLick}>I'm flexible</button>
            </div>
        </div>
    );
};


const mapStateToProps = (state: StoreState): { searchUrl: string, searchString: string, startDateFilter: Date, endDateFilter: Date, numberOfGuestsFilter: number } => {
    return {
        searchUrl: state.router.location.search,
        searchString: selectSearchString(state),
        startDateFilter: selectStartDate(state),
        endDateFilter: selectEndDate(state),
        numberOfGuestsFilter: selectNumberOfGuests(state)
    }
}

const mapDispatchToProps = (dispatch: Dispatch<CallHistoryMethodAction | TSearchReducerActions>) => {
    return {
        toggleSearchStringAction: (data: string) => dispatch<IToggleSearchString>({ type: SearchBarActions.TOGGLE_SEARCH_STRING, data: data }),
        toggleStartDateFilterAction: (data: Date) => dispatch<IToggleFilterStartDate>({ type: SearchBarActions.TOGGLE_FILTER_START_DATE, data: data }),
        toggleEndDateFilterAction: (data: Date) => dispatch<IToggleFilterEndDate>({ type: SearchBarActions.TOGGLE_FILTER_END_DATE, data: data }),
        toggleGuestNumberFilerAction: (data: number) => dispatch<IToggleFilterGuests>({ type: SearchBarActions.TOGGLE_FILTER_GUESTS, data: data }),
        redirectToSearchResultsPage: (data: SearchProps) => dispatch(push(composeSearchUrl(data))),
        loadSearchResultsAction: (data: HousingItem[]) => dispatch<ILoadSearchResults>({ type: SearchBarActions.LOAD_SEARCH_RESULTS, data: data}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);