<!--{section^1:data-breadcrumb="Developer's Responsibility"}-->

<!--{.interleaf}-->
## Developer's responsibilty

???

Before introducing you the cryptography itself, I must start by a word about what I call "the developer responsibility."

===

![Gif: Gollum "my precious"]()

???

As a developer or a software architect, you have to protect your users' data. Our users trust us for keeping safe something really precious for them.

Fun fact (or not) is they often don't realize how the Internet's actors keep an eye on their data.

As a user, we produce a shitload of data every second. This data belongs to us but we give it to our apps editors without being concerned by where, and how, it is stored. And guess what? Even when we're aware of that, we can't do anything! You can't force your apps to use a higher security level. However, you can take security (and data encryption) into consideration when you choose an app.

===

![Gif: Superman]()

???

So, as an editor, we should implement better security layers. It's better for our business because it gives to our apps a higher level of confidence. More than anything, it's better _for our users_. We are responsible for their data, and we must take care of it. Users want to trust us for that.

Unfortunately, we can't trust them in return...

===

### Password's limit

_CKI_ <!--{.fragment.fade-out data-fragment-index="1"}-->
_Chair Keyboard Interface_ <!--{.fragment.fade-in data-fragment-index="1"}-->

- [The Scary Truth About Your Passwords - Lastpass blog - 2014][1.1]
- [Worst passwords of 2017, Top 100 - Splashdata - 2017][1.2]
<!--{ul:.linkrolls}-->

???

The most common tool we give to our users to protect their privacy is... password. And there's a limit to password:

The Chair Keyboard Interface.

Most studies prove that users don't know how to use a password.

I can't blame them for that. Seriously, do you think that I can explain to my grandmother, who's 85, that she needs to use a strong, hard to remember, password? And she must never ever writes it on a piece of paper. She simply can't. Most people can't. Because we have a lot of passwords; with ridiculous policies that vary for each service; that sometimes forces you to update your password every 12 weeks; without re-using one of the last 24 ones! It's mad! We're mad to force our users to do that.

So, users get their revenge. They don't wanna be creative when they pick up a new password. They commonly use passwords like _password_, _qwerty_, _pass1234_, _pass4321_ (this one is creative, right)...

Passwords aren't secured anymore. They never were...

===

I don't care; We don't host sensitive data

![Please, kill me...]()

???

Some people sometimes told me that they're not concerned, because their service doesn't host any sensitive data. If your service is, let's say, an app that let your users store information about their books, like a digital library, you may be tempted to think that you don't host sensitive data.

And you're wrong.

You service probably have an accounts system. It means that you store for each user a login, which is probably their e-mail, and a password. However, we just saw that our users don't know how to pick up a password. They often use the same one everywhere; On all services; Including their email address. The inbox is a Graal for any hacker: if you've got access to the mailbox, you've got access to the reset password emails. You've got a pass to everywhere.

So you probably have the email address and password couple of most of your users in **your** service database; Just because people don't know how to protect themselves. If your database leaks, it's a game over. For them first.

Please, you **have** critical data in your database. You can't ignore it.

===

Only **one** solution

???

Once again, we can't trust our users. We have to protect them. And there's only one way to do that.

===

### Encrypt!

![Deal]()

???

Do encryption; A lot; As much as we can. Deal with it.

===

- data war
- tracking et cross-profiling
- digital ID

???

As a developer, we stand at a corner, holding our users' data in our hands, with all digital world ready to spend millions of dollars to get access to this data. It's a war. We're in front of it. Our best defense holds in one sentence :

===

Any sensitive data **must** be transferred and stored in an **encrypted** form


[1.1]: https://blog.lastpass.com/2014/09/the-scary-truth-about-your-passwords-an-analysis-of-the-gmail-leak.html/
[1.2]: https://13639-presscdn-0-80-pagely.netdna-ssl.com/wp-content/uploads/2017/12/Top-100-Worst-Passwords-of-2017a.pdf
