import { DataTypes } from 'sequelize';
import database from '../../database/index';
import Technologies from '../Technologies/index';

const Users = database.define("Users", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
});

Users.hasMany(Technologies);
Technologies.belongsTo(Users);

export default Users;
