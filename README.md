# LIGHT zaddr Open Messaging App

This is an app I whipped up as a fun PoC. Enjoy. It's not guaranteed to be perfect.

I haven't tested this on Linux or Mac. Probably make a new light-wallet.dat for this, for a zillion reasons.

## Running/Building

- Clone Repo
- `cd path/to/repo`
- `yarn`

To run in development mode:
- `yarn run dev` 

To build standalone app:
- `yarn run package`

You'll find the built app in `/release`

TO RUN the built app, you will need to move/copy the appropriate zecwallet-cli for your system into the same directory as the built application. 
## TODOS
- [ ] Rescan button
- [ ] Add a way to label/name addresses
- [x] Render error message on failed send
