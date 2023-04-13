import Chart from 'chart.js/auto';

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

function sir(total: number, sick: number, speed: number, period: number): Array<number> {
  const sickPoints: Array<number> = [];
  for (let t = 0; t < period; t++) {
    sick += Math.ceil(Math.exp(((total - sick) * speed * t) / total));
    sickPoints.push(Math.min(sick, total));
  }
  return sickPoints;
}