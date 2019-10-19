# serverlesss-restaurant

Usually we would host a html page on s3 and use CF as CDN. In this application I will use API GW and Lambda  to create a http endpoint to return a static landing page. This example shows that you can return any format not just JSON which is the norm.

We create two endpoints:
1. get-index : An endpoint to return a Landing Page
2. get-restaurants : An Endpoint to return a list of restaurants.

I used a plugin called serverless-pseudo-parameters so that I don't have to hardcode Account information.

I create a dynamodb table and populated it with restaurants name using seed.json file. I used mustache to inject the restaurants name into html.
