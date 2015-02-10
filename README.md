Static
======

Static is a lightweight boilerplate for build static website with great power (dont forget it comes comes great responsibility too).
Its features includes a develop environment, distribution package, dependecies manager and bump version control.

Version
----

0.1.2

Tech
-----------

Static uses a number of open source technologies to work properly:

* [Node js] - platform built on Chrome's JavaScript runtime for easily building fast, scalable network applications.
* [Grunt] - The javascript task runner.
* [Sass] - Stable, and powerful professional grade CSS extension language.
* [Compass] - CSS Authoring Framework.
* [Bower] - Package manager for the web.

Installation
--------------

```sh
git clone https://github.com/weslleyaraujo/static.git your_project
cd your_project
npm install
bower install
```

Tasks
=====

###### Development environment

```sh
grunt develop
```
Just open your brower ate http://localhost:8180 (the port can be change at `Gruntfile.js`)

###### Distribution package

```sh
grunt build
```

A distribution package is created with minified files in `dist/` folder

###### Bump version

Static uses [Grunt Bump] from [@vojtajina] for this feature.

Let's say current version is `0.0.1`.

```bash
$ grunt bump
>> Version bumped to 0.0.2
>> Committed as "Release v0.0.2"
>> Tagged as "v0.0.2"
>> Pushed to origin

$ grunt bump:patch
>> Version bumped to 0.0.3
>> Committed as "Release v0.0.3"
>> Tagged as "v0.0.3"
>> Pushed to origin

$ grunt bump:minor
>> Version bumped to 0.1.0
>> Committed as "Release v0.1.0"
>> Tagged as "v0.1.0"
>> Pushed to origin

$ grunt bump:major
>> Version bumped to 1.0.0
>> Committed as "Release v1.0.0"
>> Tagged as "v1.0.0"
>> Pushed to origin

$ grunt bump:prerelease
>> Version bumped to 1.0.0-1
>> Committed as "Release v1.0.0-1"
>> Tagged as "v1.0.0-1"
>> Pushed to origin

$ grunt bump:patch
>> Version bumped to 1.0.1
>> Committed as "Release v1.0.1"
>> Tagged as "v1.0.1"
>> Pushed to origin

$ grunt bump:git
>> Version bumped to 1.0.1-ge96c
>> Committed as "Release v1.0.1-ge96c"
>> Tagged as "v1.0.1-ge96c"
>> Pushed to origin
````

If you want to jump to an exact version, you can use the ```setversion``` tag in the command line.

```bash
$ grunt bump --setversion=2.0.1
>> Version bumped to 2.0.1
>> Committed as "Release v2.0.1"
>> Tagged as "v2.0.1"
>> Pushed to origin
```

Sometimes you want to run another task between bumping the version and commiting, for instance generate changelog. You can use `bump-only` and `bump-commit` to achieve that:

```bash
$ grunt bump-only:minor
$ grunt changelog
$ grunt bump-commit
```

And thats it :)

License
----

MIT


**Free Software, Hell Yeah!**

[Node js]:http://nodejs.org/
[Grunt]:http://gruntjs.com/
[Sass]:http://sass-lang.com/
[Compass]:http://compass-style.org/
[Bower]:http://bower.io/
[SMACSS]:https://smacss.com/
[@vojtajina]:http://github.com/vojtajina/
[Grunt Bump]:http://github.com/vojtajina/grunt-bump/
