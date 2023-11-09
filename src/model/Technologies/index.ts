import { DataTypes } from 'sequelize';
import database from '../../database/index';

const Technologies = database.define("Technologies", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    title: {
        type: DataTypes.STRING,
    },
    studied: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    deadline: {
        type: DataTypes.DATE
    }
});

export default Technologies;
