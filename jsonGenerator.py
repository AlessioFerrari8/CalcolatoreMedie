import json
import re
from datetime import datetime

# === INPUT: qui puoi incollare tutto il testo (anche con più mesi)
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

# === Riconosce i blocchi per mese
blocchi = re.split(r"Valutazioni giornaliere", testo)
blocchi = [b.strip() for b in blocchi if b.strip()]

# === Dizionario finale
anno_completo = {}

for blocco in blocchi:
    righe = [r.strip() for r in blocco.splitlines() if r.strip()]
    if len(righe) < 3:
        continue

    mese_riga = righe[0]
    media_mese = float(righe[1].replace(',', '.'))
    pattern = re.compile(
        r"([\d.,]+)\s+\n(\w{3}),\s*(\d{2}/\d{2})\s*\n([A-ZÀ-Ú\s]+)\n(\w+)\n([\w+.,]+)",
        re.MULTILINE
    )

    valutazioni = []
    for voto_num, _, data, materia, tipologia, voto_testuale in pattern.findall(blocco):
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

    anno_completo[mese_riga] = {
        "media_mese": media_mese,
        "valutazioni": valutazioni
    }

# === Salva tutto in JSON unico
with open("valutazioni.json", "w", encoding="utf-8") as f:
    json.dump(anno_completo, f, indent=4, ensure_ascii=False)

print("✅ File 'valutazioni.json' creato con successo!")
