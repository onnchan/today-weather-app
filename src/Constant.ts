export enum SearchState {
    None = 0,
    NotFound = 404,
    Forbidden = 403,
    Success = 200,
    BadRequest = 400,
}

export interface WeatherResult {
    location: string;
    mainWeather: string;
    description: string;
    temperature: string;
    humidity: string;
    time: Date;
    icon: string;
}

export interface HistoryInfo {
    searchCity: string;
    searchCountry: string;
    searchTime: Date;
}
