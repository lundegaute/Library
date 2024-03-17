module.exports = ( sequelize, Sequelize ) => {
    const toReadBook = sequelize.define(
        "toReadBook",
        {
            // Junction table, no attribute needed
        },
        {
            timestamps: false,
        }
    );
    toReadBook.associate = function ( models ) {
        toReadBook.belongsTo ( models.User)
        toReadBook.belongsTo ( models.Book)
    }      

    return toReadBook;
}