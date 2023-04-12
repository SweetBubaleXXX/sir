const chart = new Chart(
    document.getElementById('chart'),
    {
        type: 'line',
        options: {
            scales: {
                x: {
                    grid: { color: '#2e2b27' },
                    title: {
                        display: true,
                        text: 'Время'
                    }
                },
                y: {
                    grid: { color: '#2e2b27' }
                }
            }
        }
    }
);

const form = document.getElementById('sir-form');

form.addEventListener('submit', e => {
    e.preventDefault();
    const formFields = document.forms.sir.elements;
    const sickPoints = sir(
        +formFields['number-people'].value,
        +formFields['number-sick'].value,
        +formFields['speed'].value,
        +formFields['period'].value
    );
    console.log(sickPoints);
    chart.data = {
        labels: sickPoints.map((_, i) => i),
        datasets: [{
            label: 'Количество заболевших',
            data: sickPoints,
            backgroundColor: '#fb8800',
            borderColor: '#fcc666',
        }]
    }
    chart.update();
});

function sir(total, sick, speed, period) {
    const sickPoints = [];
    for (let t = 0; t < period; t++) {
        sick += Math.ceil(((total - sick) * t * sick * speed) / (42 * total));
        sickPoints.push(sick);
    }
    return sickPoints;
}
