interface IGameAction {
	type: "CORRECT" | "WRONG" | "RESTART"
	payload: IGameState
}
interface IGameState {
	score?: number
	chance?: number
  comment?: string
  is1correct?: boolean
  is2correct?: boolean
  is3correct?: boolean
  is4correct?: boolean
}

export const CORRECT = "CORRECT"
export const WRONG = "WRONG"
export const RESTART = "RESTART"

export const gameReducer = (
	state: IGameState,
	{ type, payload }: IGameAction,
) => {
	switch (type) {
		case CORRECT:
				return {
					...state,
					...payload
				}
    case WRONG:
      return {
        ...state,
        ...payload
      }
    case RESTART:
      return {
        ...state,
        ...payload
      }
		default:
			return state
	}
}
