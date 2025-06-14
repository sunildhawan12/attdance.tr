 // ✅ Google Script URL for form submit
    const scriptURL = 'https://script.google.com/macros/s/AKfycbwY81QSa5pKuyQJtGJ0F9VFn_rCRvYibWDVE5lKKnqDSm1QHwd4IJVhKBLxipYP9MtySQ/exec';
    const form = document.forms['Book-form'];

    form.addEventListener('submit', e => {
      e.preventDefault();
      fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => {
          alert("Attendance submitted!");
          form.reset();
          setTimeout(fetchAttendance, 2000); // 2 sec delay to fetch new data
        })
        .catch(error => console.error('Error!', error.message));
    });

    // ✅ CSV publish link of your Google Sheet
    const csvUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRy6hT3tbVol0s2iDQqStc2Ywf3u5EoqAVZRXtuguL4o4KfK0jcF8Niob6AwsS1ekDsMm5XXIrKB36D/pub?output=csv";

    async function fetchAttendance() {
      try {
        const res = await fetch(csvUrl);
        const data = await res.text();
        const rows = data.trim().split("\n").map(row => row.split(","));

        const tableHead = document.querySelector("#attendanceTable thead");
        const tableBody = document.querySelector("#attendanceTable tbody");

        // Heading
        tableHead.innerHTML = "<tr>" + rows[0].map(cell => `<th>${cell}</th>`).join('') + "</tr>";
        
        // Data
        const rowsHtml = rows.slice(1).map(row =>
          `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`
        ).join('');
        tableBody.innerHTML = rowsHtml;

      } catch (err) {
        console.error("Fetch error:", err);
      }
    }

    // Initial call
    fetchAttendance();
