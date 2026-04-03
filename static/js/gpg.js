const GPG_EMAIL = 'hi@joshuaspiral.xyz';
let publicKey = null;

function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

async function performEncryption() {
    const input = document.getElementById('gpg-input');
    const output = document.getElementById('gpg-output');
    const btn = document.getElementById('gpg-btn');
    const status = document.getElementById('gpg-status');
    const text = input.value.trim();

    if (!text || !publicKey) {
        output.style.display = 'none';
        btn.textContent = 'encrypt';
        btn.disabled = !publicKey;
        return;
    }

    try {
        const encrypted = await openpgp.encrypt({
            message: await openpgp.createMessage({ text }),
            encryptionKeys: publicKey,
        });

        output.textContent = encrypted;
        output.style.display = 'block';
        btn.textContent = 'copy';
        btn.disabled = false;
    } catch (err) {
        status.textContent = `encryption failed: ${err.message}`;
    }
}

const liveEncrypt = debounce(performEncryption, 300);

async function initGPGWidget() {
  const btn    = document.getElementById('gpg-btn');
  const input  = document.getElementById('gpg-input');
  const output = document.getElementById('gpg-output');
  const status = document.getElementById('gpg-status');

  if (!btn || !input || !output) return;

  try {
    status.textContent = 'fetching key...';
    const res = await fetch(`https://keys.openpgp.org/vks/v1/by-email/${encodeURIComponent(GPG_EMAIL)}`);
    if (!res.ok) throw new Error(`keyserver returned ${res.status}`);
    const armored = await res.text();
    publicKey = await openpgp.readKey({ armoredKey: armored });
    status.textContent = `key loaded: ${publicKey.getFingerprint().toUpperCase().match(/.{4}/g).join(' ')}`;

    input.addEventListener('input', liveEncrypt);
  } catch (err) {
    status.textContent = `could not load key: ${err.message}`;
    btn.disabled = true;
    input.disabled = true;
    return;
  }

  btn.addEventListener('click', async () => {
    if (btn.textContent === 'copy' || btn.textContent === 'copied') {
      const encryptedText = output.textContent;
      if (encryptedText) {
          navigator.clipboard.writeText(encryptedText).then(() => {
              btn.textContent = 'copied';
              setTimeout(() => {
                  if (output.style.display === 'block') {
                      btn.textContent = 'copy';
                  }
              }, 2000);
          });
      }
    } else {
      btn.disabled = true;
      btn.textContent = 'encrypting...';
      await performEncryption();
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('gpg-input')) {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/openpgp@5/dist/openpgp.min.js';
    script.onload = initGPGWidget;
    script.onerror = () => {
      const s = document.getElementById('gpg-status');
      if (s) s.textContent = 'could not load openpgp.js';
    };
    document.head.appendChild(script);
  }
});
