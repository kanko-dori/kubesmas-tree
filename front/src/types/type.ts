//
// interface VoteBody {
//     pods: number,
//     illuminationPattern: number,
//     illuminationData: illuminationData,
// }
//
// interface illuminationData {
//     pattern1: number,
//     pattern2: number,
//     pattern3: number,
//     pattern4: number,
// }

export interface GetBody {
    pods: number,
    illuminationPattern: number,
    illuminationData: illuminationData,
}

export interface illuminationData {
    pattern1: number,
    pattern2: number,
    pattern3: number,
    pattern4: number,
}

export interface VoteCallbackBody {
    response: string,
    currentData: GetBody
}
