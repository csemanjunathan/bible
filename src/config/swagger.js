const contentType = ['application/json', 'multipart/form-data'];
export const swaggerUI = {
	swagger: '2.0',
	info: {
		version: '1.0.0',
		title: 'GudSho Swagger',
		description: 'Gudsho Swagge API documentation',
		license: {
			name: 'GudSho',
			url: 'https://www.gudsho.com/'
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
		'/sho-details': {
			post: {
				tags: ['Sho Details'],
				summary: 'Create Sho Details',
				parameters: [
					{
						name: 'username',
						in: 'body',
						description: 'email',
						schema: {
							$ref: '#/definitions/ShoDetails'
						}
					}
				],
				produces: ['application/json'],
				responses: {
					201: {
						description: 'Success',
						schema: {
							$ref: '#/responses/CreateShoDetailSuccessResponse'
						}
					},
					401: {
						description: 'Token Expired',
						schema: {
							$ref: '#/responses/TokenExpired'
						}
					},
					500: {
						description: 'Server Error',
						schema: {
							$ref: '#/responses/ServerError'
						}
					},
					501: {
						description: 'Not Implemented',
						schema: {
							$ref: '#/responses/ServerError'
						}
					}
				}
			}
		}
	},
	definitions: {
		ShoDetails: {
			required: ['sho_id', 'title', 'slug', 'studio_id', 'description', 'thumbnail_image'],
			properties: {
				sho_id: {
					type: 'string'
				},
				title: {
					type: 'string'
				},
				slug: {
					type: 'string'
				},
				studio_id: {
					type: 'string'
				},
				description: {
					type: 'string'
				},
				thumbnail_image: {
					type: 'string'
				}
			}
		}
	},
	responses: {
		CreateShoDetailSuccessResponse: {
			properties: {
				meta: {
					status: 201,
					message: 'OK'
				},
				responses: {
					'sho-details': {}
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
