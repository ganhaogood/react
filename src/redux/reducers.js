import {combineReducers} from "redux"


const initXxx=1
function xxx(state=initXxx,action) {
  switch (action.type){
    default:
      return state
  }
}

const initYyy={}
function yyy(state=initYyy,action) {
  switch (action.type){
    default:
      return state
  }
}

export default combineReducers({
  xxx,
  yyy
})