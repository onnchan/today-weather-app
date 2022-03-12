import React from 'react';

interface Props {
    searchCallback: (city: string, country: string) => void;
    clearCallback: () => void;
}

interface State {
    isClear: boolean;
}

export default class SearchBar extends React.Component<Props, State> {
    private _citySearchInputRef: React.RefObject<HTMLInputElement>;
    private _countrySearchinputRef: React.RefObject<HTMLInputElement>;

    public constructor(props: Props) {
        super(props);

        this._citySearchInputRef = React.createRef();
        this._countrySearchinputRef = React.createRef();

        this._onSearch = this._onSearch.bind(this);
        this._onClear = this._onClear.bind(this);

        this.state = {
            isClear: false,
        };
    }

    public render(): JSX.Element {
        return (
            <div id="search-bar-container">
                <div id="search-city-title" className="search-title">
                    City:
                </div>
                <input id="city-input" type="text" className="input-field" ref={this._citySearchInputRef}></input>
                <div id="search-country-title" className="search-title">
                    Country:
                </div>
                <input id="country-input" type="text" className="input-field" ref={this._countrySearchinputRef}></input>
                <input type="button" id="search-button" value="Search" onClick={this._onSearch} />
                <input type="button" id="clear-button" value="Clear" onClick={this._onClear} />
            </div>
        );
    }

    private _onSearch(): void {
        const cityInput = this._citySearchInputRef.current ? this._citySearchInputRef.current.value : '';
        const countryInput = this._countrySearchinputRef.current ? this._countrySearchinputRef.current.value : '';

        this.props.searchCallback(cityInput, countryInput);
    }

    private _onClear(): void {
        const cityTextField = this._citySearchInputRef.current as HTMLInputElement;
        const countryTextField = this._countrySearchinputRef.current as HTMLInputElement;

        cityTextField.value = '';
        countryTextField.value = '';

        this.props.clearCallback();
    }
}
