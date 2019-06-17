module.exports = (sequelize, DataTypes) => {
    const Comments = sequelize.define('Comments', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        doctor_id: {
            type: DataTypes.INTEGER,
            foreignKey:true
        },
        user_id: {
            type: DataTypes.INTEGER,
            foreignKey:true
        },
        description: {
            type: DataTypes.STRING
        },
        mark: {
            type: DataTypes.STRING
        }
    }, {
        tableName: 'comments',
        timestamps: false
    });

    const User = sequelize.import('./User.js');
    const Doctor = sequelize.import('./Doctor.js');

    Comments.belongsTo(User, {foreignKey: 'user_id'});
    Comments.belongsTo(Doctor, {foreignKey: 'doctor_id'});
    return Comments
};