import {ADD_TO_CART,DEL_FROM_CART,CLEAR_CART,SET_TOKEN, SET_PROGRESS, SET_LOC} from "../action/ActionType"
const debug = false;
const initialState = {
  data:[
    // {
    //   "title": "\u8001\u6d0b\u623f",
    //   "img": "https://iq.dxlfile.com/hotel/original/2012-09/20120918150552.jpg-w430h325",
    //   "cast": "\uffe5 4880-9980",
    //   "opinions": [
    //     "\u7279\u8272\u9910\u5385",
    //     "23\u684c",
    //     "\u5362\u6e7e\u533a"
    //   ],
    //   "rooms": [{
    //       "name": "1\u5385",
    //       "img": "https://iq.dxlfile.com/hotel/original/2015-03/20150318101057266.jpg-w200h150"
    //     },
    //     {
    //       "name": "\u5305\u573a",
    //       "img": "https://iq.dxlfile.com/hotel/original/2015-03/20150318101196220.jpg-w200h150"
    //     }
    //   ]
    // }
  ],
  token:'',
  progress:32
}
var reducer = (state = initialState, action) => {
  switch (action.type) {
    // case TEST:
    //   return Object.assign({}, state, {
    //     test: action.test
    //   });
    case SET_TOKEN:
      return Object.assign({},state,{
        token:action.token
      })
    case SET_PROGRESS:
      return Object.assign({}, state, {
        progress:action.progress
      })
    case SET_LOC:
      return Object.assign({}, state, {
        loc:action.loc
      })
    case ADD_TO_CART:
      let flag = false;
      for(let i=0;i<state.data.length;i++){
        if(state.data[i].title === action.item.title){
          flag = true;
        }
      }
      if(flag){
        return Object.assign({},state,{
          data:state.data
        })
      }else{
         return Object.assign({}, state, {
           data: [
             ...state.data,
             {
               title: action.item.title,
               detail: action.item.detail,
               img: action.item.img
             }
           ]
         })
      }
    case DEL_FROM_CART:
      let i=0;
      debug && console.log(state)
      for(i=0;i<state.data.length;i++){
        if(state.data[i].title === action.title)
        break;
      }
      state.data.splice(i,1)
      return Object.assign({},state,{
        data:state.data
      })
    case CLEAR_CART:
      // state={};
      return Object.assign({},state,{
        data:[]
      });
    default:
      return state ;
  }
}

export default reducer;