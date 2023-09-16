const canvas = document.getElementById("signatureCanvas");
const ctx = canvas.getContext("2d");
let drawing = false;

canvas.addEventListener("mousedown", () => {
  drawing = true;
  ctx.beginPath();
});

canvas.addEventListener("mouseup", () => {
  drawing = false;
  ctx.closePath();
});

const lineWidthControl = document.getElementById("lineWidth");
const colorPicker = document.getElementById("colorPicker");
const saveBtn = document.getElementById("save");
const clearBtn = document.getElementById("effacer");

canvas.addEventListener("mousemove", draw);

function draw(event) {
  if (!drawing) return;

  ctx.lineWidth = lineWidthControl.value; // Utilisez la valeur de l'épaisseur du trait
  ctx.lineCap = "round";
  ctx.strokeStyle = colorPicker.value; // Utilisez la couleur choisie

  ctx.lineTo(
    event.clientX - canvas.offsetLeft,
    event.clientY - canvas.offsetTop
  );
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(
    event.clientX - canvas.offsetLeft,
    event.clientY - canvas.offsetTop
  );
}

// Sauvegardez la signature en tant qu'image
saveBtn.addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = "signature.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
});

clearBtn.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});
