#!/bin/bash

yarn run package
mv release/linux-unpacked/light-open-zboard release/linux-unpacked/light-open-zboard.AppImage
zip -r light-open-wallet-vx.x.x-bin-64bit-linux.zip release/linux-unpacked
