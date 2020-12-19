import React from 'react';
import { Calendar } from '../components/Calendar';
import { Clock } from "../components/Clock";
import { ShowState } from "../components/CurrentState";
import { Hexagon } from '../components/Hexagon';
import { RadioInput } from "../components/RadioInput";
import { TopPageHandler } from "../containers/TopPageContainer";
import { socket } from "../socket";
import './TopPage.css';

interface OwnProps {
    inputValue: string,
    selectedValue: string,
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
        socket.onopen = function (ev) {
            console.log("Success")
        }
        socket.onerror = function (ev) {
            console.log("Error")
        }
        socket.onclose = function (ev) {
            console.log(ev.code)
        }
        socket.onmessage = function (ev) {
            console.log(ev.data)
        }
    }

    componentWillUnmount() {
        // socket.close()
    }

    render() {
        return (
            <div className="TopPage">
                <h1 className="TopPage-title">
                    <p className="TopPage-title-kubesmas">kubesmas</p>
                    <p className="TopPage-title-tree">tree</p>
                </h1>
                <Hexagon size={10} top={29} left={78}>
                    <Calendar />
                </Hexagon>
                <Hexagon size={25} top={2.5} left={35}>
                    <Clock />
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
                {/* <VoteStatus pods={this.props.pods} pattern={this.props.pattern} patterns={this.props.patterns}/> */}
            </div>
        )
    }
}
