function showProfile(req, res) {
    if (!req.session.user) {
        return res.redirect('/auth/login');
    }
    res.render('profile', { user: req.session.user });
}

module.exports = { showProfile };
