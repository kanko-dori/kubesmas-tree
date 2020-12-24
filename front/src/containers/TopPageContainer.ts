// eslint-disable-next-line @typescript-eslint/no-unused-vars
import store, {AppState} from "../stores/store";
import {Dispatch} from "redux";
import {connect} from "react-redux";
import {TopPage} from "../pages/TopPage";
import {TextInputActions} from "../actions/action";
import {socket} from "../socket";
import {GetBody, VoteCallbackBody} from "../types/type";
import {myLiffId} from "../constants";
import liff from "@line/liff";

export interface TopPageHandler {
    handleOnSelectValue(value: string): void

    handleGetCurrentState(): void

    handleOnClick(): void
}

const mapStateToProps = (appState: AppState) => {
    return {
        selectedValue: appState.state.selectedValue,
        clickCount: appState.state.clickCount,
        connected: appState.socket.connected,
        pods: appState.state.pods,
        pattern: appState.state.pattern,
        patterns: appState.state.patterns
    }
}


const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        handleOnSelectValue: (value: string) => {
            //liff.init({liffId: myLiffId}).then(() => {
            //    if (!liff.isLoggedIn()) {
            //        liff.login()
            //    }else {
            //        liff.getProfile().then(profile => {
                        const id = "AABBCCEE"
                        //console.log(`{"action":"VOTE","pattern":${value},"uid":"${id}"}`)
                        if (socket.readyState === WebSocket.OPEN) {
                            socket.send(`{"action":"VOTE","pattern":${value},"uid":"${id}"}`)
                            socket.onmessage = function (e) {
                                const data: VoteCallbackBody = JSON.parse(e.data)
                                //console.log(data);
                                //投票結果のイベント発火
                                dispatch(TextInputActions.fetchVoteData(data.currentData))
                                //console.log(data.currentData)
                                //投票結果のレスポンスのイベント発火
                                dispatch(TextInputActions.updateSelectedValue(data.currentData.pods))
                            }
                        }
            //        })
            //    }
            //})
        },

        handleGetCurrentState: () => {
            if (socket.readyState === WebSocket.OPEN) {
                socket.send("{\"action\":\"GET\"}")
                socket.onmessage = function (e) {
                    //Todo ここにロジック入れてるんですがよろしいんでしょうか？
                    const data: GetBody = JSON.parse(e.data);
                    //console.log("Interval method")
                    // console.log(data)
                    dispatch(TextInputActions.updateSelectedValue(data.pods))
                    dispatch(TextInputActions.fetchVoteData(data))
                }
            }
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopPage)