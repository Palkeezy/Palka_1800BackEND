const Op = require('sequelize').Op;
const db = require('../../dataBase').getInstance();
const tokenVerificator = require('../../helpers/tokenVerificator');

/**
 * This method using for searching doctors by name and surname
 * @param req
 * @param res
 * @returns doctors
 */

module.exports = async (req, res) => {
    try {

        const DoctorModel = db.getModel('Doctor');
        const UserModel = db.getModel('User');
        const DepartmentModel = db.getModel('Department');

        const {name = ''} = req.query;
        const token = req.get('Authorization');
        const {id, name: userName} = tokenVerificator.auth(token);
        const isPresent = await UserModel.findOne({
            where: {
                id,
                name: userName
            }
        });
        if (!isPresent) throw new Error('Not valid user');
        if (!name) {
            const allUsers = await DoctorModel.findAll({
                attributes: ["name", "surname", "experience", "office", "department_id", "working"],
                include: [DepartmentModel]
            });
            return res.json({
                success: true,
                msg: allUsers
            });
        }
        const allUsers = await DoctorModel.findAll({
            attributes: ["name", "surname", "experience", "office", "department_id", "working"],
            where: {
                [Op.or]: [
                    {
                        name: {
                            [Op.like]: `%${name}%`
                        }
                    },
                    {
                        surname: {
                            [Op.like]: `%${name}%`
                        }
                    }]
            },
            include: [DepartmentModel]
        });

        res.json({
            success: true,
            msg: allUsers
        });
    } catch (e) {
        console.log(e);
        res.status(400).json({
            success: false,
            msg: e.message
        })
    }
};