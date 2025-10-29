function fetchValutazioni() {
    fetch('valutazioni.json') // Recupera il file valutazioni.json
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json(); // Converte la risposta in JSON
        })
        .then(data => {
            console.log("Dati ricevuti:", data);

            // Estrai l'array delle valutazioni
            const valutazioni = data["ottobre 2025"].valutazioni;

            // Calcola la somma dei voti numerici
            const sommaVoti = valutazioni.reduce((somma, valutazione) => somma + valutazione.voto_num, 0);

            // Calcola la media
            const mediaVoti = sommaVoti / valutazioni.length;

            console.log(`La media generale dei voti è: ${mediaVoti.toFixed(2)}`);
        })
        .catch(error => {
            console.error("Errore durante il fetch:", error);
        });
}

fetchValutazioni();