import React from 'react';
import './CurrentState.css';

interface OwnProps {
    selectedValue: number,
    clickCount: number,
    connected: boolean
}

type Props = OwnProps

export const ShowState: React.FC<Props> = props => {
    return (
        <div className="ShowState">
            <p className="ShowState-count">{props.selectedValue}</p>
            <p className="ShowState-sub">connected</p>
        </div>
    )
}