const knex = require('../utils/knex');

module.exports = {
  get_list: async (req, res, next) => {
    try {
      let conditions = [];
      let result = {};
      if (req.query.code) {
        conditions.push(['CODE', '=', req.query.code]);
      }
      if (req.query.name) {
        conditions.push(['TITLE', '=', req.query.name]);
      }
      if (req.query.channel) {
        conditions.push(['CHANEL', '=', req.query.channel]);
      }
      // if (req.query.service_url) {
      //   conditions.push(['PATH', '=', req.query.service_url]);
      // }
      let tmp = await knex('SERVICE')
        .count()
        .where(builder => {
          conditions.forEach(condition => {
            builder.where(...condition);
          })
        });
      let count = Number(tmp[0]['COUNT(*)']);
      if (count >= 0) {
        result = await knex('SERVICE')
          .select(
            'ID as ID',
            'TITLE as title',
            'STATUS as status',
            'DESCRIPTION as description',
            'CODE as code',
            'CHANEL as channel',
            'PARTNER_CODE as partnerCode',
            'PATH as pathService'
          )
          .where(builder => {
            conditions.forEach(condition => {
              builder.where(...condition);
            })
          })
          //.orderBy('KEY')
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
      console.log(err)
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
      let tmp = await knex('SERVICE')
        .select(
          'ID as ID',
          'CODE as code',
          'PARTNER_CODE as partnerCode',
          'CHANEL as channel',
          'TITLE as title',
          'STATUS as status',
          'DESCRIPTION as description',
          'CREATED_AT as createdAt',
          'UPDATED_AT as updatedAt',
          'CREATED_BY as createdBy',
          'UPDATED_BY as updatedBy',
          'PATH as service_url'
        )
        .where('CODE', '=', req.query.code);
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
      // let tmp = await knex('SERVICE').count()
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
      await knex('SERVICE')
        .insert({
          CODE: req.body.code,
          PARTNER_CODE: req.body.partnerCode,
          CHANEL: req.body.channel,
          TITLE: req.body.title,
          STATUS: Number(req.body.status) || 0,
          DESCRIPTION: req.body.description,
          CREATED_BY: 'UNKNOWN',
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
      await knex('SERVICE')
        .update({
          CODE: req.body.code,
          PARTNER_CODE: req.body.partnerCode,
          CHANEL: req.body.channel,
          TITLE: req.body.title,
          STATUS: Number(req.body.status) || 0,
          DESCRIPTION: req.body.description,
          UPDATED_BY: 'UNKNOWN',
          PATH: req.body.service_url,
          //UPDATED_AT: knex.fn.now()
        })
        .where('CODE', '=', req.body.code)
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