module.exports = (sequelize, DataTypes) => {
    const Doctor = sequelize.define('Doctor', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING
        },
        surname: {
            type: DataTypes.STRING
        },
        experience: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
        office: {
            type: DataTypes.STRING
        },
        department_id: {
            type: DataTypes.INTEGER,
            foreignKey: true
        },
        working: {
            type: DataTypes.STRING
        },
    }, {
        tableName: 'doctor',
        timestamps: false
    });

    const Department = sequelize.import('./Department.js');

    Doctor.belongsTo(Department, {foreignKey: 'department_id'});
    return Doctor
};