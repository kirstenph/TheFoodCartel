const Food = require('../models/Food')


exports.getFood_ejs = async (req, res) => {
    if (req.isAuthenticated()) {
        res.render('dashboard/food');
    } else {
        res.redirect('login')
    }
};

// Get all food
exports.getFoods = async (req, res) => {
    try {
        const foods = await Food.find({}).sort({ createdAt: -1 });

        res.render('dashboard/food', { foods }); // Pass the foods data to the EJS template
    } catch (err) {
        console.error('Error getting foods:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


// // Get a single food
// exports.getFood = async (req, res) => {
//     const {id} = req.params

//     const food = await Food.findById(id)

//     res.status(201).json(food)
// }

// Create a new food
exports.createFood = async (req, res) => {
    try {
        const { image, name, stock, price, vat, active, bestseller, featured, desc } = req.body;

        // Log the received image file data
        console.log('Uploaded image data:', req.file);

        const food = new Food({
            image: { url: req.file?.path, filename: req.file?.filename },
            name,
            stock,
            price,
            vat,
            active,
            bestseller,
            featured,
            desc,
        });

        // Save the food item
        await food.save();

        res.redirect('dashboard/food');
    } catch (err) {
        console.error('Error creating food:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



// // Delete a food
// exports.deleteFood = async (req, res) => {
//     try {
//         const { id } = req.params

//         const food = await Food.findOneAndDelete({_id: id})
//         res.redirect('dashboard/food')
//     } catch (error) {
//         console.error('Error deleting food:', err);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// }