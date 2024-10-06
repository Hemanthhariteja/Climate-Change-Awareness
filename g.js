document.addEventListener('DOMContentLoaded', () => {
    const years = Array.from({ length: 41 }, (_, i) => 1980 + i);
    const co2Levels = years.map((_, i) => 338 + i * (415 - 338) / 40);
    const temperatureAnomalies = years.map((_, i) => 0.2 + i * (1.2 - 0.2) / 40);
    const seaLevels = years.map((_, i) => i * (100 / 40));
    const stormFrequencies = years.map(() => Math.max(2, Math.round(5 + Math.random() * 1.5)));

    const createChart = (ctx, label, data, yLabel, color) => {
        return new Chart(ctx, {
            type: 'line',
            data: {
                labels: years,
                datasets: [{
                    label: label,
                    data: data,
                    borderColor: color,
                    backgroundColor: color,
                    fill: false,
                }]
            },
            options: {
                interaction: {
                    mode: 'nearest',
                    intersect: false,
                    axis: 'x',
                },
                scales: {
                    y: {
                        title: {
                            display: true,
                            text: yLabel
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Year'
                        }
                    }
                }
            }
        });
    };

    // CO2 Levels Chart
    const co2Ctx = document.getElementById('co2Chart').getContext('2d');
    const co2Chart = createChart(co2Ctx, 'CO2 Levels (ppm)', co2Levels, 'CO2 (ppm)', 'green');

    // Temperature Anomalies Chart
    const tempCtx = document.getElementById('temperatureChart').getContext('2d');
    const tempChart = createChart(tempCtx, 'Temperature Anomalies (°C)', temperatureAnomalies, 'Temperature Anomaly (°C)', 'red');

    // Sea Level Rise Chart
    const seaLevelCtx = document.getElementById('seaLevelChart').getContext('2d');
    const seaChart = createChart(seaLevelCtx, 'Sea Level Rise (mm)', seaLevels, 'Sea Level Rise (mm)', 'blue');

    // Frequency of Tropical Storms Chart
    const stormCtx = document.getElementById('stormChart').getContext('2d');
    const stormChart = new Chart(stormCtx, {
        type: 'bar',
        data: {
            labels: years,
            datasets: [{
                label: 'Tropical Storms',
                data: stormFrequencies,
                backgroundColor: 'orange'
            }]
        },
        options: {
            scales: {
                y: {
                    title: {
                        display: true,
                        text: 'Number of Storms'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Year'
                    }
                }
            }
        }
    });

    // Slider Control for Year Range
    const slider = document.getElementById('slider');
    slider.addEventListener('input', () => {
        const year = slider.value;
        document.querySelectorAll('canvas').forEach(chartCanvas => {
            const chart = Chart.getChart(chartCanvas);
            chart.options.scales.x.min = year;
            chart.update();
        });
    });
});
