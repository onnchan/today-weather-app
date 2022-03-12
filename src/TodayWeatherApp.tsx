import React from 'react';
import ResultError from './components/ResultError';
import SearchBar from './components/SearchBar';
import SearchHistory from './components/SearchHistory';
import SearchResult from './components/SearchResult';
import { HistoryInfo, SearchState, WeatherResult } from './Constant';

interface State {
    resultState: SearchState;
    searchResult: WeatherResult | undefined;
    searchHistory: HistoryInfo[];
    errorMessage: string;
}

export default class TodayWeatherApp extends React.Component<{}, State> {
    public constructor(props: {}) {
        super(props);

        this.state = {
            resultState: SearchState.None,
            searchResult: undefined,
            errorMessage: '',
            searchHistory: [],
        };

        this._renderSearchBar = this._renderSearchBar.bind(this);
        this._renderResult = this._renderResult.bind(this);
        this._renderSearchHistory = this._renderSearchHistory.bind(this);
        this._clearData = this._clearData.bind(this);
        this._getWeather = this._getWeather.bind(this);
        this._deleteHistory = this._deleteHistory.bind(this);
    }

    public render(): JSX.Element {
        return (
            <div id="today-weather-app">
                <div id="app-header">Today's Weather App</div>
                <hr />
                <div id="main-container">
                    {this._renderSearchBar()}
                    {this._renderResult()}
                    {this._renderSearchHistory()}
                </div>
            </div>
        );
    }

    private _renderSearchBar(): JSX.Element {
        return <SearchBar searchCallback={this._getWeather} clearCallback={this._clearData} />;
    }

    private _renderResult(): JSX.Element | null {
        if (this.state.resultState === SearchState.None) return null;
        if (this.state.resultState === SearchState.Success) {
            return <SearchResult weatherResult={this.state.searchResult} />;
        }
        return <ResultError message={this.state.errorMessage} />;
    }

    private _renderSearchHistory(): JSX.Element {
        return (
            <SearchHistory
                historyInfo={this.state.searchHistory}
                searchCallback={this._getWeather}
                deleteCallback={this._deleteHistory}
            />
        );
    }

    private _getWeather(city: string, country: string): void {
        const xhttp = new XMLHttpRequest();
        xhttp.onload = (ev: ProgressEvent<EventTarget>): any => {
            if (xhttp.status === 200) {
                const date = new Date();
                const data = JSON.parse(xhttp.responseText);
                const weatherData: WeatherResult = {
                    location: data.name + ', ' + data.sys.country,
                    mainWeather: data.weather[0].main,
                    description: data.weather[0].description,
                    temperature: data.main.temp_min + '°C - ' + data.main.temp_max + '°C',
                    humidity: data.main.humidity + '%',
                    icon: data.weather[0].icon,
                    time: date,
                };

                const searchHistory: HistoryInfo = {
                    searchCity: data.name,
                    searchCountry: data.sys.country,
                    searchTime: date,
                };

                const allSearchHistory = this.state.searchHistory;

                allSearchHistory.push(searchHistory);

                this.setState({
                    searchResult: weatherData,
                    resultState: xhttp.status,
                    searchHistory: allSearchHistory,
                });
            } else {
                this.setState({
                    resultState: xhttp.status,
                    errorMessage: xhttp.status + ' ' + xhttp.statusText,
                });
            }
        };

        xhttp.open(
            'GET',
            `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=13f18aa4184dd53c0f3c3d76b647040f`
        );
        xhttp.send();
    }

    private _clearData(): void {
        this.setState({
            resultState: SearchState.None,
            searchResult: undefined,
            errorMessage: '',
        });
    }

    private _deleteHistory(index: number): void {
        const allHistoryInfo = this.state.searchHistory;
        allHistoryInfo.splice(index, 1);

        this.setState({
            searchHistory: allHistoryInfo,
        });
    }
}
