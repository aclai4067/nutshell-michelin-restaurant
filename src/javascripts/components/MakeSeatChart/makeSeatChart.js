
const makeSeatChart = (table) => {
  const tableNumber = table.id.split('table')[1];
  const domString = `
  <div class="card ${table.numOfSeats}-seat-card">
  <h2>Table ${tableNumber}</h2>
  <h4>Seats: ${table.numOfSeats}</h4>
  </div>
  `;
  return domString;
};

export default { makeSeatChart };
