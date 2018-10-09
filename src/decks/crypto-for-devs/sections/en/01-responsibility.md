<!--{section^1:data-breadcrumb="Developer's Responsibility"}-->

<!--{.interleaf}-->
## Developer's responsibilty

???

Before talking about cryptography itself, I must start with a little introduction. Here's what I call the "developer responsibility".

===

@[giphy](V4uGHRgz0zi6Y)

???

Wether your are a developer or a software architect, you manipulate your users' data. Our users trust us to keep their precious information safe.

Funny enough, they often don't realize how the GAFAM and alls are pushing to have access to their own data.

As a user, we produce a shitload of data every second. This data belongs to us but we don't feel concerned about how and where our apps editors store it. And guess what? Even when we're aware of that, we can't do anything! You can't force your apps to use a higher security level. But, you can take security (and data encryption) into consideration when you choose an app.

===

![Gif: Robocop]()

???

So, as an editor, we should put in place better security layers. It's better for our business because it gives to our apps a higher level of confidence. More than anything, it's better _for our users_. We are responsible for their data, and we must take care of it. Users want to trust us for that.

Unfortunately, we can't trust them in return...

===

### Password's limit

_CKI_{.fragment .fade-out data-fragment-index="1"}
_Chair Keyboard Interface_{.fragment .fade-in data-fragment-index="1"}

- [The Scary Truth About Your Passwords - Lastpass blog - 2014][1.1]
- [Worst passwords of 2017, Top 100 - Splashdata - 2017][1.2]
{.linkrolls}

???

The most common tool we give to our users to protect their privacy is... password. And there's a limit to password:

The Chair Keyboard Interface.

Most studies prove that users don't know how to use a password.

I can't blame them for that. Seriously, do you think that I can explain to my 85's grandmother that she needs to use a hard to remember password? And she must never ever writes it on a piece of paper. She can't. Most people can't. Because we have a lot of passwords with ridiculous policies that vary for each service. It's mad! We're mad to force our users to do that.

So, users get their revenge. They don't wanna be creative when they pick up a new password. They commonly use passwords like _password_, _qwerty_, _pass1234_, _pass4321_ (this one is creative, right)...

Passwords aren't secured anymore. They never were...

===

I don't care; We don't host sensitive data

![Please, kill me...]()

???

People tell me sometimes that they don't feel concerned. They think their service doesn't host any sensitive data. If your service is an app like a digital library, you may think that you don't host sensitive data.

And you're wrong.

I guess that your service have an accounts system. It means that you store for each user a login, I suppose their e-mail, and a password. And people don't know how to pick up a password. They often use the same one everywhere; Including their e-mail address. The inbox is a Graal for any hacker: if you've got access to the mailbox, you've got access to the reset password e-mails. You've got a pass to everywhere. People don't know how to protect themselves.

So you have in **your** service database both user's e-mail and master passwords. If your database leaks, it's a game over. For them first. Please don't forget that you do have critical data, you shouldn't ignore it.

===

- Data War
- Tracking and Cross-profiling
- Digital ID

???

We are holding a lot of data while the digital world is tempting to access it. It's a war, and we're in frontline. Our best defense holds in one sentence :

===

Any sensitive data **must** be transferred and stored in an **encrypted** form

===

### Encrypt!

![Accept]()

???

So do encryption. A lot of encryption. As much encryption as you can. You have to make peace with this idea.


[1.1]: https://blog.lastpass.com/2014/09/the-scary-truth-about-your-passwords-an-analysis-of-the-gmail-leak.html/
[1.2]: https://13639-presscdn-0-80-pagely.netdna-ssl.com/wp-content/uploads/2017/12/Top-100-Worst-Passwords-of-2017a.pdf
