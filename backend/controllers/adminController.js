exports.getDashboard = (req, res) => {
    if (req.isAuthenticated()) {
        res.render('dashboard');
    } else {
        // res.status(401).send('Unauthorized. Please log in.');
        res.redirect('/login')
    }
}