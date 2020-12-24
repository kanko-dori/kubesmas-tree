import React from 'react';
import { Calendar } from '../components/Calendar';
import { Clock } from "../components/Clock";
import { ShowState } from "../components/CurrentState";
import { Hexagon } from '../components/Hexagon';
import { LiffUser } from '../components/LiffUser';
import { RadioInput } from "../components/RadioInput";
import { VoteStatus } from '../components/VoteStatus';
import { interval } from '../constants';
import { TopPageHandler } from "../containers/TopPageContainer";
import './TopPage.css';

interface OwnProps {
    inputValue: string,
    selectedValue: number,
    clickCount: number,
    connected: boolean,
    pods: number,
    //現在のイルミネーションパターンと思われ
    pattern: number,
    //各イルミネーションの統計
    patterns: number[],

}

type Props = OwnProps & TopPageHandler

//const socket = new WebSocket(wsEndpoint);

export class TopPage extends React.Component<Props> {


    componentWillMount() {
        // socket.onopen = this.props.handleTest

    }

    componentDidMount() {
        //初回アップデート

        this.props.handleGetCurrentState()
        setInterval(this.props.handleGetCurrentState, interval)
    }

    render() {
        return (
            <div className="TopPage">
                <h1 className="TopPage-title">
                    <p className="TopPage-title-kubesmas">kubesmas</p>
                    <p className="TopPage-title-tree">tree</p>
                </h1>
                <Hexagon size={15} top={-3} left={59}>
                    <Calendar />
                </Hexagon>
                <Hexagon size={15} top={11} left={35}>
                    <Clock />
                </Hexagon>
                <Hexagon size={15} top={25} left={59}>
                    <LiffUser />
                </Hexagon>
                <RadioInput
                    selectedValue={this.props.selectedValue}
                    onChangeValue={this.props.handleOnSelectValue}
                />
                {/*<SubmitButton title='Click me' onClick={this.props.handleOnClick}/>
                <SubmitButton title='test' onClick={this.props.handleGetCurrentState}/>*/}
                <Hexagon size={25} top={25} left={-4}>
                    <ShowState
                        selectedValue={this.props.selectedValue}
                        connected={this.props.connected}
                        clickCount={this.props.clickCount}
                    />
                </Hexagon>
                <VoteStatus pattern={this.props.pattern} />
            </div>
        )
    }
}
