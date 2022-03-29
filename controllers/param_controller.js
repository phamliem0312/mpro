const knex = require('../utils/knex');

module.exports = {
  get_list: async (req, res, next) => {
    try {
      let conditions = [];
      let result = {};
      if (req.query.id) {
        conditions.push(['ID', '=', req.query.id]);
      }
      if (req.query.status) {
        conditions.push(['STATUS', '=', req.query.status]);
      }
      if (req.query.key) {
        conditions.push(['KEY', '=', req.query.key]);
      }
      let tmp = await knex('PARAM')
        .count()
        .where(builder => {
          conditions.forEach(condition => {
            builder.where(...condition);
          })
        });
      let count = Number(tmp[0]['COUNT(*)']);
      if (count >= 0) {
        result = await knex('PARAM')
          .select(
            'ID as ID',
            'KEY as key',
            'VALUE as value',
            'STATUS as status',
            'DESCRIPTION as description'
          )
          .where(builder => {
            conditions.forEach(condition => {
              builder.where(...condition);
            })
          })
          .orderBy('KEY')
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
    try {
      let tmp = await knex('PARAM')
        .select(
          'ID as ID',
          'KEY as key',
          'VALUE as value',
          'STATUS as status',
          'DESCRIPTION as description',
          'CREATED_AT as createdAt',
          'UPDATED_AT as updatedAt',
          'CREATED_BY as createdBy',
          'UPDATED_BY as updatedBy'
        )
        .where('ID', '=', req.query.ID);
      if (tmp <= 0) {
        res.status(200).send({
          code: 998,
          type: 'failure',
          message: 'Not found',
          data: {}
        });
      }
      else {
        res.status(200).send({
          code: 0,
          type: 'success',
          message: 'Not found',
          data: {
            result: tmp[0]
          }
        });
      }
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
  create: async (req, res, next) => {
    try {
      // let tmp = await knex('PARAM').count()
      //   .where('ID', '=', req.body.ID)
      // if (tmp[0]["COUNT(*)"] > 0) {
      //   res.status(200).send({
      //     code: 998,
      //     type: 'failure',
      //     message: 'Exist',
      //     data: {}
      //   });
      // }
      // else {
      let data = req.body;
      let dataInsert = [];

      data.forEach(element => {
        dataInsert.push({
          KEY: element.key,
          VALUE: element.value,
          STATUS: Number(req.body.status) || 0,
          DESCRIPTION: element.description,
          CREATED_BY: 'UNKNOWN',
          //CREATED_AT: knex.fn.now()
        })
      })

      let queryInsert = await knex('PARAM')
        .insert(dataInsert
          //   {
          //   KEY: req.body.key,
          //   VALUE: req.body.value,
          //   STATUS: Number(req.body.status) || 0,
          //   DESCRIPTION: req.body.description,
          //   CREATED_BY: 'UNKNOWN',
          //   CREATED_AT: knex.fn.now()
          // }
        );
      res.status(200).send({
        code: 0,
        type: 'success',
        message: '',
        data: {}
      });
      //}
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
  edit: async (req, res, next) => {
    try {
      await knex('PARAM')
        .update({
          KEY: req.body.key,
          VALUE: req.body.value,
          STATUS: Number(req.body.status) || 0,
          DESCRIPTION: req.body.description,
          UPDATED_BY: 'UNKNOWN',
          UPDATED_AT: knex.fn.now()
        })
        .where('ID', '=', req.body.ID)
      res.status(200).send({
        code: 0,
        type: 'success',
        message: '',
        data: {}
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
  }
}