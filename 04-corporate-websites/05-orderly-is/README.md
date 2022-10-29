# Orderly IS (5)

Hi, packet inspector,

do you want to order something? Use our Orderly information system, it is intuitive, fast, reliable and secure! At least that's what we claim in the TV ad. In last few hours it began to act weirdly, but its administrator is on vacation away from civilization (and connectivity).

You will have to break into the [Orderly information system](http://orderly.mysterious-delivery.tcc:23000/) and check its configuration.

May the Packet be with you!

## Hints

- Use VPN to get access to the web.

## Solution

### Web enumeration

After running gobuster, we can see there is also /settings page.

```
> gobuster dir -w /usr/share/wordlists/dirbuster/directory-list-2.3-small.txt -u http://orderly.mysterious-delivery.tcc:23000/order/add

/login                (Status: 200) [Size: 1846]
/javascript           (Status: 301) [Size: 364]
/logout               (Status: 302) [Size: 199]
/settings             (Status: 302) [Size: 199]
```

### Testing injection

Let's try to submit javascript between `<script></script>` tag.

![script tag](injection-test.gif)

We'll listen with the netcat.

```
> nc -lvkp 1337

Listening on 0.0.0.0 1337
```

Now let's fetch [/settings](http://orderly.mysterious-delivery.tcc:23000/settings) and then send the response to us.

![getting-flag](getting-flag.gif)

`FLAG{9QVE-0miw-qnwm-ER9m}`
