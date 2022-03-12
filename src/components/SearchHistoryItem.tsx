import { Delete, Search } from '@material-ui/icons';
import React from 'react';

interface Props {
    city: string;
    country: string;
    time: Date;
    index: number;
    searchCallback: (city: string, country: string) => void;
    deleteCallback: (index: number) => void;
}

export default class SearchHistoryItem extends React.Component<Props> {
    public constructor(props: Props) {
        super(props);

        this._onSearch = this._onSearch.bind(this);
        this._onDelete = this._onDelete.bind(this);
    }

    public render(): JSX.Element {
        return (
            <div id="search-history-item">
                <div id="history-index">{this.props.index + 1 + '. '}</div>
                <div id="history-location">{this.props.city + ', ' + this.props.country}</div>
                <div id="right-container">
                    <div id="history-time">{this.props.time.toLocaleTimeString([], { hour12: true })}</div>
                    <Search className="history-button" id="history-item-search-button" onClick={this._onSearch} />
                    <Delete className="history-button" id="history-item-delete-button" onClick={this._onDelete} />
                </div>
            </div>
        );
    }

    private _onSearch(): void {
        const { city, country, index } = this.props;
        this.props.deleteCallback(index);
        this.props.searchCallback(city, country);
    }

    private _onDelete(): void {
        const { index } = this.props;

        this.props.deleteCallback(index);
    }
}
