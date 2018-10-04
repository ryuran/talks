<!--{section^1: data-breadcrumb="Tooling"}-->

<!--{.interleaf}-->
## Tooling

???

Now, it's time to talk a bit about how to implement cryptography, especially in modern architectures.

===

### Low-level languages

- OS modules
- Librairies (OpenSSL)
- Hardware (AES-NI, Co-processor)

???

If you're working in a low-level environment, then rely on your operating system, or low-level libraries, like OpenSSL. You can also use direct access to a cryptographic set of instructions, like Intel's AES-NI; or using a co-processor dedicated to cryptographic tasks. Nevertheless, it's a hard job that requires many security skills.

===

### Backend languages

- Python: PyCrypto
- Ruby: RbNaCl
- Node.js: Crypto built-in module
- PHP: Mcrypt
- Java: JCE Framework

*[JCE]: Java Cryptography Extension

???

When you work with advanced scripting languages, you've got access to a wide list of extensions dedicated to cryptography. They contain everything you need to hash, encrypt, decrypt, randomly generate, sign, etc. Use them.

===

### Browser side

![Gif: Happy]() <!--{.fragment.fade-out data-fragment-index="1"}-->
![Gif: Sad]() <!--{.fragment.fade-in data-fragment-index="1"}-->

???

In the browser, there is a spec, produced by the _W3C WebCrypto Woking Group_. I know the group's chairwoman, and when she told me they are working on a spec, I was like this. Then I read the spec.

It is the most obscure, unsable spec produced by the W3C. It's a paper from researchers and security experts, for cryptographers. If you're not involved in cryptography, you must give it up.

===

WebCrypto API

```js
window.crypto.subtle.encrypt(/* ... */)
  .then(function(encrypted){
    //returns an ArrayBuffer containing the encrypted data
    console.log(new Uint8Array(encrypted))
  })
  .catch(function(err){
    console.error(err)
  })
```

![Gif: Doubt]()

???

Nevertheless, it's an official spec since Jan. 2017, even if the group was dissolved then. The API exposes a root namespace, crypto, which exposes a subtle subnamespace; Probably because it's too subtle to be used by Beotians. No, it's just because Microsoft tried some implementations years ago, and exposed them in the crypto namespace. And you know that we, as web developers, are the only developers that ship code compatible with more than 25 years old interpreter.

The hard trick is that all functions exposed by the WebCrypto API use _promises_, and _binary arrays_. So you have to convert a lot of data from and to their binary form to manipulate them. I don't say it's impossible, but it's far than a simple thing.

===

Supported algorithms

- RSASSA-PKCS1-v1_5 / RSA-OAEP
- AES-CBC / AES-GCM / AES-KW
- HMAC
- SHA-256 / SHA-384 / SHA-512

But **implementors** choose which ones!
<!--{p:.fragment.fade-in}-->

Do you remember `canPlayType`?
<!--{p:.fragment.fade-in}-->

???

The spec officially supports a lot of modern, robust algorithms. Unfortunately, no one is mandatory. Browsers implementors choose which one to include in their browser. You have to test each one to know if it is supported or not.

Do you remember _can play type_? The _HTML media_ element has a _can play type_ function, allowing you to ask if the browser supports your media format. This function can return a boolean (true/false); or _maybe_; or _probably_. Funny, right? That's when your browser can't read the media by itself but can expect the OS can do it directly. Same thing here: no guarantee your browser supports your cipher.

So it's a low-level API.

===

Browser libs

- js-nacl
- jsencrypt
- jwcrypto
- CryptoJS
- ...

<!-- --- -->

- [gist://jo/8619441](https://gist.github.com/)
<!--{ul:.linkrolls}-->

???

When I gave this talk the first time, three years ago, I said: "I hope we will see high-level API coming soon, like a _JQuery for crypto_." Here it is! There are now many JS libs based on WebCrypto, that allow you to manipulate ciphers in the browser. You can find a curated list of them in this gist.

===

For Fun: Handshake in the Browser

???

To show you how the WebCrypto API is powerful, here's how to perform a handshake auth based on asymmetric keys.
