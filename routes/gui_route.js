const express = require('express');
const router = express.Router();
const gui_middleware = require('../middleware/gui.js');

router.get('/login', gui_middleware.view_is_logged_in, (req, res, next) => {
  res.render('pages/blank', {
    body_name: '../body/home/login',
    script_name: '../script/null',
    title: 'Đăng nhập',
  });
});

router.get('/', gui_middleware.view_is_logged_in, (req, res, next) => {
  res.render('pages/basic', {
    body_name: '../body/monitor/transaction_history',
    script_name: '../script/monitor/transaction_history',
    title: 'Lịch sử giao dịch',
  });
});

router.get('/monitor/transaction_history', gui_middleware.view_is_logged_in, (req, res, next) => {
  res.render('pages/basic', {
    body_name: '../body/monitor/transaction_history',
    script_name: '../script/monitor/transaction_history',
    title: 'Lịch sử giao dịch',
  });
});

router.get('/monitor/transaction', gui_middleware.view_is_logged_in, (req, res, next) => {
  res.render('pages/basic', {
    body_name: '../body/monitor/transaction',
    script_name: '../script/monitor/transaction',
    title: 'Tổng quan giao dịch',
  });
});

router.get('/manager/admin_feature', gui_middleware.view_is_logged_in, (req, res, next) => {
  res.render('pages/basic', {
    body_name: '../body/manager/admin_feature',
    script_name: '../script/null',
    title: 'Quản lý chức năng vận hành',
  });
});

router.get('/manager/user_feature', gui_middleware.view_is_logged_in, (req, res, next) => {
  res.render('pages/basic', {
    body_name: '../body/manager/user_feature',
    script_name: '../script/null',
    title: 'Quản lý chức năng người dùng',
  });
});

router.get('/product/channel', gui_middleware.view_is_logged_in, (req, res, next) => {
  res.render('pages/basic', {
    body_name: '../body/product/channel',
    script_name: '../script/product/channel',
    title: 'Quản lý dịch vụ',
  });
});

router.get('/connection/email', gui_middleware.view_is_logged_in, (req, res, next) => {
  res.render('pages/basic', {
    body_name: '../body/connection/email',
    script_name: '../script/null',
    title: 'Email',
  });
});

router.get('/connection/mobifonepay', gui_middleware.view_is_logged_in, (req, res, next) => {
  res.render('pages/basic', {
    body_name: '../body/connection/mobifonepay',
    script_name: '../script/null',
    title: 'MobiFonePay',
  });
});

router.get('/connection/ftp', gui_middleware.view_is_logged_in, (req, res, next) => {
  res.render('pages/basic', {
    body_name: '../body/connection/ftp',
    script_name: '../script/null',
    title: 'FTP/SFTP (bankhub & TGTT)',
  });
});

router.get('/connection/connected_system', gui_middleware.view_is_logged_in, (req, res, next) => {
  res.render('pages/basic', {
    body_name: '../body/connection/connected_system',
    //script_name: '../script/null',
    script_name: '../script/connection/connected_system',
    title: 'Hệ thống kết nối',
  });
});

router.get('/connection/param', gui_middleware.view_is_logged_in, (req, res, next) => {
  res.render('pages/basic', {
    body_name: '../body/connection/param',
    script_name: '../script/connection/param',
    title: 'Tham số hệ thống',
  });
});

router.get('/connection/author_system', gui_middleware.view_is_logged_in, (req, res, next) => {
  res.render('pages/basic', {
    body_name: '../body/connection/author_system',
    //script_name: '../script/null',
    script_name: '../script/connection/author_system',
    title: 'Phân quyền hệ thống',
  });
});

router.get('/connection/author_account', gui_middleware.view_is_logged_in, (req, res, next) => {
  res.render('pages/basic', {
    body_name: '../body/connection/author_account',
    script_name: '../script/null',
    title: 'Phân quyền tài khoản',
  });
});

router.get('/admin/user_permission', gui_middleware.view_is_logged_in, (req, res, next) => {
  res.render('pages/basic', {
    body_name: '../body/admin/user_permission',
    script_name: '../script/admin/user_permission',
    title: 'Quản trị phân quyền',
  });
});

router.get('/admin/user_manager', gui_middleware.view_is_logged_in, (req, res, next) => {
  res.render('pages/basic', {
    body_name: '../body/admin/user_manager',
    script_name: '../script/admin/user_manager',
    title: 'Quản trị người dùng',
  });
});

router.get('/profile', gui_middleware.view_is_logged_in, (req, res, next) => {
  res.render('pages/basic', {
    body_name: '../body/user/profile',
    script_name: '../script/user/profile',
    title: 'Thông tin cá nhân',
  });
});

module.exports = router;