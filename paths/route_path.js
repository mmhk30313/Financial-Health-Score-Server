const { error4o4Controller, error500Controller, error401Controller } = require('../api/controllers/error_controller/error_controller.js');
const root = require('./routes/root');

const all_paths = [
    require('./routes/signup-login'),
    require('./routes/user'),
    require('./routes/business/index.js'),
    require('./routes/account_details/index.js'),
];

module.exports = (app) => {
    app.use(root);
    all_paths.map(path => app.use('/api/v1', path));
    app.use(error4o4Controller);
    app.use(error500Controller);
    app.use(error401Controller);
}
