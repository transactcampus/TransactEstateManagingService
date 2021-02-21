module.exports = function (req, res, next) {
    const page = parseInt(req.query.page);

    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit;

    const endIndex = page * limit;

    req.limit = limit;

    req.startIndex = startIndex;

    next();
}