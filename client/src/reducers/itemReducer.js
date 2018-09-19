//reducers stays here
import {
  GET_ITEMS_PRIMARY,
  GET_ITEMS_OTHER,
  ITEMS_LOADING,
  PUT_LIKE
} from "../actions/types";
import update from 'react-addons-update';

const initalState = {
  receitasPrimary: [],
  receitasOther: [],
  receita: [],
  loading: false
};

export default function (state = initalState, action) {
  switch (action.type) {
    case GET_ITEMS_PRIMARY:
      return {
        ...state,
        receitasPrimary: action.payload,
        loading: false
      };
    case GET_ITEMS_OTHER:
      return {
        ...state,
        receitasOther: action.payload,
        loading: false
      };
    case ITEMS_LOADING:
      return {
        ...state,
        loading: true
      };
    case PUT_LIKE:
      return update(state, {
        receita: {
          [action.id]: {
            likes_total: {
              $set: action.payload
            }
          }
        }
      });


    default:
      return state;
  }
}