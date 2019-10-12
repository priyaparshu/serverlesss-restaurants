# serverlesss-restaurant

Ususally we would host an html page on s3 and use CF as CDN. In this application we will use API GW and Lambda  to create a http endpoint to return a static landing page. This example shows that you can return any format not just JSON which is the norm.

We create two endpoints:
1. get-index : An endpoint to return a Landing Page
2. get-restaurants : An Endpoint to return a list of restaurants.

We use plugin called serverless-pseudo-parameters so that we don't have to hardcode Account information.

We create a dynamodb table and populate it with restaurants name using seed.json file. We use mustache to inject the restaurants name into html.
