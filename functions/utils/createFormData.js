const { Blob } = require('buffer');

module.exports = (buffer, fileName, options) => {
    const form = new FormData();

    form.append(
        'file',
        new Blob([buffer]),
        fileName
    );

    if (options) {
        Object.keys(options).forEach(key => {
            form.append(key, options[key]);
        });
    }

    return form;
};
