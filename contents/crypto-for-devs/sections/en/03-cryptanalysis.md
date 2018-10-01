<!-- { section^1: data-breadcrumb="Cryptanalysis" } -->

<!-- { .interleaf } -->
## Cryptography & Cryptanalysis

???

Let's start from the very beginning. Cryptography domain is a war, between cryptographers and cryptanalysts. The former try to make data unreadable; the latter do their best to break the code and get the plain version without knowing the key. When the code is broken, cryptographers enforce their algorithms, that cryptanalysts will try to broke it again, in an endless run.

===

### Once upon a time

[Gif: Alice in Wonderland]()

???

So, here's a story for you

===

Caesar Cipher

<!-- SVG ANIM: Shift Cipher Wheel -->

???

The first know cipher is named _Caesar Cipher_, or _Shift Cipher_. You must know it because you probably played with it when you were kids (approximately at the same time you started to play with lemon juice for invisible telegrams sent to your friends).

It takes 2 alphabets. You rotate the cipher alphabet of shift parameters (let's say 3 here). The shift param is the _key_. Then you substitute characters from the plain alphabet with the corresponding character in the cipher alphabet.

Julius Caesar, the Roman Emperor, was the first known to use it in his private correspondence. It is still in use in digital ciphers like ROT13.

The problem with it is its limit: you have only 25 substitutions available (in the 26th one, _A_ stays _A_, so we can't consider it as _strong_). It doesn't take a long time to found the right key and decipher the text.

===

Vigenère Cipher

<!-- SVG ANIM: Vigenère Cipher Square -->

???

Later, in the mid-16th century, a stronger cipher was created still based on the _Shift Cipher_, but using a polyalphabetic substitution. This one is named "The Vigenère Cipher." It uses not only one shift substitution, but 26.

Here's how it works: we've got a matrix that contains all shift substitution available. We pick up a key. Here, we choose the **LEMON** keyword. Then, we have the plain text we want to encrypt with this key. Here, it's the **ATTACK AT DAWN** string. We pad the key to get the same number of characters as the string we need to encrypt. It gives **LEMON LEMON LE**. Then, we apply the substitution to each character. We start by encrypting the first **A** with the **L** key. Based on the matrix, we obtain a **L**. The next **T**, encrypted with a **E** gives a **X**. The third character, another **T**, encrypted by **M**, gives a **F**. And so on.

Here's the whole power of the Vigenère algorithm. The same character can be substituted by any of the 26 chars in the alphabet, depending on its encrypting key. Also, a text gives a different encrypted result with a different key.

Here's, I need to introduce you the concept of _Frequency Analaysis_. It's a strong cryptanalysis technic, first explained by Al-Kindi, an Arab polymath, in the 9th century. It considers that all languages have common and rare letters or groups of letters. For instance, in English, _E_, _T_, _A_, and _O_ are the common, _Z_, _Q_, and _X_ are the rare. Most substitution ciphers used before the 16th century preserve that pattern in the ciphertext. With an appropriate amount of encrypted content, you can count the number of each occurrence of a letter, and deduce the original letter, based on its distribution across the text.

The Vigenère Cipher broke this pattern because the same letter will have plenty of substitutes. It makes the _Frequency Analysis_ unavailable. I mean, in its primary form. It took 3 centuries to cryptanalysts to break the polyalphabetic substitution. However, it's still the frequency analysis, coupled with other technics, that finally broke it.

===

The 1^st^ Breach: Repetitions

_Frequency Analaysis_ uses _Common Denominator_ to defeat any cipher that introduces repetitions in its intrinsic patterns

???

So that our first breach: [...]

===

Enigma

![Enigma]()

???

Then, back to the last century. Do you know this machine? Yeah, it's _Enigma_. It's the cipher machine invented between the two World Wars. Thanks to its inventor, an Austrian engineer, Germans used it during the World War II to secure radio transmissions of military orders. It uses a robust, complex, and unpredictable substitution algorithm to encrypt the text. It's known to be virtually impossible to break. Spoiler: I'm French, and it was finally broken; otherwise I probably gave this talk in German.

It was broken thanks to two events. The first one is that spies accessed to the plan of the machine, allowing UK engineers to understand how it works, and try to find a way to decipher its contents. The second one is Alan Turing. Enrolled by its Majesty Secret Service during the War for it's mathematical and logistical skills, it imagined the first electromechanical computer, named "The Bombe," to automate and decipher intercepted transmissions. Also, it used... _frequency analysis_!

Here's what happened. Engima Operators must choose a different key for each transmission to protect the settings of the machine to keep the system secured. When you're under bombs, in front of operations, stressed, you can't find each time a new passphrase. So Germans are. They tended to use the same passphrase; Which introduce repetitions. With a sufficient amount of ciphertext, Turing's Bombe was allowed to apply statistic principles to finally broke the codes. Another fail for the CKI.

===

**Key* protection is essential

![XKCD Crypto]()

???

The only version of Enigma we couldn't break even using the _Bombe_ was the Navy one. They used an advanced version of their military communication protocol, using codebooks. Each codebook contains a key for a day only, and a codebook expires in a month. It means the amount of encrypted messages intercepted was too low to apply analysis on them; the keys changed too fast.

We broke them once. UK navy chooses to sink an SS submarine, enter in it during its sinking, and save a codebook. It allowed Secret Services to decipher transmissions in real time for several days using their own copy of Enigma.

I call this a **Brute Force Attack**. Period.

===

The 2^nd^ Breach: Spying and Brute Force Attack

There is no pattern strong enough to resist to an attack endlessly

???

It brings us to the second breach: [...]

===

### Digital Encryption

**Single Token**, the Cipher Graal

???

During the last century, many researchers and military experts found that a strong enough protection against cryptanalysis is to use a single token for each encryption. It avoids both repetitions and brute force risks.

Unfortunately, this principle is impossible to apply in everyday use, because it implies to transmit this single token for each encrypted message, which is a significant risk due to interception.

So it remains an ideal approach impossible to adopt; Until the digital age...
