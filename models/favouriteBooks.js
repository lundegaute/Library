module.exports = (sequelize, Sequelize) => {
	const favouriteBook = sequelize.define(
		'favouriteBook',
		{
			// No attributes is needed here, because its a junction table between a many to many relation of users and books
            // Only the automated foreign keys are necessary
		},
		{
			timestamps: false,
		}
	);
    favouriteBook.associate = function (models) {
		favouriteBook.belongsTo( models.User );
		favouriteBook.belongsTo( models.Book );
	};

	return favouriteBook;
};