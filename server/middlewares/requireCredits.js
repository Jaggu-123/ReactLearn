module.exports = (req, res, next) => {
    if (req.user.Credits < 1) {
        return res.status(403).send({ error: "Not enough Credits!" });
    }
};
