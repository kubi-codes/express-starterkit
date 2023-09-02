// POST /auth/login
/**
 * @typedef Login
 * @property {string} email.required
 * @property {string} password.required
 */
/**
 * @route POST /auth/login
 * @group AUTH - Handler Authentication
 * @param {Login.model} login.body.required - the new point
 * @produces application/json
 * @consumes application/json
 */


// POST /auth/register
/**
 * @typedef Register
 * @property {string} email.required
 * @property {string} password.required
 */
/**
 * @route POST /auth/register
 * @group AUTH - Handler Authentication
 * @param {Register.model} register.body.required - the new point
 * @produces application/json
 * @consumes application/json
 */

// GET /auth/logout
/**
 * @route GET /auth/logout
 * @group AUTH - Handler Authentication
 * @produces application/json
 * @consumes application/json
 * @security JWT
 */
