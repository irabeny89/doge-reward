import localData from './local-data'

export const gameInitialState = {
  score: 0,
  chance: localData.game.chanceLimit,
  comment: "",
  is1correct: false,
  is2correct: false,
  is3correct: false,
  is4correct: false
}