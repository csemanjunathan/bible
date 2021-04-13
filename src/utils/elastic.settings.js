'use strict';

export const settings = {
	analysis: {
		filter: {
			autocomplete_filter: {
				type: 'edge_ngram',
				min_gram: 1,
				max_gram: 20
			}
		},
		analyzer: {
			autocomplete: {
				type: 'custom',
				tokenizer: 'standard',
				filter: ['lowercase', 'autocomplete_filter']
			}
		}
	}
};

export const initmapping = {
	properties: {
		title: {
			type: 'text',
			analyzer: 'autocomplete',
			search_analyzer: 'standard'
		},
		name: {
			type: 'text',
			analyzer: 'autocomplete',
			search_analyzer: 'standard'
		},
		sho_id: {
			type: 'text',
			analyzer: 'autocomplete',
			search_analyzer: 'standard'
		},
		genre: {
			type: 'text',
			analyzer: 'autocomplete',
			search_analyzer: 'standard'
		},
		is_active: {
			type: 'integer'
		},
		is_archived: {
			type: 'integer'
		},
		status: {
			type: 'integer'
		},
		is_public: {
			type: 'integer'
		},
		sho_type: {
			type: 'integer'
		},
		tags: {
			type: 'text',
			analyzer: 'autocomplete',
			search_analyzer: 'standard'
		},
		gudsho_release_date: {
			type: 'date',
			format: 'YYYY-MM-dd'
		},
		created_at: {
			type: 'date',
			format: 'YYYY-MM-dd HH:mm:ss'
		}
	}
};

export const docType = 'studios';

export const searchpayload = {
	from: '',
	size: process.env.PER_PAGE || 12,
	query: {
		bool: {
			must: {
				multi_match: {
					query: '',
					type: 'cross_fields',
					analyzer: 'standard',
					fields: ['name^10', 'title^10', 'tags', 'genre', 'sho_id']
				}
			},
			filter: {
				bool: {
					must: [
						{
							term: {
								is_active: 1
							}
						},
						{
							term: {
								is_archived: 0
							}
						},
						{
							term: {
								status: 3
							}
						},
						{
							term: {
								is_public: 1
							}
						},
						{
							term: {
								is_published: 1
							}
						}
					]
				}
			}
		}
	}
};
