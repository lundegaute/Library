module.exports = (sequelize, Sequelize) => {
	const Book = sequelize.define(
		'Book',
		{
			Name: {
				type: Sequelize.DataTypes.STRING,
				unique: false,
				allowNull: false,
			},
			Series: {
				type: Sequelize.DataTypes.STRING,
				unique: false,
				allowNull: false,
			},
			Pages: {
				type: Sequelize.DataTypes.INTEGER,
				unique: false,
				allowNull: false,
			},
			Published: {
				type: Sequelize.DataTypes.DATE,
				unique: false,
				allowNull: false,
			},

		},
		{
			timestamps: false,
		}
	);
	Book.associate = function (models) {
		Book.belongsTo( models.Genre, {} );
		Book.belongsToMany(models.User, { through: models.readBook});
		Book.belongsToMany(models.User, { through: models.toReadBook});
		Book.belongsToMany(models.User, { through: models.favouriteBook});
		Book.belongsTo ( models.Author, {});
	};
	return Book;
};