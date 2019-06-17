const db = require('../../dataBase').getInstance();


module.exports = async (req, res) => {
    try {
        const CommentsModel = db.getModel('Comments');
        const DoctorModel = db.getModel('Doctor');
        const doctortId = req.params.id;
        if (!doctortId) throw new Error('Doctor is not found');

        const isPresent = await CommentsModel.findAll({
            attributes: ['description', "mark"],
            where: {
                doctor_id: doctortId
            },
            include: [{
                model: DoctorModel,
                attributes: ["name", "surname", "experience", "office", "working"],
            }]
        });
        if (!isPresent) throw new Error('Doctor is not found');


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