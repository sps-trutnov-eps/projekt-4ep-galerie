# Projekt absolventů maturujících v roce 2022
## Galerie školních projektů

#### Postup zprovoznění ve vývojovém režimu:
1. nainstalovat běhové prostředí [Node](https://nodejs.org/en/) 16.8.0 nebo novější
2. do složky `/src` doplnit soubor `.env` obsahující text

    > HOST=localhost

    > PORT=8000

3. ve složce `/src` spustit příkazovou řádku
4. spustit příkaz `npm install`
5. spustit příkaz `npm install nodemon` (pokud není `nodemon` nainstalován globálně)
6. spustit příkaz `npm run dev`


# Databáze

## SHOPPING LIST
1. - [x] Struktura databáze
2. - [ ] Nahrávací stránka
3. - [ ] Propojení se serverem
4. - [x] Přidání controlleru
5. - [x] Přidání modelu
6. - [ ] Propojení nahrávací stránky s databází
7. - [ ] Vkládání dat
8. - [ ] Přejmenovat do angličtiny

## URL

{ Admin Stránka (Navigace)
/admin/login

/project/create
/project/createondb
/project/edit <-pomocí contenteditable
/project/delete <- vyskočí mu alert jestli opravdu chce delete

/reviews/add
/reviews/addondb
/reviews/edit
/reviews/delete
}

do složky `/src` doplnit do souboru `.env` obsahující text

    > ADMIN_USERNAME=a
    > ADMIN_PASSWORD=a
    > SECRET_KEY=něco sem napiš
