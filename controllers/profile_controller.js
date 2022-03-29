const knex = require('../utils/knex');
const md5 = require('md5');

module.exports = {
  get: async (req, res, next) => {
    try {
      let tmp = await knex('USER')
        .select(
          'FIRST_NAME as firstName',
          'LAST_NAME as lastName',
          'PHONE as phone',
          'ROLE_ID as roleID',
          'STATUS as status',
          'DESCRIPTION as description',
          'CREATED_AT as createdAt',
          'UPDATED_AT as updatedAt',
          'CREATED_BY as createdBy',
          'UPDATED_BY as updatedBy'
        )
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
  edit: async (req, res, next) => {
    try {
      await knex('USER')
        .update({
          FIRST_NAME: req.body.firstName,
          LAST_NAME: req.body.lastName,
          PHONE: req.body.phone,
          ROLE_ID: Number(req.body.roleID) || 0,
          STATUS: Number(req.body.status) || 0,
          DESCRIPTION: req.body.description,
          UPDATED_BY: 'UNKNOWN',
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
      let tmp = await knex('USER')
        .select(
          'FIRST_NAME as firstName',
          'LAST_NAME as lastName',
          'PHONE as phone',
          'ROLE_ID as roleID',
          'STATUS as status',
          'DESCRIPTION as description',
          'UPDATED_BY as updateBy',
          'UPDATED_AT as updateAt'
        )
        .where('USERNAME', '=', req.query.username);
      if (tmp.length > 0 && (md5(tmp[0].password) == md5(req.body.oldPassword))) {
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
      else {
        res.status(500).send({
          code: 999,
          type: 'failure',
          message: 'Wrong old password or username',
          data: {}
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
}