const db = require('../../dataBase').getInstance();
const Sequelize = require("sequelize");

/**
 * This is method using for search all departments in database
 * @param req
 * @param res
 * @returns departments - all departments from dataBase
 */
module.exports = async (req, res) => {
    try {
        const DepartmentModel = db.getModel('Department');

        const allDepartments = await DepartmentModel.findAll({});
        if (!allDepartments) throw new Error('Departments not found');

        res.json({
            success: true,
            message: allDepartments
        })
    } catch (e) {
        console.log(e);
        res.json({
            success: false,
            message: e.message
        })
    }
};