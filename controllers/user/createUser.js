const db = require('../../dataBase').getInstance();

/**
 * This method using for creating user
 * @param req
 * @param res
 * @returns user
 */
module.exports = async (req, res) => {
    try {
        const UserModel = db.getModel('User');
        let {name, surname, email, password, phone} = req.body;
        if (!name || !surname || !email || !password || !phone) throw new Error('Some field is empty');

        const newUser = await UserModel.create({
            name,
            surname,
            email,
            password,
            phone
        });

        res.json({
            success: true,
            msg: newUser
        });
    } catch (e) {
        res.status(400).json({
            success: false,
            msg: e.message
        })
    }
};