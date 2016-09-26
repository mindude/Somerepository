/**
 * The Index of Routes
 */

module.exports = function (app) {
    app.use('/signup', require('./routes/signup'));
    app.use('/createthread', require('./routes/createthread'));
    app.use('/threads', require('./routes/threads'));
    app.use('/users', require('./routes/users'));
}
