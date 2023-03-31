import jwt from "jsonwebtoken";

export default async function handler(req, res) {
    const token = JSON.parse(req.body).token;
    if (!token) return res.status(400).json({error: "no token specified"});
    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        return res.status(200).json({email: decoded.email});
    } catch (e) {
        console.error(e);
        return res.status(403).json({error: "couldn't verify token"});
    }
}
