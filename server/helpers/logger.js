function Logger(error, type) {
    switch(type) {
        case 'info':
            console.info(error);
            break;
        case 'log':
            console.debug(error);
            break;
        case 'warn':
            console.warn(error);
            break;
        case 'error':
            console.error(error);
            break;
        default:
            console.log(error);
            break;
    }
}

module.exports = Logger;