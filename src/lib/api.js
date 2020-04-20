import { Headers } from 'node-fetch';

export const myHeaders = new Headers();

myHeaders.append(
	'Authorization',
	'eyJraWQiOiJ3Wm9USDNFTTZtTXVROEs1aEJSZDh0RmN2MkpCVkcwQmVUSHRWYWlBQ1hrPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJhY2I2M2ZhNy1lNTQ0LTQxYzYtOGZiYy02ODQ1MTZmNzRkYzEiLCJjb2duaXRvOmdyb3VwcyI6WyJTdXBlckFkbWluIiwiQWRtaW4iXSwiZW1haWxfdmVyaWZpZWQiOnRydWUsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5ldS13ZXN0LTEuYW1hem9uYXdzLmNvbVwvZXUtd2VzdC0xXzlFQm5LdjBRVSIsImNvZ25pdG86dXNlcm5hbWUiOiJhY2I2M2ZhNy1lNTQ0LTQxYzYtOGZiYy02ODQ1MTZmNzRkYzEiLCJnaXZlbl9uYW1lIjoiY29yaW5uZWUiLCJjb2duaXRvOnJvbGVzIjpbImFybjphd3M6aWFtOjo5Mjc2NDkyNTQyOTY6cm9sZVwvY2VjYXotcGFjYmRkLXJvbGUtYWRtaW4iLCJhcm46YXdzOmlhbTo6OTI3NjQ5MjU0Mjk2OnJvbGVcL2NlY2F6LXBhY2JkZC1yb2xlLXN1cGVyLWFkbWluIl0sImF1ZCI6IjFlanBrcXA0YzhxYm1qM2pyNzdpOHE1MTM3IiwiZXZlbnRfaWQiOiIwYmIzMTA4ZS1iZTVlLTRmMjAtYmJiZi03ZmU3MWZjZGI2YTkiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTU4NDYwODM2MiwiZXhwIjoxNTg0NzAxNzkyLCJpYXQiOjE1ODQ2OTgxOTIsImZhbWlseV9uYW1lIjoic2F2YXJkIiwiZW1haWwiOiJjb3Jpbm5lLnNhdmFyZEB0ZXN0LjUzanMuZnIifQ.Y4of_ld3CEhmfmh-70S5CLZuCm1idq6sCHyn5gJRH5yJ2wGGpSjNZxmPlPELM7xP0EX5df8xiQLjkSNR0C4mxQvI6NUYZC_avHo-_LVRO59r0MCdRJwSy3DnIGKTPBfYJg8gcfwfAW6gNsb_6rhNwjv3wZNXzStjsLL-EUHasb9E6zKaVJpLAZlbcATAiWgiLqGP0gZtZh80iSnYWRf83_0s2bcO6OOKaidqqG9FcKFHXDrCvtUyCGPFAwnay3sOb3mTHxHGNN3e_eyQ1N9OOu6WeUW3S4x2MADdWsuVJjEy5ZlsdWuozjz_nsw5zqJzljUx5kl7Ym5tQt1bxmu2fg',
);

myHeaders.append('Content-Type', 'application/json', 'text/plain; charset=UTF-8');
myHeaders.append(
	'Authorization',
	'AWS4-HMAC-SHA256 Credential=AKIA2CVV6DL3AJUVMGMC/20200321/us-east-1/execute-api/aws4_request, SignedHeaders=content-type;host;x-amz-content-sha256;x-amz-date, Signature=c216ee981932a1caebe6c317ce3e7ab9acce8c8f12aa34c0a272c814f624b86b',
);

//myHeaders.append("X-Amz-Content-Sha256", "beaead3198f7da1e70d03ab969765e0821b24fc913697e929e726aeaebf0eba3");
//myHeaders.append("X-Amz-Date", "20200328T113722Z");
myHeaders.append('Authorization', 'AWS4-HMAC-SHA256 Credential=AKIA2CVV6DL3AJUVMGMC/20200328/eu-west-3/execute-api/aws4_request, SignedHeaders=host;x-amz-content-sha256;x-amz-date, Signature=00d4dc4127c79338f70dbc1eef1bfca588958065b1f1093d2c42e20f1fb5920e');


export const requestOptions = (body) => {
	console.log(JSON.stringify(body));

	return {
		mode: 'no-cors',
		method: 'POST',
		headers: myHeaders,
		body: JSON.stringify(body),
		redirect: 'follow',
	};
};

//export default myHeaders;
