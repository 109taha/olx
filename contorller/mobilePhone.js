const { Mobile } = require('../models/mobilePhone')
const jwt = require('jsonwebtoken')
const { User } = require('../models/user')


const createMobileAdd = async (req, res) => {
    try {
        const { title, description, brand, condition, price, location } = req.body;
        if (!title || !description || !brand || !condition || !price || !location) {
            return res.status(400).send({ message: 'All fields are required' });
        }

        const user = req.headers.authorization.split(" ")[1];
        const decryptedToken = jwt.verify(user, process.env.JWT_SECRET);
        const userId = decryptedToken.userId

        const users = await User.findById(userId)
        const contact_Number = users.phone_number

        const product = new Mobile({
            seller_id: userId,
            title,
            description,
            brand,
            condition,
            price,
            location,
            contact_Number
        });

        await product.save();
        res.status(200).send({ message: "product added successfully", data: product })
    } catch (error) {
        return res.status(500).send({ message: "something went wrong" })
    }
}

const findAllMobiles = async (req, res) => {
    return "123"
    console.log("123")
    //     try {
    //         const products = await Mobile.find();
    //         if (!products) {
    //             return res.status(400).send({
    //                 message: "No mobile-Phone Found"
    //             })
    //         }
    //         return res.status(200).json({
    //             data: products
    //         });
    //     } catch (error) {
    //         return res.status(500).send({ message: "Internal server error" })
    //     }
};



module.exports = { createMobileAdd, findAllMobiles }