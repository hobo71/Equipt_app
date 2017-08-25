import axios from 'axios';

export default function(history) {

	const BASE_PATH = '/api';

	this.token = null;

	this.get = (url) => {
		return new Promise((resolve, reject) => {
			
			this.send(url, 'GET')
			.then((res, apiKey) => {
				resolve(res);
			}, (err) => {
				reject(err);
			});
		});
	}

	this.post = (url, data, options) => {
		return new Promise((resolve, reject) => {
			this.send(url, 'POST', data, options)
			.then((res, apiKey) => {
				resolve(res, apiKey);
			}, (err) => {
				reject(err);
			});
		});
	}

	this.put = function(url, data, options) {
		return new Promise((resolve, reject) => {
			this.send(url, 'PUT', data, options)
			.then((res, apiKey) => {
				resolve(res, apiKey);
			}, (err) => {
				reject(err);
			});
		});
	},

	this.delete = function(url) {
		return new Promise((resolve, reject) => {
			this.send(url, 'DELETE')
			.then((res, apiKey) => {
				resolve(res, apiKey);
			}, (err) => {
				reject(err);
			});
		});
	},

	this.send = function(url, method, data, options = {}) {

		return new Promise((resolve, reject) => {

			var ajaxObj = {
				url: BASE_PATH + url,
				method: method,
				responseType: options.isMultipart ? false : 'application/json',
 				cache: false,
 				processData: false,
				data: options.isMultipart ? options.data : data,
				headers: {
        			'Authorization': `Basic ${ this.token }`
    			}
			};

			axios(ajaxObj)
			.then((res, status, xhr) => {
				resolve(res.data);
			})
			.catch(err => {
				const { status } = err.response;

				if (status === 500 || status === 401) {
					localStorage.clear();
					history.push('/login');
				} else if (status === 404) {
					history.push('/not_found');
				}

				reject(err.response.data);
			});

		});

	}

};