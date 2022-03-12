import React from 'react';

interface Props {
    message: string;
}

export default class ResultError extends React.Component<Props> {
    public constructor(props: Props) {
        super(props);
    }

    public render(): JSX.Element {
        return <div id="result-error">{this.props.message}</div>;
    }
}
