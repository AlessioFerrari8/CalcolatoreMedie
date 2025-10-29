function fetchValutazioni() {
    fetch('user.json') // recuperiamo il file user.json --> come url usa il percorso relativo che include il nome del file
        .then(response => {
            console.log(`Risposta ricevuta: ${JSON.stringify(response, null, 2)}`);            
            return response.json();
        })
        .then(user => {
            console.log(JSON.stringify(user, null, 2));
        })
        .catch(error => {
            console.warn("Error fetching user:", error);
        });
}

fetchUser();
