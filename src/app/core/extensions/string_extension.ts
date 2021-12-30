interface String {
    turkishToEnglish(): string;
    makeUrlFriendly(): string;
    toCamelCase(): string;
}

String.prototype.turkishToEnglish = function () {
    return this
        .replace(/Ğ/g, "G")
        .replace(/ğ/g, "g")
        .replace(/Ü/g, "U")
        .replace(/ü/g, "u")
        .replace(/Ş/g, "S")
        .replace(/ş/g, "s")
        .replace(/İ/g, "I")
        .replace(/ı/g, "i")
        .replace(/Ö/g, "O")
        .replace(/ö/g, "o")
        .replace(/Ç/g, "C")
        .replace(/ç/g, "c");
};

String.prototype.makeUrlFriendly = function () {
    return this.replace(/[^a-z0-9_]+/gi, '-').replace(/^-|-$/g, '').toLowerCase();;
};

String.prototype.toCamelCase = function () {
    return this.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '');
}