# ikonicsolution
 
Its contains laraval 8v in server side and react project in client side folder.
in laravel i did not create migrations sql database is provided.

for registration use 0 as a invitation code.

server side add env file and set mailtrap for email.

APP_NAME=Laravel
APP_ENV=local
APP_KEY=base64:6kdVungxUpDbpJnMaooVBvpq9lw+ugyAjM4nOR3O9Rk=
APP_DEBUG=true
APP_URL=http://localhost

LOG_CHANNEL=stack

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=mcdb_authme
DB_USERNAME=root
DB_PASSWORD=

BROADCAST_DRIVER=log
CACHE_DRIVER=file
QUEUE_CONNECTION=sync
SESSION_DRIVER=file
SESSION_LIFETIME=120

REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

MAIL_MAILER=smtp
MAIL_HOST=sandbox.smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=d7cef7bcbe83ff
MAIL_PASSWORD=a3a2e2a201b9b0
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=arfat.hotmail@gmail.com
MAIL_FROM_NAME=ikonic

MAILJET_APIKEY=e7225194afbf301443eabea322b8eaf5
MAILJET_APISECRET=dfb2d6f17209595d518ab74e927bb2ee

ADMIN_EMAIL_ADDRESS=arfat.alive@live.com

AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=

PUSHER_APP_ID=
PUSHER_APP_KEY=
PUSHER_APP_SECRET=
PUSHER_APP_CLUSTER=mt1

MIX_PUSHER_APP_KEY="${PUSHER_APP_KEY}"
MIX_PUSHER_APP_CLUSTER="${PUSHER_APP_CLUSTER}"

SESSION_DOMAIN=localhost
SANCTUM_STATEFUL_DOMAINS=localhost



And for Client side set env

REACT_APP_WEB_URL       =   http://localhost:3000/
REACT_APP_SERVER_URL    =   http://127.0.0.1:8000/
REACT_APP_SERVER_API_URL=   http://127.0.0.1:8000/api/
