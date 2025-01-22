let experiments = [
  "list-practice",
  "list-learn",
  "dictionary-learn",
  "dictionary-practice",
  "set-learn",
  "set-practice",
];
let datatypes = ["list", "dictionary", "set"];
window.onload = () => {
  let curr = localStorage.getItem("currentExperiment");
  if (curr) {
    curr = JSON.parse(curr);
    document.getElementsByClassName("list-learn")[0].style.display = "none";
    document.getElementsByClassName("list-learn")[1].style.display = "none";
    // document.getElementsByClassName('list')[0].style.display = 'none'
    let ele = document.getElementsByClassName(`${curr.type}-${curr.mode}`);
    ele[0].style.display = "flex";
    if (ele.length > 1) ele[1].style.display = "block";
    // document.getElementsByClassName(`${curr.type}`)[0].style.display = 'block'
    document.getElementById("experiment").value = curr.type;
    document.getElementById("mode").value = curr.mode;
  }
  if (!curr || curr.type == "list") {
    if (!curr || curr.mode == "learn") addElementsList();
    else randomiseList();
  } else if (curr.type == "set") {
    if (curr.mode == "practice") randomiseSet();
    else addElementsSet();
  } else if (curr.type == "dictionary") {
    if (curr.mode == "practice") randomiseDictionary();
    else addElementsDictionary();
  }
};

function changeExperiment() {
  let datatype = document.getElementById("experiment").value;
  let mode = document.getElementById("mode").value;
  console.log(`${datatype}-${mode}`);
  localStorage.setItem(
    "currentExperiment",
    JSON.stringify({ type: datatype, mode: mode })
  );
  experiments.forEach((exp) => {
    let element = document.getElementsByClassName(exp);
    if (exp === `${datatype}-${mode}`) {
      element[0].style.display = "flex";
      if (element.length > 1) element[1].style.display = "block";
    } else {
      element[0].style.display = "none";
      if (element.length > 1) element[1].style.display = "none";
    }
  });
  if (datatype == "list" && mode == "learn") addElementsList();
  if (datatype == "set" && mode == "learn") addElementsSet();
  if (datatype == "dictionary" && mode == "learn") addElementsDictionary();
  if (datatype == "list" && mode == "practice") randomiseList();
  if (datatype == "set" && mode == "practice") randomiseSet();
  if (datatype == "dictionary" && mode == "practice") randomiseDictionary();
}

function reload() {
  location.reload(true);
}

function enterTextField(event, datatype) {
  if (event.key == "Enter") {
    event.preventDefault();
    document.getElementById(`${datatype}-practice-submit`).click();
  }
}

function dragMoveListener(event) {
  var target = event.target;
  var x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
  var y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

  target.style.transform = "translate(" + x + "px, " + y + "px)";
  target.setAttribute("data-x", x);
  target.setAttribute("data-y", y);
}

interact(".drag").draggable({
  inertia: true,
  autoScroll: true,
  onmove: dragMoveListener,
  onend: function (event) {
    var target = event.target;
    target.style.transform = "";
    target.setAttribute("data-x", 0);
    target.setAttribute("data-y", 0);
  },
});

interact(".drag").dropzone({
  accept: ".drag",
  overlap: 0.01,
  ondropactivate: function (event) {
    event.target.classList.add("drop-active");
  },
  ondragenter: function (event) {
    var draggableElement = event.relatedTarget;
    var dropzoneElement = event.target;

    dropzoneElement.classList.add("drop-target");
    draggableElement.classList.add("can-drop");
  },
  ondragleave: function (event) {
    var draggableElement = event.relatedTarget;
    var dropzoneElement = event.target;
    // console.log(draggableElement, dropzoneElement)

    dropzoneElement.classList.remove("drop-target");
    draggableElement.classList.remove("can-drop");
  },
  ondrop: function (event) {
    var draggableElement = event.relatedTarget;
    var dropzoneElement = event.target;
    var temp = dropzoneElement.innerHTML;
    console.log(dropzoneElement.innerHTML, draggableElement.innerHTML);

    dropzoneElement.innerHTML = draggableElement.innerHTML;
    draggableElement.innerHTML = temp;

    dropzoneElement.classList.remove("drop-target");
    draggableElement.classList.remove("can-drop");
  },
  ondropdeactivate: function (event) {
    event.target.classList.remove("drop-active");
    event.target.classList.remove("drop-target");
  },
});
