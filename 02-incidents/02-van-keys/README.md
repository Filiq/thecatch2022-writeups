# Van keys (2)

Hi, packet inspector,

all our delivery vans use password instead of standard car keys. Today, we have found out that the AI has implemented a new security measure – the vans are now referred as "AES Vans" and the password has been changed and encrypted. The decryption part is not yet finished, so we can't start any delivery van since morning!

Good news is that we managed to get the latest version of the decryption script from git repository. Bad news is that the script is not finished yet! Your task is to the finalize the script and decrypt the password as soon as possible.

Download [the script and encrypted password](https://owncloud.cesnet.cz/index.php/s/J6oePmHEplrCXii) (MD5 checksum e67c86a277b0d8001ea5b3e8f6eb6868).

## Hints

- Correct error(s) and add missing part(s).

## Solution

The hint speak for itself, we have to correct and add missing part of [code.py](code.py) file we got, and then decrypt ciphertext we got from [van_keys_enc.aes](van_keys_enc.aes) file.

After fixing the indentation, importing some libraries, adding a txt file that contains the number pi with 1 million digits, we can create a decode function, decrypt the ciphertext and get the flag.

**[code_completed.py](code_completed.py)**

```py
#!/usr/bin/env python
# -*- coding:utf-8 -*-
"""
The Mysterious Delivery, Ltd.
"""

__author__ = "Mysterious AI"
__version__ = "3.14"

from Crypto import Random
from Crypto.Cipher import AES
import base64
import random
import hashlib

class AESCipher():
    """
    AES
    """

    def __init__(self, key):
        """
        constructor
        """
        self.bs = AES.block_size
        self.key = hashlib.sha256(key.encode()).digest()

    def encrypt(self, raw):
        """
        Decrypt function
        """
        raw = self._pad(raw)
        iv = Random.new().read(AES.block_size)
        cipher = AES.new(self.key, AES.MODE_CBC, iv)
        return base64.b64encode(iv + cipher.encrypt(raw.encode()))

    def decrypt(self, enc):
        """
        Decrypt function
        """
        enc = base64.b64decode(enc)
        iv = enc[:AES.block_size]
        cipher = AES.new(self.key, AES.MODE_CBC, iv)
        return self._unpad(cipher.decrypt(enc[AES.block_size:])).decode('utf-8')

    def _pad(self, s):
        return s + (self.bs - len(s) % self.bs) * chr(self.bs - len(s) % self.bs)

    @staticmethod
    def _unpad(s):
        return s[:-ord(s[len(s)-1:])]


def generate_van_key(keylen):
  """
  Generate super-secure key for AES Vans
  """
  data = ''
  with open('pi_dec_1m.txt', 'r') as fhnd:
    data = fhnd.read()
    random.seed(314)
    key = '3.14'
    for i in range(0, keylen-len(key)):
            key += data[random.randint(0, 999999)]
    return key



def main():
    """
    main
    """
    print("Mysterious Delivery, Ltd. - ultimate van engine secure start")

    # generate key
    key = generate_van_key(128)

    # decryption
    obj = AESCipher(key)

    #TODO - read file
    data = ''
    with open('van_keys_enc.aes', 'r') as f:
        data = f.read()

    print(obj.decrypt(data)) # flag
main()

# EOF
```

Output as we expect: `FLAG{ITRD-Pyuv-JuLt-9zpM}`
