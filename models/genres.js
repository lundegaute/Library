module.exports = (sequelize, Sequelize) => {
	const Genre = sequelize.define(
		'Genre',
		{
			Genre: {
                type: Sequelize.DataTypes.STRING,
                unique: true,
                allowNull: false,
            },
		},
		{
			timestamps: false,
		}
	);
    Genre.associate = function (models) {
		Genre.hasMany( models.Book );
	};

	return Genre;
};