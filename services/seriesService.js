class SeriesService {
    constructor(db) {
        this.Client = db.sequelize;
        this.Series = db.Series;

    }

    async getSeries() {
        return this.Series.findAll({
            where: {},
        },
        {
            order: [["asc"]]
        }
        )
    }

    async addSeries (series) {
        return this.Series.create({
            Series: series,
        })
    }



}

module.exports = SeriesService;