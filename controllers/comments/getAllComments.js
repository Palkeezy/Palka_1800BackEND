const tokenVerificator = require('../../helpers/tokenVerificator');
const Op = require('sequelize').Op;
const Sequelize = require('sequelize');
const db = require('../../dataBase').getInstance();

module.exports = async (req, res) => {
    try {
        const responseObj = {};
        const UserModel = db.getModel('User');
        const CommentsModel = db.getModel('Comments');
        const DoctorModel = db.getModel('Doctor');
        const token = req.get('Authorization');
        const {id} = tokenVerificator.auth(token);
        let {limit = 20, page = 0} = req.query;
        if (+page === 0) page = 1;
        page = page - 1;


        const commentsCount =
            await CommentsModel.findOne({
                where: {
                    [Op.or]: [
                        {
                            user_id: id,
                        },
                        {
                            doctor_id: id,
                        }]
                },
                attributes: [[Sequelize.fn('COUNT', Sequelize.col('id')), 'comments_count']]
            });


        const allUsers = await CommentsModel.findAll({
            attributes: ["description", "mark"],
            where: {
                [Op.or]: [
                    {
                        user_id: id,
                    },
                    {
                        doctor_id: id,
                    }]
            },
            include: [
                {
                    model: DoctorModel,
                    attributes: ['name', 'surname', 'experience', 'office', 'working']
                },
                {
                    model: UserModel,
                    attributes: ['name', 'surname', 'phone']
                }
            ],
            limit: +limit,
            offset: limit * page
        });

        responseObj.comments = allUsers;
        responseObj.pageCount = Math.ceil(commentsCount.dataValues.comments_count / limit);

        res.json({
            success: true,
            msg: responseObj
        });
    } catch (e) {
        res.status(400).json({
            success: false,
            msg: e.message
        })
    }
};