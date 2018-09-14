import {
	GET_ITEMS_PRIMARY,
	GET_ITEMS_OTHER,
	ITEMS_LOADING
} from "./types";
import axios from 'axios';

export const getItemsPrimary = () => dispatch => {
	dispatch(setItemsLoading());
	axios.get('/api/receitas/primaryContent').then(res => dispatch({
		type: GET_ITEMS_PRIMARY,
		payload: res.data
	}))
};

export const getItemsOther = () => dispatch => {
	dispatch(setItemsLoading());
	axios.get('/api/receitas/otherContent').then(res => dispatch({
		type: GET_ITEMS_OTHER,
		payload: res.data
	}))
};


export const setItemsLoading = () => {
	return {
		type: ITEMS_LOADING
	};
};