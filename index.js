var rowCount = 0;

window.onload = function () {
  init();
};

/*-------------- WHEEL SLICE INITIALISE -------------*/

function init() {
  const table = document.getElementsByClassName("inputs")[0];

  rowCount = table.rows.length;

  const slices = document.getElementsByClassName("slices")[0];
  slices.innerHTML = "";
  const count = rowCount;
  const angle = 360 / count;

  for (var i = 0; i < count; i++) {
    var value = table.rows[i].children[0].children[0].value;
    const slice = document.createElement("div");
    slice.classList.add("slice");
    if (i % 2 == 0) {
      slice.style.backgroundColor = "var(--red)";
    } else slice.style.backgroundColor = "var(--dark)";

    if (count == 2) {
      slice.style.width = "100%";
      if (i == 1) slice.style.transform = "translateY(100%)";
      slice.innerHTML += "<span>" + value + "<span>";
    } else {
      slice.style.transform =
        "rotate(calc(" + angle * i + "deg)) skewY(" + (90 - angle) + "deg)";
    }

    slice.innerHTML +=
      '<span style="transform: skewY(' +
      -(90 - angle) +
      'deg)">' +
      value +
      "<span>";

    slices.appendChild(slice);
  }
}

/*---------- DELETE ROW  -----------*/

function deleteRow(button) {
  const tr = button.parentNode.parentNode;
  tr.parentNode.removeChild(tr);

  rowCount--;
  init();
}

/*---------- ADD ROW  -------------*/
function addRow() {
  const tableBody = document.getElementsByTagName("tbody")[0];
  tableBody.innerHTML +=
    "<tr class='amt_row'><td><input type='text' value='Present' /></td><td><span class='delBtn' onClick='deleteRow(this);'>X</span></td></tr>";
  rowCount++;
  init();
  initChangeEvent();
}

function initChangeEvent() {
  const inputElements = document.querySelectorAll("input");
  inputElements.forEach((inputElement) => {
    inputElement.addEventListener("input", function (event) {
      const changedInput = event.target;
      const newValue = changedInput.value;
      init();
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initChangeEvent();

  /*-------- SPIN WHEEL -----------*/

  const spinButton = document.getElementById("spinBtn");
  spinButton.addEventListener("click", () => {
    const circle = document.getElementsByClassName("circle")[0];
    const randomDegrees = Math.abs(Math.floor(Math.random() * 3600));
    circle.style.transform = `rotate(${randomDegrees}deg)`;
  });
});
