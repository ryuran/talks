<!--{section^1: data-breadcrumb="Hashing, Salting, Cooking"}-->

<!--{.interleaf}-->
## Hashing, Salting, Cooking

???

So, back in 2018. I said that cryptography is about encryption, and potentially decryption. Let's start with the _basics_: hashing.

===

Hashing is Data Obfuscation

???

Hashing is _data obfuscation_. It's a one-way trip that encrypts your data without any way to get your plain data back. Because of its inability to decrypt a ciphertext, we often use the term of _checksum control_. A plain text, passing through a given hashing function, always returns the same result. It's a pretty good way to ensure your data wasn't corrupted because a single bit modified in the plain text will output an entirely different result.

You already saw some hashing function, like `md5` or `sha1`.

===

### Fail

- Rainbow Tables
- Lookup Tables
- Reverse-lookup Tables

???

It seems to be a best practice to protect the password. You never store your users' passwords in a plain format (pleaaaaase), but you must encrypt them in your database. You never need to decrypt them. When your user wants to authenticate, you use the same hashing function you used when he or she signs up and only compare the result to the one stored in the database.

Problem is: the hashing functions are impossible to revert, but can make matches between a plaintext version and its checksum for a given algorithm. That's what we call rainbow, lookup, reverse-lookup, etc. tables. They are big tables, available on many websites, that allow you to check for a checksum and get its plaintext version. For instance, rainbow tables are for the `md5` function. So it's not secured just to store the checksum. We must make the game more complicated to defeat.

===

### Salting

- Entropy
- Avoid repetitions
- Must be **unique** and **random**

???

We need what we call _salting_. We add to the hashing function a _salt_, a little element, unique and randomly generated. It brings noise to the hashing result. It's an entropic factor that ensures your result, for a given password, never be the same. If the same password used by may users never gives the same result, then you avoid the common factor, which deprecates analysis. It also deprecated rainbow tables, because the checksum won't match any plain password.

===

The Bad, and the Ugly

```
md5(sha1(password))
md5(md5(salt) + md5(password))
sha1(sha1(password))
sha1(str_rot13(password + salt))
md5(sha1(md5(md5(password) + sha1(password)) + md5(password)))
```

???

When I look up for salting technics, I often find things like this. Those lines come from developers' social networks like Stack Overflow. So please, never, ever do that. It's pretty easy to break chaining methods like this, especially when your codebase is open source.

===

The Good!

1. Generate a **long salt** w/ CSPRNG
   - min 16 chars
   - `mcrypt_create_iv` (PHP), `os.urandom` (Python), SecureRandom (Ruby), `crypto.randomBytes` (Node.js)
   - `/dev/urandom`
   <!--{ul:.fragment.fade-out data-fragment-index="1"}-->
2. Apply a **secured derivation** on `[password][salt]`
   - CPU intensive algorithm
   - Argon2, bcrypt, scrypt, PBKDF2
   <!--{ul:.fragment.fade-out data-fragment-index="2"}-->
   <!--{li^2:.fragment.fade-in data-fragment-index="1"}-->
3. Store **all** elements in database
   - ensure compatibility in case of changes
   - use a format like `$[hashfunc]$[rounds]$[salt][hash]`
   <!--{ul:.fragment.fade-out data-fragment-index="3"}-->
   <!--{li^2:.fragment.fade-in data-fragment-index="2"}-->
4. Store along a **HMAC** digest of the payload
   - prevent SQL Injections
   - keep the key safe
   <!--{li^2:.fragment.fade-in data-fragment-index="3"}-->

- [Salted Password Hashing - Doing it Right][4.1]
<!--{ul:.linkrolls}-->


*[CSPRNG]: Cryptographically Secure PseudoRandom Number Generator

[4.1]: https://crackstation.net/hashing-security.htm

???

The only right way to deal with password hashing is this one.

First, you create a long random number using a CSPRNG. Please do not rely on _urandom_ directly, except if your language doesn't offer a proper crypto layer. There are cryptographic libraries available in pretty much all modern languages, conceived by security experts. Use them.

Next, you apply a secured derivation on a concatenated string of the password and the salt. There is no rule for the order, but it is admitted that the salt commonly follows the password. Anyway, what's important here is to use a robust, CPU intensive algorithm. CPU intensive means it takes a long time to compute the hash; Which is good here, because even if it adds 350ms extra time, this is nothing for your user, but it increases _a lot_ the time for a brute-force attack. It's like fire-proof doors. They're not here to stop the fire, but to slow its progression. The most secured yet is Argon2.

Then you store all elements as a record in your database: your hashing function, the round number used in it, then the string of the hash and the salt. When you want to check a password validity, you reuse the same hash func with its round param, and the salt, which is easy to retrieve because the hash has a fixed length. It ensures compatibility for your users if you need to upgrade your hash func later.

Finally, to prevent SQL injection that may try to replace a hash record in your database, sign the payload with an HMAC function using a key that you keep securely in your filesystem. Or use an HSM to do that. This way, nobody without the key can inject a signed hash record in your database. It keeps your password auth safe.

If you need more details about this process, read the Crackstation's blog post here.

===

A properly hashed password, with **no repetition** and a **time-controlled execution** decrease the risk of brute-force hacking.

???

If you do that, the risks are low, both in case of brute force hacking and in case of database leak. Which doesn't excuse you to alert your users in case of a breach anyway.
