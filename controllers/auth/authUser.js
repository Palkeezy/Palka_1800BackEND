const db = require('../../dataBase').getInstance();
const tokenizer = require('../../helpers/tokinazer').auth;
module.exports = async (req, res) => {
    try {
        const UserModel = db.getModel('User');
        const {email = '', password = ''} = req.body;
        if (!email || !password) throw new Error('Some fields is empty');
        const isPresent = await UserModel.findOne({
            where: {
                email,
                password
            }
        });
        if (!isPresent) throw new Error('You are not register');
        const {id, name} = isPresent;
        const token = tokenizer({id, name});
        res.json({
            success: true,
            msg: token
        });
    } catch (e) {
        console.log(e);
        res.status(400).json({
            success: false,
            msg: e.message
        })
    }
};