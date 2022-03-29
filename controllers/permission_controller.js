const knex = require('../utils/knex');

module.exports = {
  get_list: async (req, res, next) => {
    try {
      let conditions = [];
      let result = {};
      console.log(req.query.id);
      if (req.query.id) {
        conditions.push(['ID', '=', req.query.id]);
      }
      if (req.query.status) {
        conditions.push(['STATUS', '=', req.query.status]);
      }
      if (req.query.title) {
        conditions.push(['title', 'LIKE', `%${(req.query.title)}%`]);
      }
      let tmp = await knex('PERMISSION')
        .count()
        .where(builder => {
          conditions.forEach(condition => {
            builder.where(...condition);
          })
        });
      let count = Number(tmp[0]['COUNT(*)']);
      if (count >= 0) {
        result = await knex('PERMISSION')
          .select(
            'ID as ID',
            'TITLE as title',
            'STATUS as status',
            'DESCRIPTION as description'
          )
          .where(builder => {
            conditions.forEach(condition => {
              builder.where(...condition);
            })
          })
          .orderBy('TITLE')
          .offset(req.query.pageNumber * req.query.pageSize)
          .limit(req.query.pageSize);
      }
      res.status(200).send({
        code: 0,
        type: 'success',
        message: '',
        data: {
          pageSize: req.query.pageSize,
          pageNumber: req.query.pageNumber,
          totalPages: Math.ceil(count / req.query.pageSize),
          totalElements: count,
          result: result
        }
      });
    }
    catch (err) {
      res.status(500).send({
        code: 999,
        type: 'failure',
        message: err.stack,
        data: {}
      });
    }
  },
  get: async (req, res, next) => {
    let result = await knex('ROLE_PERMISSION').select('PERMISSION.ID', 'PERMISSION.TITLE', 'PERMISSION.DESCRIPTION')
      .join('PERMISSION', 'ROLE_PERMISSION.PERMISSION_ID', 'PERMISSION.ID')
      .where(builder => {
        [
          ['ROLE_PERMISSION.STATUS', '>=', 0],
          ['ROLE_PERMISSION.ROLE_ID', '=', req.query.id]
        ]
          .forEach(condition => {
            builder.where(...condition);
          })
      });

    res.status(200).send({
      data: result
    });
  },
  create: async (req, res, next) => {

  },
  edit: async (req, res, next) => {

  },
}