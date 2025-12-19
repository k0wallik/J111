function errorHandler(err, req, res, next) {
    console.error(err.stack);

    if (res.headersSent) {
        return next(err);
    }

    const status = err.status || 500;
    const message = err.message || 'Wewnętrzny błąd serwera';

    res.status(status).render('error', { status, message, user: req.session.user || null });
}

module.exports = errorHandler;
