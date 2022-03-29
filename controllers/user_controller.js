const knex = require('../utils/knex');
const md5 = require('md5');

module.exports = {
  get_list: async (req, res, next) => {
    try {
      let conditions = [];
      let result = {};
      if (req.query.id) {
        conditions.push(['USER.ID', '=', req.query.id]);
      }
      if (req.query.username) {
        conditions.push(['USERNAME', 'LIKE', `%${(req.query.username)}%`]);
      }
      if (req.query.group) {
        conditions.push(['ROLE_ID', '=', req.query.group]);
      }
      if (req.query.status) {
        conditions.push(['STATUS', '=', req.query.status]);
      }
      let tmp = await knex('USER')
        .count()
        .where(builder => {
          conditions.forEach(condition => {
            builder.where(...condition);
          })
        })
      let count = Number(tmp[0]['COUNT(*)']);
      if (count >= 0) {
        result = await knex('USER')
          .select().join('ROLE', 'USER.ROLE_ID', 'ROLE.ID')
          .where(builder => {
            conditions.forEach(condition => {
              builder.where(...condition);
            })
          })
          .orderBy('USER.CREATED_AT') //code cũ: orderBy('USERNAME')
          .offset(req.query.pageNumber * req.query.pageSize)
          .limit(req.query.pageSize)
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
      })
    }
    catch (err) {
      //console.log(err)
      res.status(400).send({
        code: 999,
        type: 'failure',
        message: err.stack,
        data: {}
      })
    }
  },
  get: async (req, res, next) => {
    try {
      let tmp = await knex('USER').select()
        .where('USERNAME', '=', req.query.username);
      if (tmp <= 0) {
        res.status(200).send({
          code: 998,
          type: 'failure',
          message: 'Not found',
          data: {}
        })
      }
      else {
        tmp[0].password = '';
        res.status(200).send({
          code: 0,
          type: 'success',
          message: 'Not found',
          data: {
            result: tmp[0]
          }
        })
      }
    }
    catch (err) {
      res.status(500).send({
        code: 999,
        type: 'failure',
        message: err.stack,
        data: {}
      })
    }
  },
  create: async (req, res, next) => {
    try {
      // let tmp = await knex('USER').count()
      //   .where('USERNAME', '=', req.body.username);
      // if (tmp[0]["COUNT(*)"] > 0) {
      //   res.status(200).send({
      //     code: 998,
      //     type: 'failure',
      //     message: 'Username exist',
      //     data: {}
      //   })
      // }
      // else {
        await knex('USER')
          .insert({
            USERNAME: req.body.username,
            PASSWORD: md5(req.body.password),
            FIRST_NAME: req.body.firstName,
            LAST_NAME: req.body.lastName,
            PHONE: req.body.phone,
            ROLE_ID: req.body.roleId || 0,
            STATUS: req.body.status || 0,
            DESCRIPTION: req.body.description,
            CREATED_BY: 'SYSTEM',
            CREATED_AT: knex.fn.now()
          })
        res.status(200).send({
          code: 0,
          type: 'success',
          message: '',
          data: {}
        })
      }
    //}
    catch (err) {
      if (err.toString().includes('unique constraint')) {
        return res.status(500).send({
          code: 999,
          type: 'failure',
          message: "Tài khoản đã tồn tại",
          data: {}
        })
      }
      res.status(500).send({
        code: 999,
        type: 'failure',
        message: "",
        data: {}
      })
    }
  },
  edit: async (req, res, next) => {
    try {
      await knex('USER')
        .update({
          FIRST_NAME: req.body.firstName,
          LAST_NAME: req.body.lastName,
          PHONE: req.body.phone,
          ROLE_ID: req.body.roleId || 0,
          STATUS: req.body.status || 0,
          DESCRIPTION: req.body.description,
          UPDATED_BY: 'SYSTEM',
          UPDATED_AT: knex.fn.now()
        })
        .where('USERNAME', '=', req.body.username)
      res.status(200).send({
        code: 0,
        type: 'success',
        message: '',
        data: {}
      })
    }
    catch (err) {
      res.status(500).send({
        code: 999,
        type: 'failure',
        message: err.stack,
        data: {}
      })
    }
  },
  change_password: async (req, res, next) => {
    try {
      await knex('USER')
        .update({
          PASSWORD: md5(req.body.password),
        })
        .where('USERNAME', '=', req.body.username)
      res.status(200).send({
        code: 0,
        type: 'success',
        message: '',
        data: {}
      })
    }
    catch (err) {
      res.status(500).send({
        code: 999,
        type: 'failure',
        message: err.stack,
        data: {}
      })
    }
  },
}