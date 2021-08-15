# User Authentication and Verification Demo

- Provides a demo or starter code for an account creation and login system that includes 📧 verification. No services aside from `nodemailer` and Ethereal Email are used
- **Does not** include `express-session` or `jwt`.

- ESM
- Linting, Prettier
- MySQL, Sequelize
- Node, Express
- `nodemon` (`npm start`)

You will need to provide the following in your `.env`:

```bash
DB_NAME=user_db
DB_USER
DB_PASSWORD
PORT
EMAIL
```

You will need to `SOURCE app/db/schema.sql` to create `user_db`.

Database will reset itself after every update because of `{sync: true}` in
`app/index.js` (the entry-point file).
