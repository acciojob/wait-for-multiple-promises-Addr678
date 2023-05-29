//your JS code here. If required.
 // Function to generate a random delay between 1 and 3 seconds
    function generateDelay() {
      return Math.floor(Math.random() * 3) + 1;
    }

    // Function to create a Promise with a random delay
    function createPromise(index) {
      const delay = generateDelay();
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(delay);
        }, delay * 1000);
      });
    }

    // Create an array of Promises
    const promises = [
      createPromise(1),
      createPromise(2),
      createPromise(3)
    ];

    // Wait for all Promises to resolve using Promise.all()
    Promise.all(promises)
      .then(results => {
        const loadingRow = document.getElementById('loading-row');
        loadingRow.remove();

        // Update the table with the results
        const table = document.querySelector('table');
        results.forEach((time, index) => {
          const row = table.insertRow();
          const promiseCell = row.insertCell();
          promiseCell.textContent = `Promise ${index + 1}`;

          const timeCell = row.insertCell();
          timeCell.textContent = time;
        });

        // Calculate and add the total time
        const totalRow = table.insertRow();
        const totalCell = totalRow.insertCell();
        const totalTime = results.reduce((sum, time) => sum + time, 0);
        totalCell.textContent = 'Total';

        const timeTakenCell = totalRow.insertCell();
        timeTakenCell.textContent = totalTime.toFixed(3);
      })
      .catch(error => {
        console.error(error);
      });
  </script>
