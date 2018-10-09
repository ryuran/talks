<!--{section^1: data-breadcrumb="Encrypt?"}-->

<!--{.interleaf}-->

## Encrypt?

???

How many of you have already tried to work with ciphers, or understand how keys exchange works?

Okay. Did you tear blood?

I must tell you that I'm not a cipher expert. It requires a lot of math skills, and I'm not a mathematician. I won't pretend I can turn you into security experts. I like to give you the keys I wish someone had given me back in the days.

The first time I encountered encryption, I was working as a front-end developer for a startup named "Cozy Cloud." We were working on a personal cloud. It allows you to store your whole digital life and get control back over your privacy.

You can bet that with this kind of product, I had to deep dive into ciphers and cryptography.

===

Ciphers' nightmare

![Gif: panic]()

???

I had this kind of attitude the first time I tried to encrypt and decrypt a blob of data. I read the docs, cried, tried, and cried again.

But, I didn't have any other option: it was a digital home, and doing encryption on data was mandatory. So I started from scratch. The first thing I learnt was:

===

### What Crypto Isn't?

- authentication
- security layer
- revoking

???

Cryptography isn't authentication, security, nor revoking access or authorizations. Those things _use_ cryptography in the back, but they are the tip of the iceberg.

===

### To Serve And To Protect

![Gif: Batman]()

???

Cryptography is protecting sensitive information from malicious access or use.

===

### What Crypto Is?

- Hashing
- Encrypt
- Key Exchange
- Signature

???

So, cryptography is only about hashing, encryption, key exchange, and signature. Nothing more.

===

### Only The Key Matters

???

The second thing I learnt is: "your security doesn't reside in the algorithm. The key, and the key only, matters."

I mean, you need to select a reliable and secured cipher algorithm. But its security doesn't reside in its implementation secrecy. That's the main reason why best ciphers algorithms are open source. If you only bet on the fact that your algorithm is closed source to keep it secured, you've got an enormous problem. Because one day or another, it will leak. Open source is the guarantee that many researchers can review the code. It ensures it to be rock-solid and not corrupted.

The key in itself is the only protection. Also, the highest vulnerability too. Let's see that!
