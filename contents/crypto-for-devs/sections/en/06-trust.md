<!--{section^1: data-breadcrumb="Trust"}-->

<!--{.interleaf}-->
## Keys Exchange, Certificates, Signatures

???

So, we know how to encrypt data too. It's time to deal with the rest of cryptography: key exchange, certificates, signatures. All those things here to give trust in your data.

===

### Symmetric Key

- one key for all operations
- fast
- critic on key exchange <!--{li:.fragment.fade-in}-->

???

The fastest and simpler algorithms in use are symmetric ciphers. However, because the key need to be transferred, it's difficult to maintain its security.

Researchers early found that a system able to use two different keys, with one always kept safe, is the most robust pattern. Unfortunately, it's a was more difficult to design than to explain.

===

### Diffie-Hellman

<!-- SVG ANIM: Diffie Hellman -->

???

During their journey to find a valid public-key cipher, Diffie and Hellman found an intermediate solution. Here's how this key exchange pattern works.

Our goal is to obtain a symmetric key that two recipients can use to encrypt a message, without the need to share this key. Each recipient has a private key. They both choose a shared secret publicly. Anybody can see it. Each recipient mixes its private key and the public secret. Then they exchange those mix. Each of them mixes the other recipient mix with their private key. BOOM, both obtain the same result!

Using a common public secret, they both can generate the same key on their side and use it as a symmetric key. Diffie and Hellman were early aware that their pattern presents some leaks: you need to exchange parts that implies your private key, which means your private key can be retro-engineered at a given time. It can't be a strong enough solution for long-time exchanges. However, for short-term exchanges, it sufficient. That's why it is used in TLS communications (the _s_ in _HTTPs_). Server and Client generate random secret keys, share a common secret, then generate the symmetric key that will protect a single request-response HTTP transfer. At each new request, the whole process is replayed.

===

### Asymmetric Keys And Key Wrapping

1. Encrypt the message with a symmetric cipher and random key (e.g. IDEA)
2. Encrypt the symmetric key with an asymmetric cipher (e.g. RSA) <!--{li:.fragment.fade-in data-fragment-index="1"}-->
3. Concatenate both encrypted part in one message <!--{li:.fragment.fade-in data-fragment-index="2"}-->
4. Decrypt the symmetric key using the private key  <!--{li:.fragment.fade-in data-fragment-index="3"}-->
5. Decrypt the message with the symmetric key  <!--{li:.fragment.fade-in data-fragment-index="3"}-->

???

A bottleneck with asymmetric ciphers is that they take a high CPU time to do encryption and decryption operations. It means that it takes a loooooong time, which isn't acceptable when doing day-to-day operations.

Instead, we encrypt the message with a random symmetric key. Then we encrypt the key with the asymmetric public key, which is fast because a key is always tiny. We pack both, send it, and do the opposite operation to decrypt the message.

This key-exchange pattern is called _key wrapping_ and take both of the two worlds, including randomness and fast operations.

===

![Gif: PGP]

???

It's the principle behind PGP, which was a promise of cryptography for everyone; Which worked well because everybody uses it nowadays. No? Who use it? Yeah, it's one of the big fails of PGP and encryption globally: it proves that it stays too complicated for people to handle it easily. Use it, really. It's dead simple after all.

===

### Signature

- Reversed Asymmetric Cipher
- For trusting purposes only

???

An interesting side effect with asymmetric ciphers is that you can also encrypt with your private key and decrypt with the public one. It's useless for security purposes because your public key is public. Everybody could decipher your message, so it protects nothing. However, if you're able to decipher using a public key, it means that it was encrypted using the associated private key. And you're its only owner. So if a message comes, encrypted with your private key, no-one but you can have sent it.

This pattern is called _signature_. It's a robust and straightforward way to ensure your message comes from an identified entity. My mother does it by phone. I recently sent her an e-mail asking for old photos of me, to send to a colleague she doesn't know. She called me to ask me if I was the original sender of the mail before leaking some compromising contents. I definitely need to explain PGP to my mom.

===

### Certificates

- Chain Of Trust
- Revocate identities
- X.509

<!-- --- -->

- [CryptoParty][6.2]
- [Let's Encrypt][6.1]

<!--{ul:.linkrolls}-->

???

Problem is: how to ensure that the public-key you get belongs to your recipient?

For people, we have _Crypto Parties_. You physically encounter people and sign their public key with your private key. It builds a chain of trust that allows you to trust the final public key.

However, for bigger entities, you can't encounter them physically. So we build a certificates authorities system, that builds a pyramidal chain of trust. A service public exposes a certificate that is used to sign its public key. A trusted authority delivers this certificate, signed by its public key; which can be certified by another top authority, and so-on. _Let's Encrypt_ is a project that delivers free of charge that kind of certificates, allowing everyone to certify the public key used by its service.

The advantage is that you can revocate a certificate at any time, which immediately invalidate the associated public key, in case of failure.

The main inconvenient is that a certificate injected into the chain of trust immediately break it. We saw that in 2016 when Symantec bought Blue Coat, a company that sells DPI systems. All certificates from Blue Coat then became the property of Symantec, which is a top-level authority. It occurred a significant revocation of certificates in the whole chain of trust.

===

### Protect

- Network ::--> ~~SSL~~/TLS, chain of trust:: <!--{span:.fragment.fade-in}-->
- Passwords ::--> Hashing functions:: <!--{.fragment.fade-in}-->
- Data ::--> Asymmetric Cipher w/ Key Wrapping, HSM:: <!--{.fragment.fade-in}-->

???

The purpose of cryptography is to protect.

Network? There are TLS and Certificates;
Passwords? Use password Hashing;
Data? Do key-wrapping and asymmetric encryption, with HSM devices when you can.


[6.1]: https://letsencrypt.org/
[6.2]: https://www.cryptoparty.in/
