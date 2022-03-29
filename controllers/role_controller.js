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
      if (req.query.title) {
        conditions.push(['TITLE', '=', req.query.title]);
      }
      let tmp = await knex('ROLE')
        .count()
        .where(builder => {
          conditions.forEach(condition => {
            builder.where(...condition);
          })
        });
      let count = Number(tmp[0]['COUNT(*)']);
      if (count >= 0) {
        result = await knex('ROLE')
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
        .orderBy('CREATED_AT')
        .offset(req.query.page * req.query.page_size)
        .limit(req.query.page_size);
      }
      res.status(200).send({
        code: 0,
        type: 'success',
        message: '',
        data: {
          pageSize: req.query.page_size,
          pageNumber: req.query.page,
          totalPages: Math.ceil(count / req.query.page_size),
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
      let tmp = await knex('ROLE').select()
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
      //   let tmp = await knex('ROLE').count()
      //     .where('IP', '=', req.body.IP)
      //     .where('PORT', '=', req.body.port);
      //   if (tmp[0]["COUNT(*)"] > 0) {
      //     res.status(200).send({
      //       code: 998,
      //       type: 'failure',
      //       message: 'System exist',
      //       data: {}
      //     });
      //   }
      //   else {
      await knex('ROLE')
        .insert({
          // IP: req.body.IP,
          // PORT: req.body.port,
          TITLE: req.body.title,
          // USER: req.body.user,
          // PASSWORD: req.body.password,
          // STATUS: req.body.status || 0,
          DESCRIPTION: req.body.description,
          CREATED_BY: 'SYSTEM',
          CREATED_AT: knex.fn.now()
        });
      res.status(200).send({
        code: 0,
        type: 'success',
        message: '',
        data: {}
      });
      //}
    }
    catch (err) {
      if (err.toString().includes('unique constraint')) {
        return res.status(500).send({
          code: 999,
          type: 'failure',
          message: "Trùng tên nhóm ",
          data: {}
        });
      }
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
      await knex('ROLE')
        .update({
          TITLE: req.body.title,
          // USER: req.body.user,
          // PASSWORD: req.body.password,
          //STATUS: req.body.status || 0,
          DESCRIPTION: req.body.description,
          CREATED_BY: 'SYSTEM',
          CREATED_AT: knex.fn.now()
        });
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
  },
}