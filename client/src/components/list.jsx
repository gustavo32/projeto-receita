import React from "react";

class List extends React.Component {
  componentDidMount() {
    document.addEventListener("keyup", e => {
      if (document.getElementById("myInput").focus && e.keyCode === 13)
        this.newElement();
    });
  }
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
  newElement() {
    let inputValue = document.getElementById("myInput").value;
    if (inputValue !== "") {
      console.log(document.getElementById("myUL"));
      let array = inputValue.split(",");
      let t;
      for (let i = 0; i < array.length; i++) {
        array[i] = array[i].trimLeft();
        array[i] = array[i].trimRight();
        array[i] = array[i].charAt(0).toUpperCase() + array[i].slice(1);
        t = document.createTextNode(array[i]);
        let li = document.createElement("li");
        li.appendChild(t);

        document.getElementById("myUL").appendChild(li);

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
      }
    } else {
      alert("Você deve digitar algo!");
    }
  }
}

export default List;
