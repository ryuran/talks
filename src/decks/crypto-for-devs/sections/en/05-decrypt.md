<!--{section^1: data-breadcrumb="Symmetric And Asymmetric"}-->

<!--{.interleaf}-->
## Symmetric vs. Asymmetric

???

Well, hashing is great, but you may need to decipher your data.

We distinguish two kinds of encryption algorithms. Those that use a single key to both encrypt and decrypt – the symmetric ciphers; and those that use a pair of different keys: one for encryption, and one for decryption – they are the asymmetric ciphers.

Let's start with symmetric ciphers. They can be split into two categories:

===

### Block Ciphers

![Gif: Blocks Ciphers]

- ~~DES (Data Encryption Standard)~~
- AES (Advanced Encryption Standard)
- IDEA
- BlowFish

???

First, the block ciphers. Symmetric ciphers substitute elements in your data blob. Just like we've done with the Shift Cipher or the Vigenère Table.

Block Ciphers split the data blob into blocks, and iterate on each one to do a shift. Then often use more complex variables, where they also do permutations between blocks. They use a fixed length key, and _pad_ it (like we did with the _LEMON_ key) to adapt it to the length of the data blob to encrypt.

You will encounter the DES algorithm a lot. It's the real first publicly released digital cipher algorithm, but it is deprecated for a while now. Its next generation is AES, even if it tends to be weak right now.

Other well-known options are IDEA or BlowFish. There are many alternatives available; it depends what and how you need to encrypt data.

===

### Stream Ciphers

![Gif: Badass]()

- ~~RC4~~
- ChaCha20 ::?:: <!--{.fragment.fade-in data-fragment-index="1"}-->
- Panama ::?:: <!--{.fragment.fade-in data-fragment-index="1"}-->

???

Stream Ciphers encrypt an uninterrupted flow of data. They don't need to know first the length of the data blob to encrypt. They use a key generated with a CSPRNG to work on varying block, allowing them to resynchronize and adapt themselves on-the-fly.

Unfortunately, to keep the system secured, you need to generate a cipherkey on the fly as long as data flows. It means your cipherkey will grow extensively and probably overflow your memory at a given point. To avoid that, we often reuse the key in a padding pattern; Which introduces repetitions.

Repetitions are bad. Really, really bad.

RC4 was one of the first stream cipher algorithms and was used in WPA to protect WiFi connections. Due to its setup process, with a large amount of encrypted data (which occurs, well, all the time in network connections!) attackers may deduce the key and decipher the WPA data flow.

RC4 is deprecated, and WPA finally came back to AES. You can find stream ciphers alternatives like ChaCha20 or Panama, but they're not reviewed enough to be considered as safe.

One potential candidate to strong stream ciphers is quantum computers. Right now, we are trying to understand what _quantum_ means, so, it's probably not for tomorrow.

===

Computers aren't truly **random**

???

One big problem is finally pretty simple to explain: computers, thanks to their design, tends to reproduce patterns, even when they try to generate _random_ things. True randomness can only be obtained by using specific devices that measure temperature, hygrometry variations in real time, which cost a lot. So, to avoid the risk of repetitions, we tried to patch the false-randomness of our computers.

===

### Padding, Randomness, IV

- unpredictible, non-deterministic values
- CSPRNG functions ::rather than direct `/dev/urandom` access:: <!--{span:.font-xs}--> <!--{li:.fragment.fade-in}-->
- IV (Initialization Vector) ::bytes-blocks used to init a cipher function and ensure they are really unique:: <!--{.font-xs}--> <!--{li:.fragment.fade-in}-->

???

To keep our ciphers algorithm semantically secured, we need to introduce as much entropy as we can. It's done using CSPRNG functions (again), that produce a unique random number, that block ciphers use as first input. This _nonce_ serves as an _Initialization Vector_. The cipher is initialized with it, ensuring its state is unique, before starting to encrypt the data.

===

### Block modes of operation

- ~~ECB (Electronic Code Book)~~
- ~~CBC (Cipher Block Chaining)~~
- AEAD (Authenticated Encryption with Associated Data)

<!-- --- -->

- [Padding oracles and the decline of CBC-mode cipher suites][5.1]
<!--{ul:.linkrolls}-->


[5.1]: https://blog.cloudflare.com/padding-oracles-and-the-decline-of-cbc-mode-ciphersuites/

???

Ciphers can run in several block modes of operation. A block cipher algorithm only encode... a block! If your data is larger than a block, you need to repeat to cipher block and iterate. The _mode of operation_ defines how to apply this repetition (bad, bad thing, repetition), and keep them secure enough.

ECB and CBC are the most commonly known, but they are now easy to break. We now rely on double pass modes of operation that both encrypt and confirm data integrity. They are grouped under the AEAD name. Most common and secure is the EAX mode. Please use AEAD modes as often as you can.

===

A symmetric **key** must be shared, which mean she could **leak**

???

I spent some time to speak about symmetric algorithms and their modes, but they present a huge weakness. If the same key is used to both encrypt and decrypt content, it means you need to transfer it to your recipient in case of communication. A transfer means it can be intercepted.

So we need another way to deal with encryption.

===

### Bob & Alice

<!-- SVG Anim: RSA -->

???

The solution is named _Public-Key cryptography_, or _Asymmetric key cryptography_. Here, we use not one, but two keys. Those keys work in pairs. A pair combines a private key, which is private – it's in your pocket, you never show it to anyone – and public key, which is... public, indeed.

Here's how it works. I keep the private key (in my pocket), and distribute my public key freely. Then Bob wants to send me a message. To do it, he encrypts it using my public key (which is publicly available, on my website, my vcard, a registry...). I, Alice... Well, I receive the message. I can decrypt it using my _private_ key. That key is the only one that can decipher it because it's the one associated to the public key used by Bob. Because I'm its only owner, I'm the only one that can decipher the message.

===

![Gif: That's a bingo!]()

???

BOOM
