//reducers stays here
import { GET_ITEMS } from "../actions/types";
import uuid from "uuid";
import logo from "../imagens/logo.png";

const initalState = {
	receitas: [
		{
			id: uuid(),
			porcoes: 5,
			tempo_preparo: 20,
			titulo: "Tutu de feijao",
			img_src: logo,
			nome_autor: "Luis Gustavo"
		},
		{
			id: uuid(),
			porcoes: 7,
			tempo_preparo: 45,
			titulo: "Galinhada",
			img_src: logo,
			nome_autor: "Gustavo Resende"
		},
		{
			id: uuid(),
			porcoes: 2,
			tempo_preparo: 35,
			titulo: "Miojo Gourmet",
			img_src: logo,
			nome_autor: "Joao Squinelato"
		},
		{
			id: uuid(),
			porcoes: 1,
			tempo_preparo: 105,
			titulo: "Sorvete de gorgonzola",
			img_src: logo,
			nome_autor: "Someone Anyone"
		}
	]
};

export default function(state = initalState, action) {
	switch (action.type) {
		case GET_ITEMS:
			return {
				...state
			};
		default:
			return state;
	}
}
