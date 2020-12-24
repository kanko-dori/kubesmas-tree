import React, { useState } from 'react';
import './RadioInput.css';
import { Hexagon } from './Hexagon';

interface OwnProps {
    selectedValue: number,
    onChangeValue: Function
}

type Props = OwnProps

export const RadioInput: React.FC<Props> = props => {
    const [checked, setChecked] = useState('');

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.onChangeValue(e.target.value);
        setChecked(e.target.value);
    }
    return (
        <div className="RadioInput">
            <h3 className="RadioInput-title">
                <p className="RadioInput-title-lighting">lighting</p>
                <p className="RadioInput-title-vote">Vote</p>
            </h3>
            <Hexagon size={18} top={16} left={0}>
                <input
                    type='radio'
                    className="RadioInput-input"
                    name='radio_group'
                    value='1'
                    id="radio1"
                    onChange={onChange}
                    checked={checked === '1' ? true : false}
                />
                <label htmlFor="radio1" className="RadioInput-label">
                    <span className="RadioInput-pattern-name">stAtic</span>
                </label>
            </Hexagon>
            <Hexagon size={18} top={0} left={28}>
                <input
                    type='radio'
                    className="RadioInput-input"
                    name='radio_group'
                    value='2'
                    id="radio2"
                    onChange={onChange}
                    checked={checked === '2' ? true : false}
                />
                <label htmlFor="radio2" className="RadioInput-label">
                    <span className="RadioInput-pattern-name">Wave</span>
                </label>
            </Hexagon>
            <Hexagon size={18} top={16} left={28*2}>
                <input
                    type='radio'
                    className="RadioInput-input"
                    name='radio_group'
                    value='3'
                    id="radio3"
                    onChange={onChange}
                    checked={checked === '3' ? true : false}
                />
                <label htmlFor="radio3" className="RadioInput-label">
                    <span className="RadioInput-pattern-name">Random</span>
                </label>
            </Hexagon>
        </div>
    )
}