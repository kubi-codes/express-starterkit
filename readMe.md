# Express Starterkit

## Install

how to install in yout local, you can clone this repo with

``` git clone https://github.com/kubi-codes/express-starterkit.git ```

or you can click <b>use this template</b> and customize with your project.

## Setup

Create your database and edit your .env.example to .env, after that change the value with your credential, example:
```
APP_PORT=5000
APP_SECRET_KEY=130a62774cfb6bd2ac7f05f08766f94a
APP_DEBUG=false

DB_HOST=localhost
DB_NAME=express_starterkit
DB_USER=root
DB_PASS=
DB_TYPE=mysql
```

if you want REDIS Caching you can add on bottom env file like this
```
APP_PORT=5000
APP_SECRET_KEY=130a62774cfb6bd2ac7f05f08766f94a
APP_DEBUG=false

DB_HOST=localhost
DB_NAME=express_starterkit
DB_USER=root
DB_PASS=
DB_TYPE=mysql

REDIS=true
```

after that run this command

```
npm install
sequelize db:migrate
nodemon
```
Thats all, you can use and customize this starterkit
