const knex = require('./utils/knex');

module.exports = {
  create_table_user: async () => {
    try {
      let exists = await knex.schema.hasTable('USER');
      if(!exists) {
        await knex.schema.createTable('USER', (table) => {
          table.increments('ID');
          table.string('USERNAME');
          table.string('PASSWORD');
          table.string('PASSWORD_HISTORY');
          table.string('FIRST_NAME');
          table.string('LAST_NAME');
          table.string('PHONE');
          table.integer('ROLE_ID');
          table.timestamp('LAST_LOGIN');
          table.integer('STATUS');
          table.string('DESCRIPTION');
          table.integer('LOGIN_FAIL_COUNTER');
          table.timestamp('LOCKED_TIME');
          table.timestamp('CREATED_AT');
          table.timestamp('UPDATED_AT');
          table.string('CREATED_BY');
          table.string('UPDATED_BY');
          table.foreign('ROLE_ID');
        })
      }
    }
    catch (err) {
      console.log(err.stack);
    }
  },
  create_table_user_log: async () => {
    try {
      let exists = await knex.schema.hasTable('USER_LOG');
      if(!exists) {
        await knex.schema.createTable('USER_LOG', (table) => {
          table.increments('ID');
          table.string('URL');
          table.string('METHOD');
          table.string('SERVICE');
          table.string('DATA',500);
          table.timestamp('CREATED_AT');
          table.string('CREATED_BY');
        })
      }
    }
    catch (err) {
      console.log(err.stack);
    }
  },
  create_table_role: async () => {
    try {
      let exists = await knex.schema.hasTable('ROLE');
      if(!exists) {
        await knex.schema.createTable('ROLE', (table) => {
          table.increments('ID');
          table.string('TITLE');
          table.integer('STATUS');
          table.string('DESCRIPTION');
          table.timestamp('CREATED_AT');
          table.timestamp('UPDATED_AT');
          table.string('CREATED_BY');
          table.string('UPDATED_BY');
        })
      }
    }
    catch (err) {
      console.log(err.stack);
    }
  },
  create_table_permission: async () => {
    try {
      let exists = await knex.schema.hasTable('PERMISSION');
      if(!exists) {
        await knex.schema.createTable('PERMISSION', (table) => {
          table.increments('ID');
          table.string('TITLE');
          table.string('URL');
          table.string('METHOD');
          table.integer('STATUS');
          table.string('DESCRIPTION');
          table.timestamp('CREATED_AT');
          table.timestamp('UPDATED_AT');
          table.string('CREATED_BY');
          table.string('UPDATED_BY');
          table.foreign('ROLE_ID');
        })
      }
    }
    catch (err) {
      console.log(err.stack);
    }
  },
  create_table_role_permission: async () => {
    try {
      let exists = await knex.schema.hasTable('ROLE_PERMISSION');
      if(!exists) {
        await knex.schema.createTable('ROLE_PERMISSION', (table) => {
          table.increments('ID');
          table.string('ROLE_ID');
          table.string('PERMISSION_ID');
          table.integer('STATUS');
          table.timestamp('CREATED_AT');
          table.timestamp('UPDATED_AT');
          table.string('CREATED_BY');
          table.string('UPDATED_BY');
          table.foreign('ROLE_ID');
          table.foreign('PERMISSION_ID');
        })
      }
    }
    catch (err) {
      console.log(err.stack);
    }
  },
  create_table_feature: async () => {
    try {
      let exists = await knex.schema.hasTable('FEATURE');
      if(!exists) {
        await knex.schema.createTable('FEATURE', (table) => {
          table.increments('ID');
          table.string('TITLE');
          table.string('KIND');
          table.string('TYPE');
          table.string('URL');
          table.string('DESCRIPTION');
          table.integer('STATUS');
          table.integer('DISPLAY');
          table.timestamp('CREATED_AT');
          table.timestamp('UPDATED_AT');
          table.string('CREATED_BY');
          table.string('UPDATED_BY');
        })
      }
    }
    catch (err) {
      console.log(err.stack);
    }
  },
  create_table_service: async () => {
    try {
      let exists = await knex.schema.hasTable('SERVICE');
      if(!exists) {
        await knex.schema.createTable('SERVICE', (table) => {
          table.increments('ID');
          table.string('CODE');
          table.string('PARTNER_CODE');
          table.string('TITLE');
          table.string('CHANEL');
          table.string('DESCRIPTION');
          table.integer('STATUS');
          table.timestamp('CREATED_AT');
          table.timestamp('UPDATED_AT');
          table.string('CREATED_BY');
          table.string('UPDATED_BY');
        })
      }
    }
    catch (err) {
      console.log(err.stack);
    }
  },
  create_table_system: async () => {
    try {
      let exists = await knex.schema.hasTable('SYSTEM');
      if(!exists) {
        await knex.schema.createTable('SYSTEM', (table) => {
          table.increments('ID');
          table.string('IP');
          table.string('PORT');
          table.string('TITLE');
          table.string('USER');
          table.string('PASSWORD');
          table.string('DESCRIPTION');
          table.integer('STATUS');
          table.timestamp('CREATED_AT');
          table.timestamp('UPDATED_AT');
          table.string('CREATED_BY');
          table.string('UPDATED_BY');
        })
      }
    }
    catch (err) {
      console.log(err.stack);
    }
  },
  create_table_system_author: async () => {
    try {
      let exists = await knex.schema.hasTable('SYSTEM_AUTHOR');
      if(!exists) {
        await knex.schema.createTable('SYSTEM_AUTHOR', (table) => {
          table.increments('ID');
          table.string('IP');
          table.string('PORT');
          table.string('IP_TARGET');
          table.string('PORT_TARGET');
          table.string('DESCRIPTION');
          table.integer('STATUS');
          table.timestamp('EXPIRED_AT');
          table.timestamp('CREATED_AT');
          table.timestamp('UPDATED_AT');
          table.string('CREATED_BY');
          table.string('UPDATED_BY');
        })
      }
    }
    catch (err) {
      console.log(err.stack);
    }
  },
  create_table_param: async () => {
    try {
      let exists = await knex.schema.hasTable('PARAM');
      if(!exists) {
        await knex.schema.createTable('PARAM', (table) => {
          table.increments('ID');
          table.string('KEY');
          table.string('VALUE');
          table.string('DESCRIPTION');
          table.integer('STATUS');
          table.timestamp('CREATED_AT');
          table.timestamp('UPDATED_AT');
          table.string('CREATED_BY');
          table.string('UPDATED_BY');
        })
      }
    }
    catch (err) {
      console.log(err.stack);
    }
  },
}