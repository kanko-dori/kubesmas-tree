import {reducerWithInitialState} from "typescript-fsa-reducers";
import {TextInputActions} from "./actions/action";
import {GetBody, illuminationData} from "./types/type";
import {dispatchSpecialValue} from "./constants";

export interface State {
    selectedValue: number,
    clickCount: number,
    pods: number,
    pattern: number,
    patterns: number[],
}

export const initialState: State = {
    selectedValue: 0,
    clickCount: 0,
    pods: 0,
    pattern: 1,
    patterns: [0, 0, 0, 0]
}

export const Reducer = reducerWithInitialState(initialState)
    .case(TextInputActions.updateSelectedValue, (state, selectedValue) => {
        return {...state, selectedValue: selectedValue}
    })

    .case(TextInputActions.fetchVoteData, (state: State, voteBody: GetBody) => {
        return {
            ...state,
            pods: voteBody.pods,
            pattern: voteBody.pods < dispatchSpecialValue ? voteBody.illuminationPattern : 4,
            //Todo ここパターン数増減したときヤバいよね（Kotlinなら良い感じに書けるのに）
            patterns: mapIlluminationDataToNumArray(voteBody.illuminationData)
        }
    })

//Todo にゃ～ん、辛い
function mapIlluminationDataToNumArray(data: illuminationData): number[] {
    return [data.pattern1, data.pattern2, data.pattern3, data.pattern4]
}