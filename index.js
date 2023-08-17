window.onload = function () {
  const slices = document.getElementsByClassName("slices")[0];
  const count = 4;
  const angle = 360 / count;
  for (var i = 0; i < count; i++) {
    const slice = document.createElement("div");
    slice.classList.add("slice");
    if (i % 2 == 0) {
      console.log("i -> " + i);
      slice.style.backgroundColor = "grey";
    } else slice.style.backgroundColor = "black";
    slice.style.transform =
      "rotate(calc(" + angle * i + "deg)) skewY(" + (90 - angle) + "deg)";
    slice.innerHTML = "<span>" + i + "</span>";
    /* if (i == count - 1) {
      slice.style.clipPath = "polygon(0 0, 32.5% 0, 100% 100%, 0 50%)";
    }*/
    slices.appendChild(slice);
  }
};
