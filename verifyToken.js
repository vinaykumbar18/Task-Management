const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    try {
        /* =========================
           Read Authorization Header
           Format:
           Bearer token_here
        ========================= */
        const header = req.headers.authorization;

        if (!header) {
            return res.status(401).json({
                error: "Token required"
            });
        }

        /* =========================
           Validate Header Format
        ========================= */
        if (!header.startsWith("Bearer ")) {
            return res.status(401).json({
                error: "Invalid token format"
            });
        }

        /* =========================
           Extract Token
        ========================= */
        const token = header.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                error: "Token missing"
            });
        }

        /* =========================
           Verify JWT Token
        ========================= */
        const decoded = jwt.verify(token, "secretkey");

        /* Example:
           {
             id: 1,
             iat: ....,
             exp: ....
           }
        */

        req.user = decoded;

        next();

    } catch (error) {
        return res.status(401).json({
            error: "Invalid or expired token"
        });
    }
};

module.exports = verifyToken;