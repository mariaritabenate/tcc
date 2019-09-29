const { env } = process

const config = {
	environment: env.NODE_ENV || 'development',
	port: +(env.PORT || 4000),
	database: {
		host: env.DB_HOST || 'localhost',
		schema: env.DB_DATABASE || 'helena',
		username: env.DB_USERNAME || 'postgres',
		password: env.DB_PASSWORD || 'postgres'
	},
	smtp: {
		username: env.SMTP_USERNAME,
		password: env.SMTP_PASSWORD
	},
	salt: env.SALT || 'salt',
	webUrl: '', // defined below
	host: '' // defined below
}

if (config.environment === 'development') {
	config.webUrl = 'http://localhost:3000'
	config.host = 'localhost'
}

if (config.environment === 'production') {
	config.webUrl = 'http://ec2-34-201-70-141.compute-1.amazonaws.com'
	config.host = 'ec2-34-201-70-141.compute-1.amazonaws.com'
}

module.exports = config
