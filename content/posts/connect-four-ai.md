+++
title = "Connect Four AI in C"
author = ["Joshua Yeung"]
date = 2026-03-20
tags = ["c", "python", "ai"]
draft = false
weight = 2001
+++

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
 X | O | O     gameStateX = 0b100_010_000
   | X |   ->  gameStateO = 0b011_000_100
 O |   | X
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


## Results {#results}

Benchmarked at depth 9: (more benchmarking available on the README)

| Implementation           | Time   |
|--------------------------|--------|
| C, 2D array + alpha-beta | 32.52s |
| C, bitboard + alpha-beta | 2.37s  |

13x speedup from just changing the representation! Awesome sauce.

I also made a GUI version with SDL so I could actually play against it,
which was fun. [GitHub](https://github.com/joshuaspiral/c4c)

[^fn:1]: 7 columns × 7 rows (one row per column to prevent diagonal
    wrap-around)
