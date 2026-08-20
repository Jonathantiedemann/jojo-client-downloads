const releaseUrl = "releases/latest.json";

function formatBytes(bytes) {
  if (!Number.isFinite(bytes) || bytes <= 0) return "Windows x64";
  const megabytes = bytes / (1024 * 1024);
  return `${megabytes.toFixed(megabytes >= 100 ? 0 : 1)} MB`;
}

async function loadRelease() {
  try {
    const response = await fetch(releaseUrl, { cache: "no-store" });
    if (!response.ok) throw new Error(`Release metadata returned ${response.status}`);
    const release = await response.json();

    document.querySelectorAll("[data-version]").forEach((element) => {
      element.textContent = release.version;
    });
    document.querySelectorAll("[data-size]").forEach((element) => {
      element.textContent = formatBytes(release.sizeBytes);
    });
    document.querySelectorAll("[data-download]").forEach((link) => {
      link.href = release.file;
    });

    const checksum = document.querySelector("[data-checksum]");
    if (checksum) checksum.textContent = release.sha256.toUpperCase();

    const copyStatus = document.querySelector("#copy-status");
    if (copyStatus) copyStatus.textContent = `Deaths Call ${release.version} / Windows x64`;
  } catch (error) {
    const checksum = document.querySelector("[data-checksum]");
    if (checksum && !/^[a-f0-9]{64}$/i.test(checksum.textContent.trim())) {
      checksum.textContent = "Checksum metadata unavailable. Use the included .sha256 file.";
    }
  }
}

function setupChecksumCopy() {
  const button = document.querySelector("#copy-checksum");
  const checksum = document.querySelector("[data-checksum]");
  const status = document.querySelector("#copy-status");
  if (!button || !checksum) return;

  button.addEventListener("click", async () => {
    const value = checksum.textContent.trim();
    if (!/^[a-f0-9]{64}$/i.test(value)) return;
    try {
      await navigator.clipboard.writeText(value);
      button.textContent = "Copied";
      if (status) status.textContent = "Checksum copied to clipboard.";
      window.setTimeout(() => {
        button.textContent = "Copy";
      }, 1800);
    } catch (error) {
      if (status) status.textContent = "Select the checksum and copy it manually.";
    }
  });
}

function setupReveals() {
  const elements = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    elements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: "0px 0px -8%", threshold: 0.08 });

  elements.forEach((element) => observer.observe(element));
}

document.querySelector("#year").textContent = new Date().getFullYear();
setupReveals();
setupChecksumCopy();
loadRelease();
