import React, { useEffect, useState } from "react";
import './navbar.styles.scss';
import logoImage from '../../assets/logo.png';
import { NavbarComponentProps } from "./navbar.types";
import DropdownComponent from "./dropdown.component";
import { connect } from 'react-redux';
import { Dispatch } from "redux";
import { push, CallHistoryMethodAction } from "connected-react-router";
import { SearchIcon, GlobeAltIcon, MenuIcon, UserCircleIcon, UsersIcon } from '@heroicons/react/solid';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import { composeSearchUrl, decomposeSearchUrl, SearchProps, SearchUrlProps } from "../helperFunctions";
import { StoreState } from "../../redux/root-reducer";
import { ILoadSearchResults, IResetFilters, IToggleFilterEndDate, IToggleFilterGuests, IToggleFilterStartDate, IToggleSearchString, TSearchReducerActions } from "../../redux/search/search.actions";
import { SearchBarActions } from "../../redux/search/search.types";
import { selectEndDate, selectNumberOfGuests, selectSearchString, selectStartDate } from "../../redux/search/search.selectors";
import { HousingItem } from "../../pages/search/searchPage.types";
import axios from "axios";

const NavbarComponent: React.FC<NavbarComponentProps> = ({ ...props }) => {
    const { path, searchUrl, searchString, startDateFilter, endDateFilter, numberOfGuestsFilter, placeholder,
        toggleSearchStringAction, toggleStartDateFilterAction, toggleEndDateFilterAction, toggleGuestNumberFilerAction,
        resetSearchFilters, redirectToHome, redirectToSearchResultsPage, loadSearchResultsAction, redirectToAddHousing } = props;

    const [openMenu, setOpenMenu] = useState<boolean>(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [searchValue, setSearchValue] = useState<string>("");
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>(new Date());
    const [numberOfGuests, setNumberOfGuests] = useState<number>(1);
    const [searchValues, setSearchValues] = useState<SearchUrlProps>();

    const accessToken = localStorage.getItem('accessToken');

    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: "selection"
    }

    const handleCloseMenu = () => {
        setAnchorEl(null);
        setOpenMenu(false);
    };

    const handleOpenMenu = (event: any) => {
        setAnchorEl(event.currentTarget)
        setOpenMenu(true);
    };

    const handleInputChange = (event: any) => {
        setSearchValue(event.target.value);
    };

    const handleSelectChange = (ranges: any) => {
        setStartDate(ranges.selection.startDate);
        setEndDate(ranges.selection.endDate);
    }
    const handleGuestNumberChange = (event: any) => {
        setNumberOfGuests(event.target.value);
    }

    const handleLogoClick = () => {
        resetSearchFilters();
        redirectToHome();
    }

    const handleCancelButton = () => {
        setStartDate(new Date());
        setEndDate(new Date());
        setSearchValue('');
    };

    const search = () => {
        getSearchResults();
        redirectToSearchResultsPage({
            searchString: searchValue,
            startDate: startDate,
            endDate: endDate,
            numberOfGuests: numberOfGuests
        });
        setSearchValue("");
        setStartDate(new Date());
        setEndDate(new Date());
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
//TODO: 
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

    return (
        <React.Fragment>
            <header className="header-container">
                <div className='image-container'>
                    <img
                        src={logoImage}
                        className="image"
                        alt="Airnbn"
                        onClick={handleLogoClick}
                    />
                </div>
                <div className='search-container'>
                    <input
                        type='text'
                        onChange={handleInputChange}
                        value={searchValue} 
                        placeholder={path !== '/results' ? 'Start your search' : placeholder}/>
                    <SearchIcon className="search-icon" />
                </div>
                <div className='user-container'>
                    <p style={{ color: 'grey', cursor: 'pointer' }} onClick={() => redirectToAddHousing()}>Become a host</p>
                    <GlobeAltIcon className='globe-icon' />
                    <div className='user-icons'>
                        <MenuIcon className='icons' />
                        <UserCircleIcon className='icons' onClick={handleOpenMenu} />
                        <DropdownComponent open={openMenu} handleClose={handleCloseMenu} anchorEl={anchorEl} />
                    </div>
                </div>
            </header>
            {searchValue &&
                <div className='date-range'>
                    <DateRangePicker
                        ranges={[selectionRange]}
                        minDate={new Date()}
                        rangeColors={["#FD5B61"]}
                        onChange={handleSelectChange}
                    />
                    <div className='guests-container'>
                        <h2 className='guests-heading'>Number of guests</h2>
                        <UsersIcon className='users-icon' />
                        <input
                            type="number"
                            className='guest-input'
                            value={numberOfGuests}
                            min={1}
                            onChange={handleGuestNumberChange}
                        />
                    </div>
                    <div className="button-group">
                        <button className='cancel-button' onClick={handleCancelButton}>Cancel</button>
                        <button className='search-button' onClick={search}>Search</button>
                    </div>
                </div>
            }
        </React.Fragment>
    )
};

const mapStateToProps = (state: StoreState): { path: string, searchUrl: string, searchString: string, startDateFilter: Date, endDateFilter: Date, numberOfGuestsFilter: number } => {
    return {
        path: state.router.location.pathname,
        searchUrl: state.router.location.search,
        searchString: selectSearchString(state),
        startDateFilter: selectStartDate(state),
        endDateFilter: selectEndDate(state),
        numberOfGuestsFilter: selectNumberOfGuests(state)
    }
}

const mapDispatchToProps = (dispatch: Dispatch<CallHistoryMethodAction | TSearchReducerActions>) => {
    return {
        redirectToHome: () => dispatch(push('/')),
        redirectToSearchResultsPage: (data: SearchProps) => dispatch(push(composeSearchUrl(data))),
        toggleSearchStringAction: (data: string) => dispatch<IToggleSearchString>({ type: SearchBarActions.TOGGLE_SEARCH_STRING, data: data }),
        toggleStartDateFilterAction: (data: Date) => dispatch<IToggleFilterStartDate>({ type: SearchBarActions.TOGGLE_FILTER_START_DATE, data: data }),
        toggleEndDateFilterAction: (data: Date) => dispatch<IToggleFilterEndDate>({ type: SearchBarActions.TOGGLE_FILTER_END_DATE, data: data }),
        toggleGuestNumberFilerAction: (data: number) => dispatch<IToggleFilterGuests>({ type: SearchBarActions.TOGGLE_FILTER_GUESTS, data: data }),
        resetSearchFilters: () => dispatch<IResetFilters>({ type: SearchBarActions.RESET_FILTERS}),
        loadSearchResultsAction: (data: HousingItem[]) => dispatch<ILoadSearchResults>({ type: SearchBarActions.LOAD_SEARCH_RESULTS, data: data}),
        redirectToAddHousing: () => dispatch(push('/add-housing'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavbarComponent);