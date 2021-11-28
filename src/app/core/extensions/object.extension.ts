declare global {
    interface Object {
        objectByKeyName(key: string, data: any): any;
    }
}

Object.prototype.objectByKeyName = (key: string, data: any) => {
    key = key.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    key = key.replace(/^\./, '');           // strip a leading dot
    var a = key.split('.');
    for (var i = 0, n = a.length; i < n; ++i) {
        var k = a[i];
        if (k in data) {
            data = data[k];
        } else {
            return;
        }
    }
    if (!data) {
        return '';
    }
    return data;
};

export { }