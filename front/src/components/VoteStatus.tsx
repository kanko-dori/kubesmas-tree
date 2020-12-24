import React from 'react';
import './VoteStatus.css';

interface OwnProps {
    pattern: number,
}

type Props = OwnProps

export const VoteStatus: React.FC<Props> = props => {
    return (
        <div className="VoteStatus">
            <p className="VoteStatus-current">current</p>
            {props.pattern === 1 && <p className="VoteStatus-pattern">&gt;static</p>}
            {props.pattern === 2 && <p className="VoteStatus-pattern">&gt;wave</p>}
            {props.pattern === 3 && <p className="VoteStatus-pattern">&gt;random</p>}
            {props.pattern === 4 && <p className="VoteStatus-pattern">&gt;special</p>}
        </div>
    )
}