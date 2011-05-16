# log.js - a log layer on top of console.* API

log.js is a log layer on top of console.* API.

It aims to provide more flexibility, more informations and more readability, to the
usual console.* API.

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