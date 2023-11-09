function log(message: string) {
    console.log(`[INFO] ${new Date().toLocaleString()}: ${message}`);
}

function warn(message: string) {
    console.warn(`[WARNING] ${new Date().toLocaleString()}: ${message}`);
}

function error(message: string | unknown) {
    console.error(`[ERROR] ${new Date().toLocaleString()}: ${message}`);
}

export default {
    log,
    error,
    warn
}