# Zevrion Client website

This is the public Zevrion information site. Downloads are provided by the private one-time-code gateway; client packages are not stored in this public repository.

## Preview locally

From this directory, run:

```powershell
python -m http.server 8080
```

Then open `http://localhost:8080`.

## Download flow

1. The owner generates a random invitation with `tools/new-zevrion-download-code.ps1`.
2. The recipient enters it on the protected download page.
3. The invitation and generated download link each work once.
4. Installed launchers use the authenticated update endpoint automatically and do not ask the recipient for another code.

Only compiled releases are served. Microsoft/Minecraft account data, logs, and local configuration files are never included in the package.
