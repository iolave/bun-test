
# Proof of Concept: Bun libraries versioning
## Introduction

<p align="middle"><img src="https://bun.sh/logo-square.png" width="15%"/></>

I found myself trying Bun and i had a quick question on how are we supposed to manage a bun based library if bun's documentation states that the package manager is intended to be an standalone one.

I tried creating tags with git and releasing within github (theese can be automated for sure) and later installing my test library within this repo (`bun-lib`) as follows:

```shell
# Latest tag
bun install https://github.com/iolave/poc-bun-versioning#latest

# Beta tag
bun install https://github.com/iolave/poc-bun-versioning#beta

# An specific version
bun install https://github.com/iolave/poc-bun-versioning#v1.0.0-beta.1
```

And everything worked as intended... until i tried releasing a newer version of the library expecting that `bun update` or `bun install` will update `package.json` file with the newer version (using the `beta` tag) and it didn't... But in the end, it wasn't that terrible at all, a simple uninstall and install and it would work.

```shell
~ bun uninstall bun-lib
bun remove v1.0.17 (5e60861c)
 - bun-lib

 1 package removed [27.00ms]

~ bun install https://github.com/iolave/poc-bun-versioning#beta
bun add v1.0.17 (5e60861c)

 installed bun-lib@git+ssh://github.com/iolave/poc-bun-versioning.git#9826b49801476c34041feb7a6b397a3788956845

 1 package installed [839.00ms]
```

## Versioning with git repos

The key to have a clean versioning automated system we should really focus on having branches for each released version with it's tag and release. This will allow us to not necesarily focus on mantaining our latest release and it's bugs 🐛 but also bugs within older versions of our library (or why not... our app/software/api/etc).

## Versioning with npm

If we kinda follow the path of [Versioning with git repos](#versioning-with-git-repos) it will be really simple for us to publish a newer version of our package. 

Here's an example of a `npm publish` execution using a github released version of our `bun-lib`: 

```shell
$ npm publish https://github.com/iolave/poc-bun-versioning/archive/refs/tags/v1.0.0.tar.gz --tag latest

npm notice
npm notice 📦  bun-lib@1.0.0
npm notice === Tarball Contents ===
npm notice 0B    bun-test-1.0.0/
npm notice 2.2kB bun-test-1.0.0/.gitignore
npm notice 1.7kB bun-test-1.0.0/bun.lockb
npm notice 140B  bun-test-1.0.0/main.ts
npm notice 221B  bun-test-1.0.0/package.json
npm notice 221B  bun-test-1.0.0/README.md
npm notice 520B  bun-test-1.0.0/tsconfig.json
npm notice === Tarball Details ===
npm notice name:          bun-lib
npm notice version:       1.0.0
npm notice filename:      bun-lib-1.0.0.tgz
npm notice package size:  2.7 kB
npm notice unpacked size: 5.0 kB
npm notice shasum:        a54bdf9cb7d69b0f7abf17aa8cd1d8457cde28fe
npm notice integrity:     sha512-sdH+jiC2fCj8s[...]mqYBd5IHnPoOw==
npm notice total files:   7
npm notice
npm notice Publishing to https://registry.npmjs.org/ with tag latest and default access
+ bun-lib@1.0.0
```
