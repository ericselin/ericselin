---
title: File-based client-server communication via named pipe
date: 2022-06-14
---

# Named pipes are handy for super-simple file-based client-server communication

Consider this scenario: you have an nginx server on one host, and an application server on another. Maybe started together and managed via Docker Compose - who knows? Anyway, your app server needs to reload the nginx config after doing something. What do you do? Go.

In my case it was a matter of reloading nginx after updating "htpasswd"/ basic auth files. Both are in containers in the same compose file. What I'd like to avoid is building a new image for this, I'd much rather just use the stock nginx image. Anyway, things that don't really work:

- Sending the reload through docker engine

    Might work, but is a PITA as you need to communicate via UNIX sockets (not available in my runtime of choice) or install docker on (or link the docker binary into) the app server container, keep track of the nginx container name, and all sorts of other quirks. But the biggest problem is, you need to bind mount the unix socket to the app server, which means **now you entire docker engine is accessible from you app server**.

- Running commands via nginx routes

    This is apparently possible via lua, but requires customizing the nginx build or some such. Plus, it seems the command execution is blocking.

- Sending the reload via a separate unix socket

    Maybe we can start a simple unix socket listener written in bash and start that when the container starts. No we cannot, since the stock nginx image has no `nc` and no `ncat`.

But that last idea was pretty good as an idea! How *can* we create a server in bash which can be accessed from the app server? They can both access the same files via volume mounts. We just create a simple "server" that listens to a named pipe, and a client that writes to the file. Like an unix socket, but possible to run with `cat` and `echo`.

`server.sh`
```sh
#!/bin/sh

echo Starting server...

if [ -p pipe ]
then
  while true
  do
    cat pipe
    nginx -s reload
  done
fi
```

`client`
```
$> echo 'Please restart!' > pipe
```

Pretty trivial to create a docker volume that contains this "pipe" file, and now we have communication between the app server and nginx with just a few lines of bash!
