# Deaths Call website

This folder is a deploy-ready static download site. Client binaries are published separately through GitHub Releases; the Deaths Call source tree is not included.

## Preview locally

From this directory, run:

```powershell
python -m http.server 8080
```

Then open `http://localhost:8080`.

## Publish

Upload the contents of this directory to any static web host. Keep the `releases` and `assets` directories beside `index.html`.

When publishing a new version:

1. Upload the compiled ZIP and its `.sha256` file to a new GitHub Release.
2. Update `releases/latest.json` with the new version, size, checksum, and release-asset URL.
3. Keep the fallback release-asset URLs and metadata in `index.html` current for visitors with JavaScript disabled.

Deaths Call 1.2.0 and newer also check the repository's latest GitHub Release at startup. The release tag must be a version such as `v1.5.0`, and the checksum asset must use the exact ZIP filename followed by `.sha256`. Upload both assets before marking the release as latest; otherwise the launcher safely skips that update and continues normally.

Users on versions older than 1.2.0 need to download 1.2.0 manually once. Later releases can be downloaded, verified, installed, and restarted from inside the launcher.

The downloadable ZIP must contain only the published executable and its `bundled-mods` directory.
