import React from 'react';
import { HistoryInfo } from '../Constant';
import SearchHistoryItem from './SearchHistoryItem';

interface Props {
    historyInfo: HistoryInfo[];
    searchCallback: (city: string, country: string) => void;
    deleteCallback: (index: number) => void;
}

export default class SearchHistory extends React.Component<Props> {
    public constructor(props: Props) {
        super(props);

        this._renderHistoryItemList = this._renderHistoryItemList.bind(this);
    }

    public render(): JSX.Element {
        return (
            <div id="search-history-container">
                <div id="search-history-title">Search History</div>
                <hr />
                {this._renderHistoryItemList()}
            </div>
        );
    }

    private _renderHistoryItemList(): JSX.Element[] {
        const historyItemList = this.props.historyInfo;

        const components = historyItemList.map((historyInfo: HistoryInfo, index: number): JSX.Element => {
            const { searchCity, searchCountry, searchTime } = historyInfo;
            return (
                <SearchHistoryItem
                    key={searchCity.toLowerCase() + '_' + index}
                    index={index}
                    city={searchCity}
                    country={searchCountry}
                    time={searchTime}
                    searchCallback={this.props.searchCallback}
                    deleteCallback={this.props.deleteCallback}
                />
            );
        });

        return components;
    }
}
