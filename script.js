//your JS code here. If required.
// Get a random number between min and max (inclusive)
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Create an array of Promises that resolve after a random time between 1 and 3 seconds
const promises = Array.from({ length: 3 }, (_, index) => {
  const randomTime = getRandomNumber(1000, 3000);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(randomTime);
    }, randomTime);
  });
});

// Add a loading row to the table
const loadingRow = document.createElement('tr');
const loadingCell = document.createElement('td');
loadingCell.setAttribute('colspan', '2');
loadingCell.textContent = 'Loading...';
loadingRow.appendChild(loadingCell);

const table = document.getElementById('your-table'); // Replace 'your-table' with the actual table ID

// Add the loading row to the table
table.appendChild(loadingRow);

// Wait for all promises to resolve using Promise.all
Promise.all(promises)
  .then((results) => {
    // Remove the loading row
    table.removeChild(loadingRow);

    // Create rows for each promise result
    results.forEach((result, index) => {
      const row = document.createElement('tr');

      const firstColumn = document.createElement('td');
      firstColumn.textContent = `Promise ${index + 1}`;
      row.appendChild(firstColumn);

      const secondColumn = document.createElement('td');
      secondColumn.textContent = `${result / 1000}`;
      row.appendChild(secondColumn);

      // Add the row to the table
      table.appendChild(row);
    });

    // Calculate the total time taken to resolve all promises
    const totalTime = results.reduce((total, result) => total + result, 0);

    // Add the total row to the table
    const totalRow = document.createElement('tr');
    const totalFirstColumn = document.createElement('td');
    totalFirstColumn.textContent = 'Total';
    totalRow.appendChild(totalFirstColumn);

    const totalSecondColumn = document.createElement('td');
    totalSecondColumn.textContent = `${totalTime / 1000}`;
    totalRow.appendChild(totalSecondColumn);

    table.appendChild(totalRow);
  })
  .catch((error) => {
    console.error('An error occurred:', error);
  });

