export const ListLanguages = [
    {"name": "Andorra", "code": "ad", "field": "andorra"},
    {"name": "Vietnamese", "code": "vn", "field": "vietnamese"},
    {"name": "Afghanistan", "code": "af", "field": "afghanistan"},
    {"name": "Antigua", "code": "ag", "field": "antigua"},
    {"name": "Anguilla", "code": "ai", "field": "anguilla"},
    {"name": "Spain", "code": "es", "field": "spain"},
];
ListLanguages.sort((a, b) => a.name.localeCompare(b.name));;
export const DictLanguages = {};
ListLanguages.forEach(element => {
    DictLanguages[element.field] = element
});