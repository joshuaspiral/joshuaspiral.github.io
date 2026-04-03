+++
author = ["Joshua Yeung"]
draft = false
+++

## About {#about}

I'm **Joshua**, a first year CS student at the University of Toronto.

This is my [site](/posts/slug-rust-ssg/): public notes, writeups, and projects, built from my Obsidian vault.

Interested in cryptography, zero-knowledge proofs, privacy tech, and homelabbing.


### Projects {#projects}

-   [Homelab](/posts/homelab/): My homelab configuration notes/log.
-   [dotfiles](https://github.com/joshuaspiral/dotfiles): My system configuration for Arch Linux.
-   Archived Projects: Older projects.


### Competencies {#competencies}

-   **Languages**: Python, C, C++, Java, Rust, JavaScript, Bash
-   **Systems &amp; Infrastructure**: Linux, Proxmox, Docker, WireGuard


### Contact {#contact}

-   **Email**: hi [at] joshuaspiral [dot] xyz
-   **Matrix**: [@joshuaspiral:matrix.org](https://matrix.to/#/@joshuaspiral:matrix.org)
-   **GitHub**: [joshuaspiral](https://github.com/joshuaspiral)
-   **PGP**: `44CB 980D F60F 1B8D A83B  CEE9 50C7 4ED9 F4D1 B458` · [keyoxide](https://keyoxide.org/44CB980DF60F1B8DA83BCEE950C74ED9F4D1B458) · [keys.openpgp.org](https://keys.openpgp.org/search?q=hi%40joshuaspiral.xyz)


### Encrypt a message! {#encrypt-a-message}

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


## Projects {#projects}


### <span class="org-todo todo TODO">TODO</span> Configuring Hugo {#slug-rust-ssg}

Here is my writeup on building a static site generator in Rust...


### <span class="org-todo done DONE">DONE</span> Connect Four AI in C {#connect-four-ai}

I started off with the simple Tic Tac Toe game in Python, and learned
about the recursive [Minimax](https://en.wikipedia.org/wiki/Minimax)
algorithm. I immediately
[implemented it with little
difficulty](https://github.com/joshuaspiral/tictacpy). The next game I decided to implement this for was Connect
Four.

[I implemented the game
in Python](https://github.com/joshuaspiral/connectfourpy) with the minimax algorithm. This, however, had a much larger
game tree - Connect Four has a branching factor of 7 and games last up
to 42 moves, so at depth 5 alone you're already evaluating up to
\\(7^5 = 16,807\\) nodes per move with no pruning. The minimax algorithm
was just SO SLOW at depths 8-9 (though I still couldn't win against the
algorithm with depth 4). I tried rewriting it in C, to see if the
language was the problem.

The C program did run a lot quicker on my
Ryzen 5 3600 PC, and I added
[alpha-beta
pruning](https://en.wikipedia.org/wiki/Alpha%E2%80%93beta_pruning) which cuts off branches that can't possibly affect the result.
however, I wanted **more**.

I did a quick Google search and found that there was something called a
**bitboard** - a representation of a game state using binary. For example,
the game state for `X` in Tic Tac Toe could be represented as follows:

```text
 X | O |
 O     gameStateX = 0b100_010_000
   | X |   ->  gameStateO = 0b011_000_100
 O |
 | X
```

To determine if someone won, you just shift and AND. For Connect Four,
each player's board fits in a single `unsigned long long`[^fn:1]:

```C
struct boards {
    unsigned long long yellow;
    unsigned long long red;
};
```

Checking for a vertical four-in-a-row:

```C
bitboard & (bitboard >> 8) & (bitboard >> 16) & (bitboard >> 24)
```

Nonzero means four in a column. Same idea for horizontal (shift 1) and
both diagonals (shifts 7 and 9). The old array version had to scan 69
windows every time; this is four expressions.


#### Results {#results}

Benchmarked at depth 9: (more benchmarking available on the README)

| Implementation           | Time   |
|--------------------------|--------|
| C, 2D array + alpha-beta | 32.52s |
| C, bitboard + alpha-beta | 2.37s  |

13x speedup from just changing the representation! Awesome sauce.

I also made a GUI version with SDL so I could actually play against it,
which was fun. [GitHub](https://github.com/joshuaspiral/c4c)


### <span class="org-todo done DONE">DONE</span> Homelab Setup {#homelab}

_This page reflects the active state of my local infrastructure,
virtualization, and reverse-proxy routing. See the archives for
deployment history._


#### Changelog {#changelog}

-   **2026-02-24:** Migrated primary node to Lenovo M720q running Proxmox
    VE. Added desktop node for local LLM inference. Transitioned
    ingress to Cloudflare Tunnels.

-   **2026-02-10:** Added Matrix Synapse and Element.
-   **2025-09-15:** Added Vaultwarden for secrets management.

-   **2025-07-04:** Migrated to NixOS on HP EliteBook. Added Navidrome,
    slskd, and Actual Budget.

-   **2024-12-12:** Initial deployment on Debian Minimal. Setup Jellyfin,
    Immich, Filebrowser, and Obsidian LiveSync.


#### <span class="org-todo todo TODO">TODO</span> Deploy SSO portal (Authentik?) to secure public-facing services. {#deploy-sso-portal-authentik-to-secure-public-facing-services.}


#### Current Architecture (Active) {#current-architecture-active}

-   **Hypervisor:** Proxmox VE
-   **Orchestration:** LXC Containers &amp; Docker Compose
-   **Ingress:** Cloudflare Tunnels (External) / Tailscale (Internal)

<!--list-separator-->

-  Hardware

    -   **Node 1 (Compute):** Lenovo ThinkCentre M720q
        -   **Specs:** 16GB DDR4, 512GB NVMe.
        -   **Acceleration:** Intel QuickSync (iGPU passthrough for media
            transcoding and machine learning).
    -   **Node 2 (LLM/AI Host):**
        -   **Specs:** Ryzen 5 3600, 16GB DDR4, 1TB NVMe, RTX 2060 Super (8GB
            VRAM).

<!--list-separator-->

-  Active Services

    -   **Media &amp; Streaming:** Jellyfin, Navidrome.
    -   **Data &amp; Storage:** Immich (Photo backup), Filebrowser.
    -   **Security &amp; Management:** Vaultwarden (Secrets), Uptime Kuma
        (Monitoring).
    -   **Productivity:** Baikal (CalDAV/CardDAV), Actual Budget (Finance).

<!--list-separator-->

-  External Access

    More details on implementation, threat modelling, and defense on
    this blog post.

    ---


#### Architecture Archives {#architecture-archives}

<!--list-separator-->

-  <span class="timestamp-wrapper"><span class="timestamp">[2025-07-04 Fri]</span></span> Bare-Metal NixOS Era

    _Prior infrastructure relying on a repurposed laptop and declarative OS
    configuration._

    **Hardware** - **Node:** Repurposed HP EliteBook 840 G5 (Battery removed for
    continuous AC power safety). - **Specs:** Intel Core i5-8350U 1.7GHz, 8GB
    DDR4, 1TB Samsung NVMe SSD.

    {{< figure src="/attachments/Pasted image 20260210200343.png" >}}

    **Infrastructure** My homelab infrastructure relied on **NixOS** for the
    base operating system configuration and **Docker Compose** for service
    orchestration.

    **Why NixOS?** I chose NixOS over traditional distros like **Debian** or
    hypervisors like **Proxmox** for several reasons: - **Declarative
    vs. Imperative:** Unlike Debian, where the system state is a result of a
    sequential list of commands, NixOS is defined by a single file.
    Migrating to a new machine required only copying `configuration.nix` and
    running `nixos-install`. - **Resource Efficiency:** On an 8GB RAM laptop,
    running a full hypervisor adds unnecessary overhead. Running NixOS on
    bare metal ensured maximum compute allocation for heavier services such
    as Jellyfin. - **Rollbacks:** Booting into previous generations from the
    GRUB menu made it safe to instantly undo breaking system updates.

    **Service Orchestration** All applications ran as containers defined in a
    single `docker-compose.yml` file. External access was managed via
    Cloudflare Tunnel to avoid exposing the local residential IP.


## Computer Science {#computer-science}


### <span class="org-todo todo TODO">TODO</span> Zero Knowledge Proofs Explained {#zero-knowledge-proofs}

Prover and Verifier mechanics...


### <span class="org-todo todo TODO">TODO</span> Lambda Calculus Basics {#lambda-calculus-basics}


### <span class="org-todo todo TODO">TODO</span>  {#d41d8c}


## Physics {#physics}


### <span class="org-todo done DONE">DONE</span> Overengineering an HKPhO problem - A Brief Introduction to Lagrangian Mechanics {#lagrangian-mechanics}


#### Problem Statement {#problem-statement}

![](/attachments/hkpho_question.jpg)
[source](https://hkpho.phys.ust.hk/archive_2016/HKPhO/2016_Paper.pdf)

Let's write a generalised solution for any \\(\theta\\) instead of 45°.

Try solving the problem with Newtonian mechanics before reading the rest
of the article to better understand why this is a preferred method! The
answer will be revealed at the end.


#### Introduction to Lagrangian Mechanics {#introduction-to-lagrangian-mechanics}

[Lagrangian
mechanics](https://en.wikipedia.org/wiki/Lagrangian_mechanics) is a formulation of classsical mechanics, developed by
Joseph-Louis Lagrange in 1788. Lagrangian mechanics is based on a
fundamental principle of nature called the principle of stationary
action.

The Lagrangian formalism far outperforms the Newtonian approach
to mechanics for certain systems due to its concise and unifying theory.
By the end of this article, you will have learnt about the theory behind
this powerful method of solving systems and how to apply it to problems.

<!--list-separator-->

-  The Lagrangian

    The Lagrangian, typically denoted by \\(\mathcal{L}\\), is the positive
    difference between the kinetic energy \\(T\\) and the potential energy
    \\(U\\).

    \\[\mathcal{L} = T - U\\]

    > Note that this is the Lagrangian for classical systems, and it can vary
    > in general relativity and quantum mechanics.

    The Lagrangian is an important quantity, and is used to define the
    action of a trajectory.

<!--list-separator-->

-  Principle of Least Action

    The principle of least action, also known as the stationary-action
    principle, is a fundamental concept in physics. It states that the
    actual path taken by a physical system between two points in time is the
    one that minimises the action integral.

    The action, denoted by \\(S\\), is
    a scalar quantity that describes the energy of the system over a certain
    period of time. The action of a trajectory is given by the integral of the Lagrangian
    along the trajectory.

    \\[S = \int\_{t\_1}^{t\_2} \mathcal{L} \ \mathrm{d}t\\]

    To find the trajectory with stationary action, we use the
    [Euler-Lagrange
    equation](https://en.wikipedia.org/wiki/Euler%E2%80%93Lagrange_equation). The Euler-Lagrange equation is useful for solving
    optimisation problems in which we find the function that minimises a
    functional (\\(S\\) in this case). The full derivation of the
    Euler-Lagrange can be found
    [here](https://eng.libretexts.org/Bookshelves/Electrical_Engineering/Electro-Optics/Direct_Energy_(Mitofsky)/11%3A_Calculus_of_Variations/11.03%3A_Derivation_of_the_Euler-Lagrange_Equation)

    > A functional is a certain type of function that maps a function to a
    > real number.

    \\[\frac{\partial \mathcal{L}}{\partial q} - \frac{d}{dt} \frac{\partial \mathcal{L}}{\partial \dot{q}} = 0\\]

    Here, \\(\frac{\partial \mathcal{L}}{\partial q}\\) represents the partial
    derivative of the Lagrangian with respect to the generalised coordinate
    \\(q\\).

    > \\(q\\) is a generalised coordinate, meaning it can represent any quantity
    > that changes over time in a system. \\(\dot{q}\\) denotes the first
    > derivative of \\(q\\) with respect to time (velocity), and \\(\ddot{q}\\)
    > would denote \\(\frac{d^2q}{dt^2}\\) (acceleration).

<!--list-separator-->

-  Basic Example of Lagrangian Mechanics

    In order to grasp a rudimentary understanding of Lagrange's approach, we
    will take a simple example of a ball of mass \\(m\\) dropped down from a
    height \\(h\\) on Earth.

    **1. First, we select a coordinate system that is convenient for our
    problem: \\(x\\), \\(y\\)**

    {{< figure src="/attachments/ball_drop.png" >}}

    **2. Then, we define the Lagrangian:**

    The total kinetic energy of the ball would be the kinetic energy of both
    the \\(x\\) and \\(y\\) directions:
    \\[T = \frac{1}{2}m\dot{x}^2 + \frac{1}{2}m\dot{y}^2\\]
    \\[    = \frac{1}{2}m(\dot{x}^2 + \dot{y}^2)\\]

    The potential energy of the ball is just \\(mgh\\): \\[U = mgy\\]

    So \\[\mathcal{L} = \frac{1}{2}m(\dot{x}^2 + \dot{y}^2) - mgy\\]

    **3. Apply the Euler-Lagrange equations:**

    For the partial derivative of \\(\mathcal{L}\\) with respect to \\(x\\), as
    there are no \\(x\\) in \\(\mathcal{L}\\):
    \\[\frac{\partial \mathcal{L}}{\partial x} = 0\\]

    \\[\frac{d}{dt}\frac{\partial \mathcal{L}}{\partial \dot{x}} = m\ddot{x}\\]

    \\[0 - m\ddot{x} = 0\\]

    \\[\ddot{x} = 0\\]

    which makes sense, as the ball is not accelerating in the \\(x\\)
    direction.

    \\[\frac{\partial \mathcal{L}}{\partial y} = -mg\\]

    \\[\frac{d}{dt}\frac{\partial \mathcal{L}}{\partial \dot{y}} = m\ddot{y}\\]

    \\[-mg - m\ddot{y} = 0\\] \\[\ddot{y} = -g\\] which also makes sense, as the
    ball's acceleration due to Earth's gravity is \\(-g\\)

    Thus, the equations of motion for this system are \\(a\_x = 0\\) and
    \\(a\_y = -g\\), indicating that the ball moves at a constant velocity in
    the \\(x\\) direction and accelerates downwards with the acceleration due
    to gravity, \\(-g\\).


#### Solving the original problem with Lagrangian Mechanics {#solving-the-original-problem-with-lagrangian-mechanics}

Now we will go back to the original problem with our new knowledge of
Lagrangian mechanics.

**1. Select a coordinate system that is convenient for our problem:**

{{< figure src="/attachments/lagrangian_diagram.png" >}}

To simplify our analysis, let's define a coordinate system as follows:

-   \\(q\\): Hypotenuse distance from the top of the ramp to the block.
-   \\(x\\), \\(y\\): Horizontal and vertical displacements of the block with
    respect to the ramp.
-   \\(X\\): Displacement from the origin of the ramp.

The position of the block can be expressed in terms of \\(q\\) and \\(X\\)
as: \\[(X - x, y) = (X - q\cos{\theta}, -q\sin{\theta})\\]

> We use \\(X - x\\) because we need to consider the positions in the
> non-inertial reference frame of the whole system, where the block and
> ramp are moving in opposite directions.

**2. Define the Lagrangian:**

The total kinetic energy is the sum of the kinetic energy of the ramp
and block, so we can take the velocities of each by taking the time
derivative (\\(\dot{X}, \dot{x}, \dot{y}, \dot{q}\\))

\\[\begin{aligned}
T &= \frac{1}{2}M\dot{X}^2 + \frac{1}{2}m((\dot{X}-\dot{q}\cos{\theta})^2 + (-\dot{q}\sin{\theta})^2) \newline
 &= \frac{1}{2}M\dot{X}^2 + \frac{1}{2}m(\dot{X}^2-2\cos{\theta}\dot{X}\dot{q}+\dot{q}^2\cos^2{\theta}+\dot{q}^2\sin^2{\theta}) \newline
 &= \frac{1}{2}M\dot{X}^2 + \frac{1}{2}m(\dot{X}^2-2\cos{\theta}\dot{X}\dot{q}+\dot{q}^2) \newline
 &= \frac{1}{2}M\dot{X}^2 + \frac{1}{2}m\dot{X}^2-m\cos{\theta}\dot{X}\dot{q}+\frac{1}{2}m\dot{q}^2 \newline
 &= \frac{1}{2}(M + m)\dot{X}^2+\frac{1}{2}m\dot{q}^2-m\cos{\theta}\dot{X}\dot{q}
\end{aligned}\\]

Y component of block is just \\(-q\sin{\theta}\\), so potential energy is
just:

\\[U = -mgq\sin{\theta}\\]

\\[\mathcal{L} = \frac{1}{2}(M + m)\dot{X}^2+\frac{1}{2}m\dot{q}^2 - m\cos{\theta}\dot{X}\dot{q}+ mgq\sin{\theta}\\]

**3. Apply the Euler-Lagrange equation to find equations of motion for
\\(X\\):**

\\[\frac{d}{dt}\frac{\partial{\mathcal{L}}}{\partial{\dot{X}}} = \frac{\partial{\mathcal{L}}}{\partial{X}}\\]

\\[(M+m)\ddot{X}-m\cos{\theta}\ddot{q} = 0\implies\ddot{X} = \frac{m}{M+m}\cos{\theta}\ddot{q} \tag{1}\\]

Do the same for \\(q\\):

\\[\frac{d}{dt}\frac{\partial{\mathcal{L}}}{\partial{\dot{q}}} = \frac{\partial{\mathcal{L}}}{\partial{q}}\\]

\\[\cancel{m}\ddot{q}-\cancel{m}\cos{\theta}\ddot{X} = \cancel{m}g\sin{\theta} \implies \ddot{q} - \cos{\theta}\ddot{X} = g\sin{\theta} \tag{2}\\]

Substituting \\((1)\\) into \\((2)\\):

\\[\begin{align}
\ddot{q} - cos{&theta;} \left(\frac{m}{M+m}cos{&theta;}\ddot{q}\right) &amp;= gsin{&theta;} \nonumber \newline
\ddot{q} \left( 1 - \frac{m}{M+m}cos^2{&theta;} \right) &amp;= gsin&theta; \nonumber \newline
\ddot{q} \left( \frac{M + m\sin^2\theta}{M + m}\right) &amp;= gsin&theta; \nonumber \newline
\ddot{q} &amp;= \frac{M+m}{M+msin^2{&theta;}}gsin{\\

[^fn:1]: 7 columns × 7 rows (one row per column to prevent diagonal
    wrap-around)
