import axios from "axios";
import { computed, ref } from "vue";

export default function useClima() {

    const clima = ref({});

    const obtenerClima = async ({ciudad, pais}) => {
        const VITE_API_KEY = import.meta.env.VITE_API_KEY
        
        const url = `http://api.openweathermap.org/geo/1.0/direct?q=${ciudad},${pais}&limit=1&appid=${VITE_API_KEY}`;

        try {
            const { data } = await axios(url);
            const { lat, lon } = data[0];

            const urlClima = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${VITE_API_KEY}`;
            const { data: dataClima } = await axios(urlClima);
            
            clima.value = dataClima;
        } catch (error) {
            console.log(error)
        }
    }

    const mostrarClima = computed(() => {
        return Object.values(clima.value).length > 0
    });

    const formatTemperatura = (temperatura) => parseInt(temperatura - 273.15)  
    

    return {
        obtenerClima,
        clima,
        mostrarClima,
        formatTemperatura
    }
}