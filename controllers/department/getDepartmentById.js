const db = require('../../dataBase').getInstance();


module.exports = async (req, res) => {
    try {
        const DepartmentModel = db.getModel('Department');
        const DoctorModel = db.getModel('Doctor');
        const departmentId = req.params.id;
        if (!departmentId) throw new Error('Department is not found');

        const isPresent = await DoctorModel.findAll({
            attributes: ["name", "surname", "experience", "office", "working"],
            where: {
                department_id: departmentId
            },
            include: [DepartmentModel]
        });
        if (!isPresent) throw new Error('Department is not found');


        res.json({
            success: true,
            msg: isPresent
        });
    } catch (e) {
        console.log(e);
        res.status(400).json({
            success: false,
            msg: e.message
        })
    }
};