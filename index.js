const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
    logging: false,
    query: {
        raw: true // This causes "Model.findOne()" to return a Model instance with an undefined "Model.dataValues". This will cause a crash inside of "Model.reload()".
    }
});

const tblUsers = sequelize.define('tblUsers', {
    userID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING(255)
    }
});

(async ()=>{
    await tblUsers.sync();
    try{
        var recResident = await tblUsers.create({ username: 'FooBar' });
        await recResident.reload(); // The error happends here...
    } catch (err){
        console.log(err);
    }
})();