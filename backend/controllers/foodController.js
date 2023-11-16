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

// Get a single food
exports.getFood = async (req, res) => {
    const { id } = req.params

    const food = await Food.findById(id)
    res.render('dashboard/food/:id', { food });

    res.status(201).json(food)
}

// Create a new food
exports.createFood = async (req, res) => {
    try {
        const {
            image,
            name,
            stock,
            price,
            vat,
            status,
            bestseller,
            featured,
            desc,
            category
        } = req.body;

        let foodImage = { url: 'https://res.cloudinary.com/dmaajhgat/image/upload/v1696584757/alxcx0noocll2ba0pg42.png', filename: 'default.jpg' }; // Default image

        if (req.file) {
            // If an image is uploaded, use the uploaded image
            foodImage = { url: req.file.path, filename: req.file.filename };
        }
        const food = new Food({
            image: foodImage,
            name,
            stock,
            price,
            vat,
            status,
            bestseller,
            featured,
            desc,
            category
        });
        
        console.log(food);
        await food.save();

        res.redirect('dashboard/food');
    } catch (err) {
        console.error('Error creating food:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Delete a food
exports.deleteFood = async (req, res) => {
    const { id } = req.params;
    await Food.findByIdAndDelete(id);
    res.redirect('/dashboard/food')
};


// Bulk delete food items
exports.bulkDeleteFood = async (req, res) => {
    try {
        const { ids } = req.body;

        // Use the $in operator to delete multiple items by their IDs
        await Food.deleteMany({ _id: { $in: ids } });

        res.status(200).json({ message: 'Selected items deleted successfully' });
    } catch (err) {
        console.error('Error deleting food items:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};








// Edit a food item
exports.editFood = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            name,
            stock,
            price,
            vat,
            status,
            bestseller,
            featured,
            desc,
            category
        } = req.body;

        const updatedFood = {
            name,
            stock,
            price,
            vat,
            status,
            bestseller,
            featured,
            desc,
            category
        };

        // Check if an image was uploaded and update it if needed
        if (req.file) {
            updatedFood.image = {
                url: req.file.path,
                filename: req.file.filename
            };
        }

        // Update the food item in the database
        await Food.findByIdAndUpdate(id, updatedFood);

        res.redirect('/dashboard/food');
    } catch (err) {
        console.error('Error editing food:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
