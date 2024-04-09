import { Chart, CategoryScale, BarElement, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { Bar } from "react-chartjs-2";

export default function BarGraph({data}) {
    Chart.register(CategoryScale, BarElement, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

    
    const options = {
        plugins: {
            legend: {
                display: false,
            }
        },
        elements: {
            line: {
                tension: 0,
                borderWidth: 2,
            }
        },
        scales: {
            xAxis: {
                display: false,
            },
            yAxis: {
                display: false
            }
        }
    }

    return (
        <Bar data={data} options={options} />        
    )
}