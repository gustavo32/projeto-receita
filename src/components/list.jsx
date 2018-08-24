import React, { Component } from "react";

class List extends React.Component {
	render() {
		return (
			<div>
				<h3>Nosso exclusivo sistema de busca para você!</h3>
				<hr />
				<p>
					Digite alguns dos seus alimentos aqui e veja a mágica acontecer...
				</p>
				<div id="myDIV" className="header">
					<h5 style={{ margin: "5px" }} />
					<input type="text" id="myInput" placeholder="Title..." />
					<span onClick={this.newElement} className="addBtn">
						Ok!
					</span>
				</div>

				<ul id="myUL" />
			</div>
		);
	}

	newElement = () => {
		let li = document.createElement("li");
		let inputValue = document.getElementById("myInput").value;
		let t = document.createTextNode(inputValue);
		li.appendChild(t);
		if (inputValue === "") {
			alert("Você deve escrever algo!");
		} else {
			document.getElementById("myUL").appendChild(li);
		}
		document.getElementById("myInput").value = "";

		let span = document.createElement("SPAN");
		let txt = document.createTextNode("\u00D7");
		span.className = "close";
		span.appendChild(txt);
		li.appendChild(span);

		let close = document.getElementsByClassName("close");

		for (let i = 0; i < close.length; i++) {
			close[i].onclick = function() {
				let div = this.parentElement;
				div.style.display = "none";
			};
		}
	};
}

export default List;
