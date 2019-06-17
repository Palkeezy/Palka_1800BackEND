const db = require('../../dataBase').getInstance();

/**
 * This method using for creating department
 * @param req
 * @param res
 * @returns department
 */
module.exports = async (req, res) => {
    try {
        const DescriptionModel = db.getModel('Description');
        let {description} = req.body;
        if (!description) throw new Error('Some field is empty');
        const newDescription = await DescriptionModel.create({
            description,
        });

        res.json({
            success: true,
            msg: newDescription
        });
    } catch (e) {
        res.status(400).json({
            success: false,
            msg: e.message
        })
    }
};