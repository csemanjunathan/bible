module.exports = {
	apps: [
		{
			name: 'gudSho_search_api',
			script: 'index.js',
			args: '',
			instances: 1,
			exec_mode: 'cluster',
			autorestart: true,
			watch: false,
			max_memory_restart: '1G',
			env: {
				NODE_ENV: 'development',
				PORT: 8080,
				IP: '0.0.0.0',
				PROJECT_ID: 1234,
				ACCESS_TOKEN_SECRET: 'my_access_token',
				MONGODB_URI: 'mongodb://localhost:27017/gudsho',
				REDIS_HOST: '127.0.0.1',
				REDIS_PORT: '6379',
				REDIS_PASSWORD: '123456',
				S3_KEY_ID: 'AKIA3XOY5LFAQ5CBQJZV',
				S3_SECRET: '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',
				S3_BUCKET_IMAGES: 'gudsho-dev-images',
				S3_BUCKET_VIDEOS: 'gudsho-dev-videos',
				S3_REGION: 'ap-south-1'
			},
			env_development: {
				NODE_ENV: 'development',
				PORT: 80,
				IP: '0.0.0.0',
				ALLOW_ORIGIN: '*, https://dev.gudsho.com',
				ACCESS_TOKEN_SECRET: 'my_access_token',
				REFRESH_TOKEN_SECRET: 'my_refresh_token',
				MONGODB_URI: 'mongodb://gudsho:5PEBJTulgxbg@192.168.1.103:27017/gudsho',

				CLIENT_ID: 'GUDSHO_CLIENT_ID',
				CLIENT_SECRET: 'GUDSHO_CLIENT_SECRET',

				REDIS_HOST: '192.168.1.106',
				REDIS_PORT: '6379',
				REDIS_PASSWORD: 'SAE@Redis',

				MYSQL_HOST: '192.168.1.106',
				MYSQL_USER: 'root',
				MYSQL_PASSWORD: 'SAE@Contus',
				MYSQL_DATABASE: 'gudsho-dev',

				ELASTIC_HOST: 'http://192.168.1.103:9200',
				ELASTIC_INDEX: 'gudsho-dev'
			},
			env_uat: {
				NODE_ENV: 'production',
				PORT: 80,
				IP: '0.0.0.0',
				ORIGIN_URL: 'http://socialactivitiesservice:80',

				ALLOW_ORIGIN: '*, https://dev.gudsho.com',

				ACCESS_TOKEN_SECRET: 'my_access_token',
				REFRESH_TOKEN_SECRET: 'my_refresh_token',

				JWT_SECRET: 'hZcWLt7vUmyeSuHsFPFVpHJlqpQokI1JzzjfitdcOdnUTu3L7Jn8OeIdvW7M0j0B',

				MONGODB_URI: 'mongodb://gudsho87:mXT6jJ98E9JW34@192.168.4.161:38087/gudsho_uat87',

				CLIENT_ID: 'GUDSHO_CLIENT_ID',
				CLIENT_SECRET: 'GUDSHO_CLIENT_SECRET',

				ELASTIC_HOST: 'http://192.168.4.67:37092',
				ELASTIC_INDEX: 'gudsho-uat'
			},
			env_production: {
				NODE_ENV: 'production'
			}
		}
	],

	deploy: {
		production: {
			user: 'node',
			host: '212.83.163.1',
			ref: 'origin/master',
			repo: 'git@github.com:repo.git',
			path: '/var/www/production',
			'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production'
		}
	}
};
