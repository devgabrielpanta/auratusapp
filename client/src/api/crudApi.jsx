const serverUrl = process.env.API_BOOKINGS_ENDPOINT;

async function getBookings(setLoading, setBookings) {
    try {
        const response = await fetch(serverUrl, {
            method: "GET",
        });
        const data = await response.json();
        setBookings([...data]); //spread operator
        setLoading(false);
    } catch (error) {
        console.log(`Erro ao obter as reservas: ${error}`);
        setLoading(false);
    }
};

//falta fazer essa função
async function createBookings(setLoading, setBookings, requestData, setAlertMessage) {
    const teste = JSON.stringify(requestData);
    console.log('dados de reservas a serem submetidas: ' + teste);
    setAlertMessage('success');
};

export default function crudApi(method, setLoading, setBookings, requestData, setAlertMessage) {
    if (method === 'getBookings') {
        return getBookings(setLoading, setBookings);

    } else if (method === 'createBookings') {
        return createBookings(setLoading, setBookings, requestData, setAlertMessage);
        
    } else {
        return console.log('atualizar ou cancelar reserva');
    }
};