const { Bike } = require("../models/bike")
const jwt = require('jsonwebtoken')
const { User } = require('../models/user')
const cloudinary = require('../helper/cloudinary')
const fs = require("fs");


const createbikeAdd = async (req, res) => {
    const files = req.files;
    const attachArtwork = [];
    try {
        if (!files || files?.length < 1)
            return res.status(401).json({
                message: "You have to upload at least one image to the listing",
            });
        for (const file of files) {
            const { path } = file;
            try {
                const uploader = await cloudinary.uploader.upload(path, { folder: "olx" });
                attachArtwork.push({ url: uploader.url });
                fs.unlinkSync(path);
            } catch (err) {
                if (attachArtwork?.length) {
                    const imgs = imgObjs.map((obj) => obj.public_id);
                    cloudinary.api.delete_resources(imgs);
                }
                console.log(err)
            }
        }
        const { title, description, maker, model, year, KMsDriven, condition, price, location } = req.body;
        if (!title || !description || !maker || !model || !year || !KMsDriven || !condition || !price || !location) {
            return res.status(400).send({ message: 'All fields are required' });
        }

        const user = req.headers.authorization.split(" ")[1];
        const decryptedToken = jwt.verify(user, process.env.JWT_SECRET);
        const userId = decryptedToken.userId

        const users = await User.findById(userId)
        const contact_Number = users.phone_number
        console.log(contact_Number)
        const product = new Bike({
            seller_id: userId,
            title,
            description,
            maker,
            model,
            year,
            KMsDriven,
            condition,
            price,
            location,
            contact_Number,
            pics: attachArtwork.map(x => x.url)
        });

        await product.save();
        res.status(200).send({ message: "product added successfully", data: product })
    } catch (error) {
        return res.status(500).send({ message: "something went wrong" })
    }
}

module.exports = { createbikeAdd }