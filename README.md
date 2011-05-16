# log.js - a log layer on top of console.* API

(early work)

log.js is a log layer on top of console.* API.

It aims to provide more flexibility, more informations and more readability, to the
usual console.* API.


# How to use it
Let look at the following code from examples/basic.js

    function bar(){
        logjs.log("foo");	
    }
    bar();

It will output

    $ node examples/basic.js 
    [9:09.839] basic.js:5:bar(): foo


# TODO
* implement colors to make things more readable
  * possible with tty on node (see https://github.com/jeromeetienne/nmod/blob/master/nmod#L204)
  * possible with firefox console.*
    * console.log('%cThis is red text on a green background', 'color:red; background-color:green');
    * from http://getfirebug.com/wiki/index.php/Console_API#console.log.28object.5B.2C_object.2C_....5D.29
* implement a way to configure logging by namespace
  * like in this file, log only error
  * in this other file, log everything
  * like the filename is the namespace