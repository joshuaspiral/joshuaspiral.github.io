+++
title = "About"
author = ["Joshua Yeung"]
date = 2026-04-03
tags = ["meta"]
draft = false
weight = 1001
+++

I'm **Joshua**, a first year CS student at the University of Toronto.

<a id="figure--fig:max-cat"></a>

{{< figure src="/ox-hugo/max_belly.jpg" caption="<span class=\"figure-number\">Figure 1: </span>my cat, max." width="400px" >}}


## Projects {#projects}

-   [Homelab](/posts/homelab/): My homelab configuration notes/log.
-   [dotfiles](https://github.com/joshuaspiral/dotfiles): My system configuration for Arch Linux.
-   Archived Projects: Older projects.


## Competencies {#competencies}

-   **Languages**: Python, C, C++, Java, Rust, JavaScript, Bash
-   **Systems &amp; Infrastructure**: Linux, Proxmox, Docker, WireGuard


## Contact {#contact}

-   **Email**: hi [at] joshuaspiral [dot] xyz
-   **Matrix**: [@joshuaspiral:matrix.org](https://matrix.to/#/@joshuaspiral:matrix.org)
-   **GitHub**: [joshuaspiral](https://github.com/joshuaspiral)
-   **PGP**: `44CB 980D F60F 1B8D A83B  CEE9 50C7 4ED9 F4D1 B458` · [keyoxide](https://keyoxide.org/44CB980DF60F1B8DA83BCEE950C74ED9F4D1B458)


## Encrypt a message! {#encrypt-a-message}

Want to send me something private? Encrypt it locally within your browser. Messages are encrypted against my public key and can only be decrypted by my offline private key.

<div class="gpg-widget">
  <div class="ls-header"><span class="prompt-char">$</span> gpg --encrypt --recipient hi@joshuaspiral.xyz</div>
  <p id="gpg-status" class="gpg-status">loading...</p>
  <textarea id="gpg-input" placeholder="your message..." rows="5"></textarea>
  <button id="gpg-btn" class="gpg-btn">encrypt</button>
  <pre id="gpg-output" style="display:none"></pre>
</div>

<script src="/js/gpg.js"></script>

<style>
.gpg-widget { margin-top: 1rem; }
.gpg-status {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  color: var(--muted);
  margin: 0.5rem 0 1rem;
  word-break: break-all;
}
#gpg-input {
  width: 100%;
  background: var(--surface);
  border: 1px solid var(--highlight-med);
  border-radius: 4px;
  color: var(--text);
  font-family: var(--font-mono);
  font-size: 0.85rem;
  padding: 0.75rem;
  resize: vertical;
  box-sizing: border-box;
  margin-bottom: 0.75rem;
}
#gpg-input:focus {
  outline: none;
  border-color: var(--pine);
}
.gpg-btn {
  background: none;
  border: 1px solid var(--highlight-med);
  border-radius: 4px;
  color: var(--pine);
  font-family: var(--font-mono);
  font-size: 0.85rem;
  padding: 0.4rem 1rem;
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s;
}
.gpg-btn:hover:not(:disabled) {
  border-color: var(--pine);
  color: var(--text);
}
.gpg-btn:disabled {
  color: var(--muted);
  cursor: default;
}
#gpg-output {
  margin-top: 1rem;
  font-size: 0.75rem;
  word-break: break-all;
  white-space: pre-wrap;
  color: var(--foam);
}
</style>
