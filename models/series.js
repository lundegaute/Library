module.exports = ( sequelize, Sequelize ) => {
    const Series = sequelize.define(
        "Series",
        {
            Series: {
                type: Sequelize.DataTypes.STRING,
                unique: true,
                allowNull: false,
            }
        },
        {
            timestamps: false,
        }
    )

    Series.associate = function ( models ) {
        Series.hasMany( models.Book, {})
    }

    return Series
}