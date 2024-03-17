module.exports = ( sequelize, Sequelize ) => {
    const Author = sequelize.define(
        "Author",
        {
            Name: {
                type: Sequelize.DataTypes.STRING,
                unique: true,
                allowNull: false,
            },

        },
        {
            timestamps: false,
        }
    )

    Author.associate = function ( models ) {
        Author.hasMany ( models.Book, {} );
    } 
    return Author;
}