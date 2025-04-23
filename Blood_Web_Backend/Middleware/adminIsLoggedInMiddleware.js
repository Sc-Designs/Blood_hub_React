const adminModel = require("../Models/Admin-Model");
const jwt = require("jsonwebtoken");
module.exports = async (req, res, next) => {
    try {
        let token = req.cookies.adminToken;
        if (!token && req.headers.authorization?.startsWith("Bearer ")) {
            token = req.headers.authorization.split(" ")[1];
        }
            if (!token) {
            return res
            .status(401)
            .json({ error: "Unauthorized: Token missing" });
        }
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        const admin = await adminModel.findOne({email: decoded.email});
        if (!admin) {
            res.clearCookie("adminToken");
            return res.status(404).redirect("/admin/login");
        }
        req.admin = admin;
        next();
    } catch (err) {
        console.error(err);
        return res.status(403).json({ error: "Invalid or expired token" });
    }
}