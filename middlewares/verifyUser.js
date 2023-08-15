const jwt = require("jsonwebtoken");

const verifyuser = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decryptedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = decryptedToken.userID;
        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = verifyuser 