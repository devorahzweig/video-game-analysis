document.addEventListener('DOMContentLoaded', function () {
    // Retrieve the select element and chart div
    var yearSelect = document.getElementById('yearSelect');
    var chartDiv = document.getElementById('chart');

    // Fetch the available years from the server
    fetch('/get_years')
        .then(response => response.json())
        .then(data => {
            // Populate the select element with the available years
            data.forEach(year => {
                var option = document.createElement('option');
                option.value = year;
                option.text = year;
                yearSelect.appendChild(option);
            });

            // Initially render the chart with the first year
            var initialYear = data[0];
            updateChart(initialYear);
        })
        .catch(error => console.error('Error:', error));

    // Add event listener to the select element
    yearSelect.addEventListener('change', function () {
        var selectedYear = yearSelect.value;
        updateChart(selectedYear);
    });

    // Function to update the chart based on the selected year
    function updateChart(year) {
        fetch('/get_data?year=' + year)
            .then(response => response.json())
            .then(data => {
                // Extract the necessary data for the chart
                var xData = data.map(record => record.name);
                var yData = data.map(record => record.globalsales);

                // Create the line chart using Plotly
                var trace = {
                    x: xData,
                    y: yData,
                    type: 'line'
                };

                var layout = {
                    title: 'Global Sales by Name',
                    xaxis: {
                        title: 'Name'
                    },
                    yaxis: {
                        title: 'Global Sales'
                    }
                };

                Plotly.newPlot(chartDiv, [trace], layout);
            })
            .catch(error => console.error('Error:', error));
    }
});




