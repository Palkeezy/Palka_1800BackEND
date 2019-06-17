const db = require('../../dataBase').getInstance();

/**
 * This method using for creating doctors
 * @param req
 * @param res
 * @returns doctor
 */
module.exports = async (req, res) => {
    try {
        const DoctorModel = db.getModel('Doctor');
        let {name, surname, experience, phone, email, password, office, department = 2, working} = req.body;
        if (!name || !surname || !experience || !phone || !email || !password || !office || !department || !working){
            throw new Error('Some field is empty');}

        const newDoctor = await DoctorModel.create({
            name,
            surname,
            experience,
            phone,
            email,
            password,
            office,
            department_id: department,
            working
        });

        res.json({
            success: true,
            msg: newDoctor
        });
    } catch (e) {
        res.status(400).json({
            success: false,
            msg: e.message
        })
    }
};