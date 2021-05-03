const contentType = ['application/json', 'multipart/form-data'];
export const swaggerUI = {
	swagger: '2.0',
	info: {
		version: '1.0.0',
		title: 'Bible Swagger',
		description: 'Bible Swagge API documentation',
		license: {
			name: 'Bible',
			url: 'https://www.bibleask.com/'
		}
	},
	servers: {
		url: `http://localhost:${process.env.PORT}`
	},
	basePath: '/api/v1',
	tags: [
		{
			name: 'Media Services Details',
			description: 'Media Service Details API'
		}
	],
	schemes: ['http'],
	consumes: contentType,
	produces: contentType,
	components: {
		securitySchemes: {
			BearerAuth: {
				type: 'http',
				scheme: 'bearer',
				bearerFormat: 'JWT'
			}
		}
	},
	securityDefinitions: {
		Bearer: {
			type: 'apiKey',
			name: 'Authorization',
			in: 'header'
		}
	},
	security: [
		{
			Bearer: []
		}
	],
	paths: {
		
	},
	definitions: {
		
	},
	responses: {
		CreateShoDetailSuccessResponse: {
			properties: {
				meta: {
					status: 201,
					message: 'OK'
				},
				responses: {
				
				}
			}
		},
		TokenExpired: {
			properties: {}
		},
		ServerError: {
			properties: {}
		}
	}
};
