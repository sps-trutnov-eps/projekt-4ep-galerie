# Projekt absolventů maturujících v roce 2022
## Galerie školních projektů

#### Postup zprovoznění ve vývojovém režimu:
1. nainstalovat běhové prostředí [Node](https://nodejs.org/en/) 16.8.0 nebo novější
2. do složky `/src` doplnit soubor `.env` obsahující text

    > HOST=localhost
    > PORT=8000
    > ADMIN_USERNAME=a
    > ADMIN_PASSWORD=a
    > SECRET_KEY=něco sem napiš

3. ve složce `/src` spustit příkazovou řádku
4. spustit příkaz `npm install`
5. spustit příkaz `npm install nodemon` (pokud není `nodemon` nainstalován globálně)
6. spustit příkaz `npm run dev`
