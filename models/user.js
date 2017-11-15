/*jshint esversion:6*/
var Sequelize = require('sequelize');

// create a sequelize instance with our local postgres database information.
var sequelize = new Sequelize('postgres://oguppupaxdocwf:a12c2e57a32c4092a7566d1ebb0019b4b261b690e6a04cb1f500e49c3344ba72@ec2-23-21-101-174.compute-1.amazonaws.com:5432/d29lcktjstbg67?ssl=true');

// setup User model and its fields.
var User = sequelize.define('usuario', {
    usr: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    nombre: {
        type: Sequelize.STRING,
        unique: false,
        allowNull: false
    },
    pwd: {
        type: Sequelize.STRING,
        allowNull: false
    },
    id_usr : {
        type : Sequelize.BIGINT,
        unique: true,
        allowNull: false
    }
});

// create all the defined tables in the specified database.
sequelize.sync()
    .catch(error => console.log('This error occured', error));

// export User model for use in other files.
module.exports = User;
