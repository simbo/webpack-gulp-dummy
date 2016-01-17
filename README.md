webpack-gulp-dummy
==================

  > Testing webpack within gulp and trying to replace browserify to bundle javascripts.

--


## Usage

```
# setup
npm i -g gulp && npm i

# use
gulp
```


## Challenges


### Accomplished

  * bundle javascripts, support CommonJS require with custom require base path

  * use webpack watch instead of gulp watch

  * work as async gulp task, correctly emit `done`

  * agnostically create multiple entries and outputs by glob

  * use entry filename as output filename

  * test eslint rules on source javascript

  * in pruduction env, do not bundle js if eslint throws errors on javascript sources

  * in production env, uglify javascripts


### Unsolved

  * test eslint rules while watching, output results in console

  * use common gulp/vinyl streaming


### Untested

  * when watching, use live-reload


## License

[MIT &copy; Simon Lepel 2016](http://simbo.mit-license.org/)
