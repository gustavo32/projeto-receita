//reducers stays here
import {
	GET_ITEMS_PRIMARY,
	GET_ITEMS_OTHER,
	ITEMS_LOADING
} from "../actions/types";
import uuid from "uuid";
import logo from "../imagens/logo.png";

const initalState = {
	receitasPrimary: [],
	receitasOther: [],
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
		default:
			return state;
	}
}