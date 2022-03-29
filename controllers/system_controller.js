const knex = require('../utils/knex');

module.exports = {
  get_list: async (req, res, next) => {
    try {
      let conditions = [];
      let result = {};
      if (req.query.id) {
        conditions.push(['ID', '=', req.query.id]);
      }
      if (req.query.username) {
        conditions.push(['IP', '=', req.query.username]);
      }
      let tmp = await knex('SYSTEM')
        .count()
        .where(builder => {
          conditions.forEach(condition => {
            builder.where(...condition);
          })
        });
      let count = Number(tmp[0]['COUNT(*)']);
      if (count >= 0) {
        result = await knex('SYSTEM')
          .select(
            // 'ID as ID',
            // 'IP as IP',
            // 'PORT as port'
          )
          .where(builder => {
            conditions.forEach(condition => {
              builder.where(...condition);
            })
          })
          // .orderBy('IP', 'PORT')
          // .offset(req.query.pageNumber * req.query.pageSize)
          // .limit(req.query.pageSize);
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
      let tmp = await knex('SYSTEM').select()
        .where('IP', '=', req.query.ip);
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
          message: 'Success',
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
      let tmp = await knex('SYSTEM').count()
        .where('IP', '=', req.body.ip)
        .where('PORT', '=', req.body.port);
      if (tmp[0]["COUNT(*)"] > 0) {
        res.status(200).send({
          code: 998,
          type: 'failure',
          message: 'System exist',
          data: {}
        });
      }
      else {
        let isSave = await knex('SYSTEM')
          .insert({
            IP: req.body.ip,
            PORT: req.body.port,
            TITLE: req.body.title,
            USER: req.body.name,
            PASSWORD: req.body.password,
            STATUS: req.body.status,
            DESCRIPTION: req.body.description,
            CREATED_BY: 'SYSTEM',
            CREATED_AT: knex.fn.now()
          });
        res.status(200).send({
          code: 0,
          type: 'success',
          message: '',
          data: isSave
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
  edit: async (req, res, next) => {
    try {
      await knex('SYSTEM')
        .update({
          TITLE: req.body.title,
          USER: req.body.user,
          PASSWORD: req.body.password,
          STATUS: req.body.status,
          DESCRIPTION: req.body.description,
          CREATED_BY: 'SYSTEM',
          CREATED_AT: knex.fn.now()
        })
        .where('IP', '=', req.body.ip)
        .where('PORT', '=', req.body.port);
      res.status(200).send({
        code: 0,
        type: 'success',
        message: '',
        data: {}
      });
    }
    catch (err) {
      console.log(err);
      res.status(500).send({
        code: 999,
        type: 'failure',
        message: err.stack,
        data: {}
      });
    }
  },
}