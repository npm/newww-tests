integration tests for newww
===========================


`brew install chromedriver`

`npm i; npm t`

To choose where the tests look to run, set the `NPM_SELENIUM_URL` environment variable, like so:

```shell
NPM_SELENIUM_URL=https://my-workspace:15443 npm test
```
