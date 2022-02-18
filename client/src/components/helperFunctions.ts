export interface SearchProps {
    searchString: string;
    startDate: Date;
    endDate: Date;
    numberOfGuests: number;
}

export interface SearchUrlProps {
    searchString: string;
    startDate: string | null;
    endDate: string | null;
    numberOfGuests: string | null;
}

export const getParameterByName = (name: string, url: string) => {
    const formattedName = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + formattedName + '(=([^&#]*)|&|#|$)');
    const results = regex.exec(url);

    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

export const composeSearchUrl = (data: SearchProps) => {
    const urlArray = [`/results?search_query=${data.searchString}`];
    if(data.startDate) {
        urlArray.push(`&sdt=${data.startDate.toISOString()}`);
    }

    if(data.endDate) {
        urlArray.push(`&edt=${data.endDate.toISOString()}`);
    }

    if(data.numberOfGuests) {
        urlArray.push(`&guests=${data.numberOfGuests}`);
    }

    return urlArray.join("");
};

export const decomposeSearchUrl = (url: string) => {
    const result = {
        searchStringUrl: getParameterByName('search_query', url)!,
        startDateFilterUrl: getParameterByName('sdt', url)!,
        endDateFilterUrl: getParameterByName('edt', url)!,
        guestNumberFilterUrl: getParameterByName('guests', url)!
    }

    return result;
}