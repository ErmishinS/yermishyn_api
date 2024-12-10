/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "f07cdff586a5a12eb29ffc2b463796fd"
  },
  {
    "url": "assets/css/0.styles.02c2e682.css",
    "revision": "a94ff689b5801d5b6aff2b1d9a514078"
  },
  {
    "url": "assets/img/content_create.1435c949.png",
    "revision": "1435c949a07f47e58b339dc65dc2d11e"
  },
  {
    "url": "assets/img/content_delete.c9db08e3.png",
    "revision": "c9db08e3bf742905dc0b328b3d4196af"
  },
  {
    "url": "assets/img/content_get.69b74979.png",
    "revision": "69b749798ded23370296d4e6990e5ade"
  },
  {
    "url": "assets/img/content_MediaContentNotFound.29447ce0.png",
    "revision": "29447ce0ceeade87968911916a46449d"
  },
  {
    "url": "assets/img/content_NotEnoughFields.cc9b9563.png",
    "revision": "cc9b956379da37ea9957882e636e8e1b"
  },
  {
    "url": "assets/img/content_update.78c2d584.png",
    "revision": "78c2d5847030e2883550ae3a66522a28"
  },
  {
    "url": "assets/img/contents_get.28dd49e0.png",
    "revision": "28dd49e038784527a6395f964133def3"
  },
  {
    "url": "assets/img/relational_schema.ce95178e.png",
    "revision": "ce95178e03036cd4d2d2ffe1a92aaba3"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/img/user_AlreadyRegistered.7cacd69d.png",
    "revision": "7cacd69da3018529d040e3bd9609b4f8"
  },
  {
    "url": "assets/img/user_create.23a98520.png",
    "revision": "23a98520dee3422c6e5315afde011255"
  },
  {
    "url": "assets/img/user_delete.a1456345.png",
    "revision": "a14563451a61787d104e7f01d44ac2df"
  },
  {
    "url": "assets/img/user_get.d4784228.png",
    "revision": "d4784228c3944c4dab39f9907f4de504"
  },
  {
    "url": "assets/img/user_NotEnoughFields.863fe132.png",
    "revision": "863fe132e3378728d691f2903936eea8"
  },
  {
    "url": "assets/img/user_update.ce3aca3b.png",
    "revision": "ce3aca3b04dc688469a19048c942ec95"
  },
  {
    "url": "assets/img/user_UserNotFound.1958d9cc.png",
    "revision": "1958d9cc741dfdaf662d5bf6ecc7b405"
  },
  {
    "url": "assets/img/users_get.fd57b117.png",
    "revision": "fd57b1174074ebab987e439f00409f06"
  },
  {
    "url": "assets/js/10.a04bc287.js",
    "revision": "b10a402ee1b7db8979f0efbecab952f3"
  },
  {
    "url": "assets/js/11.ea0c5234.js",
    "revision": "3c54361829ec3dff5645f6526db75a9a"
  },
  {
    "url": "assets/js/12.a4efb6a6.js",
    "revision": "2bba033998d56f36b39f8b22900430b8"
  },
  {
    "url": "assets/js/13.3a333aac.js",
    "revision": "b9dc2dee0c25330c8e0ae00f44282ebf"
  },
  {
    "url": "assets/js/14.383b6c3a.js",
    "revision": "60e0e194a71d61c3a2e99cbb4165f6df"
  },
  {
    "url": "assets/js/15.1ecf0ba9.js",
    "revision": "41349aaded87daccbbab986f37d01acb"
  },
  {
    "url": "assets/js/16.46f53c74.js",
    "revision": "ce50138e095d344054cd7f1493b91c0c"
  },
  {
    "url": "assets/js/17.38c1e649.js",
    "revision": "1905ac5b27b4394a0edb13b3101c949f"
  },
  {
    "url": "assets/js/18.93a8da1d.js",
    "revision": "2c1ab4b322a2dfc138dc4eb24645bafb"
  },
  {
    "url": "assets/js/19.523e1b93.js",
    "revision": "09835a18a2b054d32ed0c2db0a0211eb"
  },
  {
    "url": "assets/js/2.81d0e929.js",
    "revision": "f068e624d20deaecce8b57b864613349"
  },
  {
    "url": "assets/js/20.a7dc29c3.js",
    "revision": "a2322d8795ab7d4d56104295fef01032"
  },
  {
    "url": "assets/js/21.f91a184d.js",
    "revision": "5db218239802c6e5851cba182f6ffdf0"
  },
  {
    "url": "assets/js/22.2843d29a.js",
    "revision": "9278c0a073d2610cdfa89bae989f07d5"
  },
  {
    "url": "assets/js/23.fa6d1c17.js",
    "revision": "d99d16d7fa58d6855a168bd8d104cb14"
  },
  {
    "url": "assets/js/24.7f867db8.js",
    "revision": "cfe8caece418be0d262974890f6dd6b9"
  },
  {
    "url": "assets/js/26.a5d72282.js",
    "revision": "1f699572d420f274ae9ce6327b2f7ecd"
  },
  {
    "url": "assets/js/3.ca798de1.js",
    "revision": "075d8cac908ad792afd49c831b3f64eb"
  },
  {
    "url": "assets/js/4.e382508f.js",
    "revision": "0c69e1edab0610967cbdf593fa6b7959"
  },
  {
    "url": "assets/js/5.5db0cb7d.js",
    "revision": "c8da9fe745dc353003e72e046e2a3df4"
  },
  {
    "url": "assets/js/6.ee876ea4.js",
    "revision": "08733714edb3e594ede51a15bc578f0d"
  },
  {
    "url": "assets/js/7.6c27bc7a.js",
    "revision": "fe01d4692760048d55cae5fe39e79090"
  },
  {
    "url": "assets/js/8.ffc75126.js",
    "revision": "bfaac57b78d6b3a8d8bfabce5b7897be"
  },
  {
    "url": "assets/js/9.5dcec5e1.js",
    "revision": "7e04b157d111da63225ad691183834df"
  },
  {
    "url": "assets/js/app.9df8e8a6.js",
    "revision": "f281fff0949e431c7dcde79806271a9f"
  },
  {
    "url": "conclusion/index.html",
    "revision": "ebf6769c18dd415695ba9811fdfb56e8"
  },
  {
    "url": "design/index.html",
    "revision": "97fd2b38f31979abfbbfed11654550ec"
  },
  {
    "url": "index.html",
    "revision": "98deca24fe1b85f500676d5a19f5d3dd"
  },
  {
    "url": "intro/index.html",
    "revision": "0e261e5caac8dd329411e455e5ecfa75"
  },
  {
    "url": "license.html",
    "revision": "c6ae94487788630ac26fdec72cecb7f2"
  },
  {
    "url": "myAvatar.png",
    "revision": "b76db1e62eb8e7fca02a487eb3eac10c"
  },
  {
    "url": "requirements/index.html",
    "revision": "970ee803f9da4c753949afa2c5ee1530"
  },
  {
    "url": "requirements/stakeholders-needs.html",
    "revision": "bbe92eb88e3c83404fc1b34d6975d73f"
  },
  {
    "url": "requirements/state-of-the-art.html",
    "revision": "e403408b5ce7292c0d7dc367773851a6"
  },
  {
    "url": "software/index.html",
    "revision": "abc048cb74f766450b294ef1030c202a"
  },
  {
    "url": "test/index.html",
    "revision": "2f30b154f97849291daeae9cb48e0133"
  },
  {
    "url": "use cases/index.html",
    "revision": "b7e94c665de7c7e7e0eb57bb27f6f580"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
