const Reserve = require('../models/Reservation');

exports.getAllReservations = async (req, res) => {
    const allReservations = await Reserve.find({})
    res.render('dashboard/reservationform', { allReservations });
};

exports.createReservations = async (req, res) => {
    console.log(req.body);
    const newReserve = new Reserve(req.body);
    await newReserve.save();
    res.redirect('/reservation');
};

exports.editReservations = async (req, res) => {
    const { id } = req.params;
    const allReservations = await Reserve.findByIdAndUpdate(id, { ...req.body });
    console.log(allReservations);
    res.redirect('/reservation');
};  

exports.deleteReservations = async (req, res) => {
    const { id } = req.params;
    const allReservations = await Reserve.findByIdAndDelete(id);
    console.log(allReservations); 
    res.redirect('/reservation');
};  