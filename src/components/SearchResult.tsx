import React from 'react';
import { WeatherResult } from '../Constant';

interface Props {
    weatherResult?: WeatherResult;
}

export default class SearchResult extends React.Component<Props> {
    public constructor(props: Props) {
        super(props);
    }

    public render(): JSX.Element {
        const { description, temperature, humidity, time, location, mainWeather } = this.props
            .weatherResult as WeatherResult;
        return (
            <div id="result-container">
                <div id="result-location">{location}</div>
                <div id="main-weather">{mainWeather}</div>
                <table>
                    <tbody>
                        <tr>
                            <td className="title">Description:</td>
                            <td className="value">{description}</td>
                        </tr>
                        <tr>
                            <td className="title">Temperature:</td>
                            <td className="value">{temperature}</td>
                        </tr>
                        <tr>
                            <td className="title">Humidity:</td>
                            <td className="value">{humidity}</td>
                        </tr>
                        <tr>
                            <td className="title">Time:</td>
                            <td className="value">{time.toLocaleString([], { hour12: true })}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}
