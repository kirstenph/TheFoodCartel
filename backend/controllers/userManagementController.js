const User = require('../models/User');

exports.getAllUsers = async (req, res) => {
    const allUsers = await User.find();
    res.render('dashboard/usermanagement', { allUsers });
};

exports.editUser = async (req, res) => {
    const { id } = req.params;
    const allUsers = await User.findByIdAndUpdate(id, { ...req.body });
    res.redirect('/usermanagement');
};

exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    const allReservations = await User.findByIdAndDelete(id); 
    res.redirect('/usermanagement');
};  