import actionCreatorFactory from "typescript-fsa";
import { GetBody } from "../types/type";


const actionCreator = actionCreatorFactory()

export const TextInputActions = {
    //VOTE
    updateSelectedValue: actionCreator<number>('ACTION_UPDATE_SELECTED_VALUE'),
    //GET
    fetchVoteData: actionCreator<GetBody>('ACTION_FETCH_VOTE_DATA'),

    //Test用コード
    updateClickCount: actionCreator('ACTION_UPDATE_CLICK_COUNT')


}