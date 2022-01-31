# Projekt absolventů maturujících v roce 2022

## Galerie školních projektů

#### Postup zprovoznění ve vývojovém režimu:
1. nainstalovat běhové prostředí [Node](https://nodejs.org/en/) 16.8.0 nebo novější
2. do složky `/src` doplnit soubor `.env` obsahující text

    > HOST=localhost
    > PORT=8000
    > ADMIN_USERNAME=admin
    > ADMIN_PASSWORD=admin
    > SECRET_KEY=admin

    > ADMIN_USERNAME=<jmeno_administratora>
    
    > ADMIN_PASSWORD=<heslo_administratora>
    
    > SECRET_KEY=<tajny_text_slouzici_k_zabezpeceni_session>
    
3. ve složce `/src` spustit příkazovou řádku
4. spustit příkaz `npm install`
5. spustit příkaz `npm install nodemon` (pokud není `nodemon` nainstalován globálně)
6. spustit příkaz `npm run dev`
