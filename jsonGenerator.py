import json
import re
from datetime import datetime

# === INPUT: la stringa originale (puoi sostituirla con un input() o leggere da file)
testo = """
Valutazioni giornaliere
ottobre 2025
8.25 
mar, 28/10
STORIA
orale
otto+
8 
mar, 28/10
LINGUA INGLESE
orale
otto
9 
lun, 27/10
INFORMATICA
pratico
nove
9 
gio, 23/10
INFORMATICA
pratico
nove
9.25 
lun, 20/10
AREA AUTONOMIA INFORMATICA
pratico
nove+
8.75 
ven, 17/10
LINGUA E LETTERATURA ITALIANA
scritto
otto,75
9 
gio, 16/10
TELECOMUNICAZIONI
scritto
nove
9.5 
ven, 10/10
MATEMATICA E COMPLEMENTI DI MATEMATICA
scritto
nove,50
8.5 
gio, 09/10
INFORMATICA
scritto
otto,50
9.75 
mer, 08/10
SISTEMI E RETI
scritto
nove,75
"""

# === Estrae il mese e la media generale
righe = [r.strip() for r in testo.splitlines() if r.strip()]
mese = righe[1]
media_generale = float(righe[2].replace(',', '.'))

# === Estrae i blocchi di voti
pattern = re.compile(
    r"([\d.,]+)\s+\n(\w{3}),\s*(\d{2}/\d{2})\s*\n([A-ZÀ-Ú\s]+)\n(\w+)\n([\w+.,]+)",
    re.MULTILINE
)

valutazioni = []

for voto_num, _, data, materia, tipologia, voto_testuale in pattern.findall(testo):
    voto_num = float(voto_num.replace(',', '.'))
    giorno, mese_num = map(int, data.split('/'))
    data_iso = datetime(2025, mese_num, giorno).strftime("%Y-%m-%d")
    valutazioni.append({
        "data": data_iso,
        "materia": materia.title().strip(),
        "tipologia": tipologia.lower().strip(),
        "voto_num": voto_num,
        "voto_testuale": voto_testuale.strip()
    })

# === Struttura finale
dati = {
    "mese": mese,
    "media_mese": media_generale,
    "valutazioni": valutazioni
}

# === Salva in JSON
with open("valutazioni_ottobre_2025.json", "w", encoding="utf-8") as f:
    json.dump(dati, f, indent=4, ensure_ascii=False)

print("✅ File 'valutazioni_ottobre_2025.json' creato con successo!")
