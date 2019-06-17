const tokenVerificator = require('../../helpers/tokenVerificator');
const Op = require('sequelize').Op;
const db = require('../../dataBase').getInstance();

module.exports = async (req, res) => {
    try {
        const CommentsModel = db.getModel('Comments');
        const token = req.get('Authorization');
        const {id} = tokenVerificator.auth(token);
        const doctorToDelete = req.params.id;
        if (!doctorToDelete || doctorToDelete < 1) throw new Error('Bad UserId');


        await CommentsModel.destroy({
            where: {
                [Op.or]: [
                    {
                        user_id: id,
                        doctor_id: doctorToDelete
                    },
                    {
                        doctor_id: id,
                        user_id: doctorToDelete
                    }]
            }
        });

        res.json({
            success: true,
            msg: 'ok'
        });
    } catch (e) {
        res.status(400).json({
            success: false,
            msg: e.message
        })
    }
};