const tokenVerificator = require('../../helpers/tokenVerificator');
const Op = require('sequelize').Op;
const db = require('../../dataBase').getInstance();

module.exports = async (req, res) => {
    try {
        const CommentsModel = db.getModel('Comments');
        const token = req.get('Authorization');
        const {id} = tokenVerificator.auth(token);
        const idDoctorToAdd = req.params.id;
        const {description = '', mark = ''} = req.body;
        if (!idDoctorToAdd || idDoctorToAdd < 1) throw new Error('Bad DoctorId');
        const isCommentPresent = await CommentsModel.findOne({
                where: {
                    [Op.or]: [
                        {
                            user_id: id,
                            doctor_id: idDoctorToAdd
                        },
                        {
                            doctor_id: id,
                            user_id: idDoctorToAdd
                        }]
                }
            });
        if (!isCommentPresent) throw new Error('You are already commented this doctor');

        await CommentsModel.create({
            user_id: id,
            doctor_id: idDoctorToAdd,
            description,
            mark
        });

        res.json({
            success: true,
            msg: 'Comment added'
        });
    } catch (e) {
        res.status(400).json({
            success: false,
            msg: e.message
        })
    }
};