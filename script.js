const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .fly:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const categorySelected = document.getElementById("category");
populateUI();

let ticketPrice = +categorySelected.value;

function setFlyData(flyIndex, flyPrice) {
  localStorage.setItem("selectSeatsIndex", flyIndex);
  localStorage.setItem("selectSeatsPrice", flyPrice);
}

function updateSelectedCount() {
  const selectSeats = document.querySelectorAll(".row .fly.selected");

  const flyIndex = [...selectSeats].map(seat => [...seats].indexOf(seat));
  localStorage.setItem("selectSeats", JSON.stringify(flyIndex));

  const seatsCount = selectSeats.length;
  count.innerText = seatsCount;
  total.innerText = seatsCount * ticketPrice;
}
//
function populateUI() {
  const selectSeats = JSON.parse(localStorage.getItem("selectSeats"));
  if (selectSeats !== null && selectSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  const selectedFlyIndex = localStorage.getItem("selectedFlyIndex");

  if (selectedFlyIndex !== null) {
    movieSelect.selectedIndex = selectedFlyIndex;
  }
}

categorySelected.addEventListener("change", e => {
  ticketPrice = +e.target.value;
  setFlyData(e.target.selectSeats, e.target.value);
  updateSelectedCount();
});

// seleccionar un asiento
container.addEventListener("click", e => {
  if (
    e.target.classList.contains("fly") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");

    // actualice el precio
    updateSelectedCount();
  }
});
updateSelectedCount();
