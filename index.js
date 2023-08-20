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

    if (count == 1) {
      slice.style.width = "100%";
      slice.style.height = "100%";

      slice.innerHTML +=
        "<div class='slice_value' style = 'width:40%'><p>" +
        value +
        "</p></div>";
    } else if (count == 2) {
      slice.style.width = "100%";
      slice.style.justifyContent = "center";

      if (i == 1) slice.style.transform = "translateY(100%)";
      slice.innerHTML +=
        "<div class='slice_value' style = 'width:auto' ><p>" +
        value +
        "</p></div>";
    } else {
      slice.style.transform =
        "rotate(calc(" + angle * i + "deg)) skewY(" + (90 - angle) + "deg)";
    }

    slice.innerHTML +=
      '<div style="transform: skewY(' +
      -(90 - angle) +
      'deg)" class="slice_value" ><p style = "rotate: ' +
      -25 +
      'deg">' +
      value +
      "</p></div>";

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

  var rotating = 0;

  const spinButton = document.getElementById("spinBtn");
  let rotationFinished = true;
  spinButton.addEventListener("click", () => {
    const circle = document.getElementsByClassName("circle")[0];
    const result = document.getElementsByClassName("preValue")[0];
    const randomDegrees = Math.abs(Math.floor(Math.random() * 3600));
    rotating += randomDegrees;
    rotationFinished = false;

    const slice = document.getElementsByClassName("slice");

    const angle = 360 / rowCount;

    var offsetAngle = rotating % 360;

    if (offsetAngle % angle == 0) {
      result.innerHTML = "Raw";
    } else {
      var cnt = (offsetAngle - (offsetAngle % angle)) / angle;
      if (cnt != 0) {
        cnt = rowCount - cnt;
      }
      circle.style.transform = `rotate(${rotating}deg)`;
    }
    circle.addEventListener("transitionend", () => {
      rotationFinished = true;
      result.innerHTML =
        "Previous Value: " + slice[cnt].childNodes[0].childNodes[0].innerHTML;
    });
  });
});
