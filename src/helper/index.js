

const successResponse = (status, data, message, res) => {
    res.status(status).json({
        status,
        data,
        message,
    });
}
const errorResponse = (status, data, message, res) => {
    res.status(status).json({
        status,
        data,
        message,
    });
}
module.exports = {
    successResponse,
    errorResponse //
}