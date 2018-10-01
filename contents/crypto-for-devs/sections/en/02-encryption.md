<!-- { section^1: data-breadcrumb="Encrypt?" } -->

<!-- { .interleaf } -->
## Encrypt?

???

Alright. You must deal with encryption. How many of you already tried to work with ciphers, or to understand how key exchange works?

Okay. Did you tear blood?

I must advise you that I'm not a cipher expert. It requires a lot of math skills, and I'm not a mathematician. I don't claim to transform you as security experts. I'm here to give you the keys I would have liked to have when I tried first.

My first time with encryption, I was working as a frontend developer for a startup named "Cozy Cloud." The product is a personal cloud that allows you to store your whole digital life and get control back over your privacy.

You can bet that with this kind of product, I had to deep dive into ciphers and cryptography.

===

Ciphers' nightmare

![Gif: panic]()

???

Frankly, the first time I tried to encrypt and decrypt a blob of data, and I read some documentation about how it works; I was probably like that.

===

No way to step back

![NSA Logo]()

???

However, I hadn't any other choice: we had access to a lot of data, and doing encryption on them was mandatory. So I started from scratch. The first thing I learned was:

===

### What Crypto Isn't?

- authentication
- security layer
- revoking

???

Cryptography isn't authentication, security, nor revoking access or authorizations. Those things _use_ cryptography in the back, but they are at the top of the iceberg.

===

### Target: To Serve And To Protect

![Gif: Batman]()

???

The only goal of cryptography is to protect sensitive information from malicious access or use.

===

### What Crypto Is?

- Hashing
- Encrypt
- Key Exchange
- Signature

???

So, cryptography is only about hashing, encryption, key exchange, and signature. That's all.

===

### Only The Key Matters

???

One thing I was not sure to correctly understand at the first time is: "your security isn't in the algorithm. The key, and the key only, matters."

I mean, you obviously need to select a reliable and secured cipher algorithm. But its security doesn't live inside it. That's the main reason why best ciphers algorithms are open source. If you only bet on the fact that your algorithm is closed source to keep it secured, you've got an enormous problem. Because one day or another, it will leak. Open source is the guarantee that many researchers can review the code, ensuring it to be rock-solid and not corrupted.

The key itself is the only protection. Also, the highest vulnerability too. Let's see that!
