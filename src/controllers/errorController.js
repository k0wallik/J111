module.exports = {
    notFound: (req, res, next) => {
        res.status(404).render("error", {
            title: "404 - Nie znaleziono",
            message: "Podana strona nie istnieje",
            user: req.session?.user || null,
        });
    },

    forbidden: (req, res, next) => {
        res.status(403).render("error", {
            title: "403 - Brak dostępu",
            message: "Nie masz uprawnień do tej strony",
            user: req.session?.user || null,
        });
    },

    serverError: (err, req, res, next) => {
        console.error(err.stack);
        res.status(500).render("error", {
            title: "500 - Błąd serwera",
            message: "Coś poszło nie tak, spróbuj ponownie później.",
            user: req.session?.user || null,
        });
    },
};
