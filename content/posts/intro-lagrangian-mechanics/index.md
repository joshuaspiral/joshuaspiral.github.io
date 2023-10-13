---
title: 'Overengineering an HKPhO problem - A Brief Introduction to Lagrangian Mechanics'
date: 2023-10-12T07:55:03+08:00
draft: false
math: true
---
<!-- Definitions -->
$\gdef\Lagr{\mathcal{L}}$
**This article presumes knowledge of introductory Calculus.**

## Problem Statement
![Image of Problem Statement](/hkpho_question.jpg)
[source](http://hkpho.phys.ust.hk/archive_2016/HKPhO/2016_Paper.pdf)

Let's write a generalised solution for any $\theta$ instead of 45&deg;.

This problem can be solved with Newtonian mechanics (using $F = ma$) but it is far simpler to solve with Lagrange's approach.

## Introduction to Lagrangian Mechanics:
[Lagrangian mechanics](https://en.wikipedia.org/wiki/Lagrangian_mechanics) is a formulation of classsical mechanics, developed by Joseph-Louis Lagrange in 1788. Lagrangian mechanics is based on a fundamental principle of nature called the principle of stationary action. The Lagrangian formalism far outperforms the Newtonian approach to mechanics for certain systems due to its concise and unifying theory. By the end of this article, you will have learnt about the theory behind this powerful method of solving systems and how to apply it to problems.

### The Lagrangian
The Lagrangian, typically denoted by $\Lagr$, is the positive difference between the kinetic energy $T$ and the potential energy $V$. 

$$\Lagr = T - V$$

> Note that this is the Lagrangian for classical systems, and it can vary in general relativity and quantum mechanics.

The Lagrangian is an important quantity, and is used to define the action of a trajectory.

### Principle of Least Action:
Every trajectory of an object travelling through space has a scalar quantity known as "action" denoted by $S$. Action describes how the energy of a physical system changes over time. The action of a trajectory can be written as an integral of every Lagrangian along the trajectory:

$$S = \int_{t1}^{t2} \Lagr \, \mathrm{d}t$$

[As it so happens to be](https://en.wikipedia.org/wiki/Stationary-action_principle), the trajectory that minimises this functional yields the path that the object will take. In order to minimise this functional, we have to use the Euler-Lagrange equation, which finds when the functional is stationary.

$$\frac{\partial \Lagr}{\partial q} - \frac{d}{dt} \frac{\partial \Lagr}{\partial \dot{q}} = 0$$

> $q$ is a generalised coordinate, meaning it can represent any quantity that changes over time in a system. $\dot{q}$ denotes the first derivative of $q$ in respect to time (velocity), and $\ddot{q}$ would denote  $\frac{d^2q}{dt^2}$ (acceleration).

### Basic Example of Lagrangian Mechanics:
In order to grasp a rudimentary understanding of Lagrange's approach, we will take a simple example of a ball of mass $m$ dropped down from a height $h$ on Earth.

1. First, we select a coordinate system that is convenient for our problem: $x$, $y$

![diagram of ball drop problem](/ball_drop.png)

2. Then, we define the Lagrangian:

The total kinetic energy of the ball would be the kinetic energy of both the $x$ and $y$ directions:
$$T = \frac{1}{2}m\dot{x}^2 + \frac{1}{2}m\dot{y}^2$$
$$    = \frac{1}{2}m(\dot{x}^2 + \dot{y}^2)$$

The potential energy of the ball is just $mgh$:
$$V = mgy$$

So:
$$\Lagr = \frac{1}{2}m(\dot{x}^2 + \dot{y}^2) - mgy$$

3. Apply the Euler-Lagrange equations:

For the partial derivative of $\Lagr$ in respect to $x$, as there are no $x$ in $\Lagr$:
$$\frac{\partial \Lagr}{\partial x} = 0$$

$$\frac{d}{dt}\frac{\partial \Lagr}{\partial \dot{x}} = m\ddot{x}$$

$$0 - m\ddot{x} = 0$$

$$\ddot{x} = 0$$

which makes sense, as the ball is not accelerating in the $x$ direction.

$$\frac{\partial \Lagr}{\partial y} = -mg$$

$$\frac{d}{dt}\frac{\partial \Lagr}{\partial \dot{y}} = m\ddot{y}$$

$$-mg - m\ddot{y} = 0$$
$$\ddot{y} = -g$$
which also makes sense, as the ball's acceleration towards the Earth is $-g$

## Solving the original problem with Lagrangian Mechanics:

Now we will go back to the original problem, and use our new knowledge of Lagrangian mechanics.

1. Select a coordinate system that is convenient for our problem:

![diagram of the system](/lagrangian_diagram.png)
As the block is confined along the path of the ramp, we will just define a coordinate $q$ referring to the hypotenusal distance from the top of the ramp to the block. We will also define the $x, y$ as the horizontal and vertical displacement of the block in respect to the ramp. $X$ (big X) denotes the displacement from the origin of the ramp, and so the problem statement asks us to find $\ddot{X}$

The position of the block can be written in terms of $q$ and $X$:
$$(X - x, y) = (X + q\cos{\theta}, -q\sin{\theta})$$
> we use X + x because we need to take the positions in the non-inertial reference frame of the whole system in which the block and ramp are travelling in opposite directions.

2. Define the Lagrangian:

The total kinetic energy is the sum of the kinetic energy of the ramp and block, so we can take the velocities of each by taking the time derivative ($\dot{X}, \dot{x}, \dot{y}, \dot{q}$)
$$T = \frac{1}{2}M\dot{X}^2 + \frac{1}{2}m((\dot{X}-\dot{q}\cos{\theta})^2 + (-\dot{q}\sin{\theta})^2)$$

$$T = \frac{1}{2}M\dot{X}^2 + \frac{1}{2}m(\dot{X}^2-2\cos{\theta}\dot{X}\dot{q}+\dot{q}^2\cos^2{\theta}+\dot{q}^2\sin^2{\theta})$$

> trigonometric identity: $\sin^2{\theta} + \cos^2{\theta} = 1$

$$T = \frac{1}{2}M\dot{X}^2 + \frac{1}{2}m(\dot{X}^2-2\cos{\theta}\dot{X}\dot{q}+\dot{q}^2)$$

$$T = \frac{1}{2}M\dot{X}^2 + \frac{1}{2}m\dot{X}^2-m\cos{\theta}\dot{X}\dot{q}+\frac{1}{2}m\dot{q}^2$$

$$T = \frac{1}{2}(M + m)\dot{X}^2+\frac{1}{2}m\dot{q}^2-m\cos{\theta}\dot{X}\dot{q}$$

Y component of block is just $-q\sin{\theta}$, so potential energy is just:

$$U = -mgq\sin{\theta}$$

$$\Lagr = \frac{1}{2}(M + m)\dot{X}^2+\frac{1}{2}m\dot{q}^2 - m\cos{\theta}\dot{X}\dot{q}+ mgq\sin{\theta}$$

Apply the Euler-Lagrange equation for to find equations of motion for $X$:

$$\frac{d}{dt}\frac{\partial{\Lagr}}{\partial{\dot{X}}} = \frac{\partial{\Lagr}}{\partial{X}}$$

$$(M+m)\ddot{X}-m\cos{\theta}\ddot{q} = 0\implies\ddot{X} = \frac{m}{M+m}\cos{\theta}\ddot{q}$$

Do the same for $q$:

$$\frac{d}{dt}\frac{\partial{\Lagr}}{\partial{\dot{q}}} = \frac{\partial{\Lagr}}{\partial{q}}$$

$$\cancel{m}\ddot{q}-\cancel{m}\cos{\theta}\ddot{X} = \cancel{m}g\sin{\theta}$$

Substitute equation of motion for $X$ into $q$:

$$\ddot{q} +\left(\frac{m}{M+m}\cos{\theta}\ddot{q}\right)\cos{\theta} = g\sin{\theta} \implies \ddot{q} = g\sin{\theta}\frac{M+m}{M+m\sin^2{\theta}}$$

Substitute $\ddot{q}$ into $\ddot{X}$:

$$\ddot{X}=-\frac{m}{\cancel{M+m}}\cos{\theta}\left(g\sin{\theta}\frac{\cancel{M+m}}{M+m\sin^2{\theta}}\right) \implies \ddot{X}=-g\cos{\theta}\sin{\theta}\frac{m}{M+m\sin^2{\theta}}$$
