function Logger(error, type) {
    switch(type) {
        case 'info':
            return console.info(error);
            break;
        case 'log':
            return console.debug(error);
            break;
        case 'warn':
            return console.warn(error);
            break;
        case 'error':
            return console.error(error);
            break;
        case default:
            return console.log(error);
            break;
    }
}

module.exports = Logger;