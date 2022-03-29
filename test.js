const init = require('./init_db');
let test = async () => {
  await init.create_table_user();
  await init.create_table_role();
  await init.create_table_permission();
  await init.create_table_role_permission();
  await init.create_table_feature();
  await init.create_table_service();
  await init.create_table_system();
  await init.create_table_system_author();
  await init.create_table_param();
  console.log('DONE')
  process.exit()
}
test();
