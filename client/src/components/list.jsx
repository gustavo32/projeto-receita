import React, { Component } from "react";

class List extends React.Component {
	render() {
		return (
			<div className="mt-4">
				<div style={{ margin: "0 5% 0 5%" }}>
					<div id="myDIV" className="header">
						<div>
							<input type="text" id="myInput" placeholder="Digite um item..." />
							<span onClick={this.newElement} className="addBtn">
								<i className="fa fa-arrow-right" />
							</span>
						</div>
					</div>

					<ul id="myUL" />
				</div>
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
		document.getElementById("myInput").focus();

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
