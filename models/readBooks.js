module.exports = ( sequelize, Sequelize ) => {
    const readBook = sequelize.define(
        "readBook",
        {
            // Junction table, no attribute needed
        },
        {
            timestamps: false,
        }
    );
    readBook.associate = function ( models ) {
        readBook.belongsTo ( models.User)
        readBook.belongsTo ( models.Book)
    }      

    return readBook;
}