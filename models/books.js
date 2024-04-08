module.exports = (sequelize, Sequelize) => {
	const Book = sequelize.define(
		'Book',
		{
			Title: {
				type: Sequelize.DataTypes.STRING,
				unique: true,
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
		Book.belongsToMany(models.User, { through: models.readBook});
		Book.belongsToMany(models.User, { through: models.toReadBook});
		Book.belongsToMany(models.User, { through: models.favouriteBook});
		Book.belongsTo( models.Genre, { foreignKey: { allowNull: false } } );
		Book.belongsTo ( models.Author, { foreignKey: { allowNull: false } });
		Book.belongsTo ( models.Series, { foreignKey: { allowNull: false }});
	};
	return Book;
};