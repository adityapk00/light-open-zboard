# LIGHT zaddr Open Messaging App

This is an app I whipped up as a fun PoC and to get some Electron chops going. Enjoy.

I haven't tested this on Mac. It's pretty simple, it uses [Adityapk's zecwallet-cli](https://github.com/adityapk00/zecwallet-light-cli) via child processes. This isn't a wallet, it's p much just a UI for the CLI. The plus side of that is that it's hella easy for you to audit. swap in your own builds of zecwallet-cli 4 safety and it won't be too hard to tell what the app is up to.

So far it's the product of one night of work, maybe I'll do something else. Def needs a face lift. Legalize it and google "Uyghurs" and get off carbs

## Running/Building

- Clone Repo
- `cd path/to/repo`
- `yarn`

To run in development mode:
- `yarn run dev` 

To build standalone app:
- `yarn run package`

You'll find the built app in `/release/`

## TODOS
- [x] Rescan button
- [x] Render error message on failed send
- [x] Filter posts by amount (slider)
- [x] Pinned Post (highest value in last 14 days)
- [ ] address label/names
- [ ] refresh button
- [ ] sync/resync progress indicator (logfile in root can prolly be used for this?)
- [ ] Indicate progress specific to a view key import? (get versed in logs Mikey)
- [ ] Detect and render chunked html in memos
- [ ] Detect and render chunked markdown in memos
- [ ] Detect binary files and allow their download

## Acknowledgements

Shouts to the haters.
