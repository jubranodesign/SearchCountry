
const liFnByDataType = {
    objTemp: createLiByObjType,
    objTempExtra: createLiExtraByObjType,
    arrTemp: createLiArrType
};

const htmlFnByTagType = {
    ulTemp: createUlTag
};

function isStringEmpty(str) {
    return typeof str === 'string' && str.trim().length === 0;
}

function getCountryDetails(countryName) {
    return allCountriesArr.filter(country => country.name.common.toLowerCase() === countryName.toLowerCase())[0] || null;
}

function createLiByObjType(data) {
    var liItems = "";
    for (val of Object.values(data)) {
        liItems += `<li> ${val} </li>`;
    }
    return liItems;
}

function createLiExtraByObjType(data) {
    var liItems = "";
    for (key of Object.keys(data)) {
        liItems += `<li> ${key} : ${data[key].name} : ${data[key].symbol}</li>`;
    }
    return liItems;
}

function createLiArrType(data) {
    const liItems = data.map(val => `<li>${val}</li>`);
    return liItems.join('');
}

function createUlTag(dataType, data) {
    var ulItems = "<ul>";
    ulItems += liFnByDataType[dataType](data);
    ulItems += "</ul>";
    return ulItems;
}

function createHtmlByTagType(tagType, dataType, data) {
    return htmlFnByTagType[tagType](dataType, data);
}

function updateHtmlByTgaName(tagByName, data) {
    document.querySelector(tagByName).innerHTML = data;
}

function updateImgByTagName(tagByName, src) {
    document.querySelector(tagByName).setAttribute("src", src);
}

function addClassByTagName(tagByName, className) {
    document.querySelector(tagByName).classList.add(className);
}

function removeClassByTagName(tagByName, className) {
    document.querySelector(tagByName).classList.remove(className);
}

function showCountryNameWithFlag(countryName, countryFlag) {
    updateHtmlByTgaName("#headerCountry #name", countryName);
    updateImgByTagName("#headerCountry #flag img", countryFlag);
}

function showCountryLanguages(languages) {
    updateHtmlByTgaName("#detailsCountry #languages .list", createHtmlByTagType("ulTemp", "objTemp", languages));
}

function showCountryBorders(borders) {
    updateHtmlByTgaName("#detailsCountry #borders .list", createHtmlByTagType("ulTemp", "arrTemp", borders));
}

function showCountryCurrencies(currencies) {
    updateHtmlByTgaName("#detailsCountry #currencies .list", createHtmlByTagType("ulTemp", "objTempExtra", currencies));
}

function showCountryNotFound(currencies) {
    updateHtmlByTgaName("#headerCountry #name", "country name not found");
    updateImgByTagName("#headerCountry #flag img", "");
    updateHtmlByTgaName("#detailsCountry #languages .list", "");
    updateHtmlByTgaName("#detailsCountry #borders .list", "");
    updateHtmlByTgaName("#detailsCountry #currencies .list", "");
}

function showCountryDetails(countryDetails) {
    console.log(countryDetails);
    showCountryNameWithFlag(countryDetails.name.common, countryDetails.flags.svg)
    showCountryLanguages(countryDetails.languages);
    showCountryBorders(countryDetails.borders);
    showCountryCurrencies(countryDetails.currencies);
}

function searchCountry() {
    const countryName = document.querySelector(".searchText").value;

    if (isStringEmpty(countryName)) {
        addClassByTagName(".searchText", "highlightInput");
    } else {
        removeClassByTagName(".searchText", "highlightInput");
        const countryDetails = getCountryDetails(countryName);

        if (countryDetails === null) {
            showCountryNotFound();
        } else {
            showCountryDetails(countryDetails);
        }
    }
}