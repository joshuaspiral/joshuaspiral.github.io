---
title: 'Overengineering an HKPhO problem - A Brief Introduction to Lagrangian Mechanics'
date: 2023-10-12T07:55:03+08:00
draft: false
math: true
showToc: true
comments: true
---
<!-- Definitions -->
$\gdef\Lagr{\mathcal{L}}$
**This article presumes knowledge of introductory calculus.**

## Problem Statement:
![Image of Problem Statement](/hkpho_question.jpg)
[source](http://hkpho.phys.ust.hk/archive_2016/HKPhO/2016_Paper.pdf)

Let's write a generalised solution for any $\theta$ instead of 45&deg;.

Try solving the problem with Newtonian mechanics before reading the rest of the article to better understand why this is a preferred method! The answer will be revealed at the end.

## Introduction to Lagrangian Mechanics:
[Lagrangian mechanics](https://en.wikipedia.org/wiki/Lagrangian_mechanics) is a formulation of classsical mechanics, developed by Joseph-Louis Lagrange in 1788. Lagrangian mechanics is based on a fundamental principle of nature called the principle of stationary action. The Lagrangian formalism far outperforms the Newtonian approach to mechanics for certain systems due to its concise and unifying theory. By the end of this article, you will have learnt about the theory behind this powerful method of solving systems and how to apply it to problems.

### The Lagrangian:
The Lagrangian, typically denoted by $\Lagr$, is the positive difference between the kinetic energy $T$ and the potential energy $U$. 

$$\Lagr = T - U$$

> Note that this is the Lagrangian for classical systems, and it can vary in general relativity and quantum mechanics.

The Lagrangian is an important quantity, and is used to define the action of a trajectory.

### Principle of Least Action:
The principle of least action, also known as the stationary-action principle, is a fundamental concept in physics. It states that the actual path taken by a physical system between two points in time is the one that minimises the action integral. The action, denoted by $S$, is a scalar quantity that describes the energy of the system over a certain period of time.

The action of a trajectory is given by the integral of the Lagrangian along the trajectory.     

$$S = \int_{t_1}^{t_2} \Lagr \ \mathrm{d}t$$

To find the trajectory with stationary action, we use the [Euler-Lagrange equation](https://en.wikipedia.org/wiki/Euler%E2%80%93Lagrange_equation). The Euler-Lagrange equation is useful for solving optimisation problems in which we find the function that minimises a functional ($S$ in this case). The full derivation of the Euler-Lagrange can be found [here](https://eng.libretexts.org/Bookshelves/Electrical_Engineering/Electro-Optics/Direct_Energy_(Mitofsky)/11%3A_Calculus_of_Variations/11.03%3A_Derivation_of_the_Euler-Lagrange_Equation)

> A functional is a certain type of function that maps a function to a real number.

$$\frac{\partial \Lagr}{\partial q} - \frac{d}{dt} \frac{\partial \Lagr}{\partial \dot{q}} = 0$$

Here, $\frac{\partial \Lagr}{\partial q}$ represents the partial derivative of the Lagrangian with respect to the generalised coordinate $q$.

> $q$ is a generalised coordinate, meaning it can represent any quantity that changes over time in a system. $\dot{q}$ denotes the first derivative of $q$ with respect to time (velocity), and $\ddot{q}$ would denote  $\frac{d^2q}{dt^2}$ (acceleration).

### Basic Example of Lagrangian Mechanics:
In order to grasp a rudimentary understanding of Lagrange's approach, we will take a simple example of a ball of mass $m$ dropped down from a height $h$ on Earth.

**1. First, we select a coordinate system that is convenient for our problem: $x$, $y$**

![diagram of ball drop problem](/ball_drop.png)

**2. Then, we define the Lagrangian:**

The total kinetic energy of the ball would be the kinetic energy of both the $x$ and $y$ directions:
$$T = \frac{1}{2}m\dot{x}^2 + \frac{1}{2}m\dot{y}^2$$
$$    = \frac{1}{2}m(\dot{x}^2 + \dot{y}^2)$$

The potential energy of the ball is just $mgh$:
$$U = mgy$$

So:
$$\Lagr = \frac{1}{2}m(\dot{x}^2 + \dot{y}^2) - mgy$$

**3. Apply the Euler-Lagrange equations:**

For the partial derivative of $\Lagr$ with respect to $x$, as there are no $x$ in $\Lagr$:
$$\frac{\partial \Lagr}{\partial x} = 0$$

$$\frac{d}{dt}\frac{\partial \Lagr}{\partial \dot{x}} = m\ddot{x}$$

$$0 - m\ddot{x} = 0$$

$$\ddot{x} = 0$$

which makes sense, as the ball is not accelerating in the $x$ direction.

$$\frac{\partial \Lagr}{\partial y} = -mg$$

$$\frac{d}{dt}\frac{\partial \Lagr}{\partial \dot{y}} = m\ddot{y}$$

$$-mg - m\ddot{y} = 0$$
$$\ddot{y} = -g$$
which also makes sense, as the ball's acceleration due to Earth's gravity is $-g$

Thus, the equations of motion for this system are $a_x = 0$ and $a_y = -g$, indicating that the ball moves at a constant velocity in the $x$ direction and accelerates downwards with the acceleration due to gravity, $-g$.

## Solving the original problem with Lagrangian Mechanics:

Now we will go back to the original problem with our new knowledge of Lagrangian mechanics.

**1. Select a coordinate system that is convenient for our problem:**

![diagram of the system](/lagrangian_diagram.png)
To simplify our analysis, let's define a coordinate system as follows:

- $q$: Hypotenuse distance from the top of the ramp to the block.
- $x$, $y$: Horizontal and vertical displacements of the block with respect to the ramp.
- $X$: Displacement from the origin of the ramp.

The position of the block can be expressed in terms of $q$ and $X$ as:
$$(X - x, y) = (X - q\cos{\theta}, -q\sin{\theta})$$

> We use $X - x$ because we need to consider the positions in the non-inertial reference frame of the whole system, where the block and ramp are moving in opposite directions.

**2. Define the Lagrangian:**

The total kinetic energy is the sum of the kinetic energy of the ramp and block, so we can take the velocities of each by taking the time derivative ($\dot{X}, \dot{x}, \dot{y}, \dot{q}$)

$$\begin{aligned}
T &= \frac{1}{2}M\dot{X}^2 + \frac{1}{2}m((\dot{X}-\dot{q}\cos{\theta})^2 + (-\dot{q}\sin{\theta})^2) \newline
 &= \frac{1}{2}M\dot{X}^2 + \frac{1}{2}m(\dot{X}^2-2\cos{\theta}\dot{X}\dot{q}+\dot{q}^2\cos^2{\theta}+\dot{q}^2\sin^2{\theta}) \newline
 &= \frac{1}{2}M\dot{X}^2 + \frac{1}{2}m(\dot{X}^2-2\cos{\theta}\dot{X}\dot{q}+\dot{q}^2) \newline
 &= \frac{1}{2}M\dot{X}^2 + \frac{1}{2}m\dot{X}^2-m\cos{\theta}\dot{X}\dot{q}+\frac{1}{2}m\dot{q}^2 \newline
 &= \frac{1}{2}(M + m)\dot{X}^2+\frac{1}{2}m\dot{q}^2-m\cos{\theta}\dot{X}\dot{q}
\end{aligned}$$

Y component of block is just $-q\sin{\theta}$, so potential energy is just:

$$U = -mgq\sin{\theta}$$

$$\Lagr = \frac{1}{2}(M + m)\dot{X}^2+\frac{1}{2}m\dot{q}^2 - m\cos{\theta}\dot{X}\dot{q}+ mgq\sin{\theta}$$

**3. Apply the Euler-Lagrange equation to find equations of motion for $X$:**

$$\frac{d}{dt}\frac{\partial{\Lagr}}{\partial{\dot{X}}} = \frac{\partial{\Lagr}}{\partial{X}}$$

$$(M+m)\ddot{X}-m\cos{\theta}\ddot{q} = 0\implies\ddot{X} = \frac{m}{M+m}\cos{\theta}\ddot{q} \tag{1}$$

Do the same for $q$:

$$\frac{d}{dt}\frac{\partial{\Lagr}}{\partial{\dot{q}}} = \frac{\partial{\Lagr}}{\partial{q}}$$

$$\cancel{m}\ddot{q}-\cancel{m}\cos{\theta}\ddot{X} = \cancel{m}g\sin{\theta} \implies \ddot{q} - \cos{\theta}\ddot{X} = g\sin{\theta} \tag{2}$$

Substituting $(1)$ into $(2)$:

$$\begin{align}
\ddot{q} - \cos{\theta} \left(\frac{m}{M+m}\cos{\theta}\ddot{q}\right) &= g\sin{\theta} \nonumber \newline
\ddot{q} \left( 1 - \frac{m}{M+m}\cos^2{\theta} \right) &= g\sin\theta \nonumber \newline
\ddot{q} \left( \frac{M + m\sin^2\theta}{M + m}\right) &= g\sin\theta \nonumber \newline
\ddot{q} &= \frac{M+m}{M+m\sin^2{\theta}}g\sin{\theta} \tag{3}
\end{align}$$ 

And finally, substituting $(3)$ into $(2)$ gets you:

$$\begin{aligned}
\ddot{X}&=\frac{m}{\cancel{M+m}}\cos{\theta}\left(\frac{\cancel{M+m}}{M+m\sin^2{\theta}} g\sin{\theta}\right) \newline
&= \frac{m\cos{\theta}\sin{\theta}}{M+m\sin^2{\theta}} g
\end{aligned}$$

To verify the validity of our answer, let us examine its dimensions. As we are dealing with acceleration, our expected units should be in the form of $\text{L} \cdot \text{T}^{-2}$, where $\text{L}$ represents length and $\text{T}$ represents time.

$$\frac{\cancel{\text{M}} \cdot \text{L} \cdot \text{T}^{-2}}{\cancel{\text{M}}} = \text{L} \cdot \text{T}^{-2}$$

$\therefore$ The equation is dimensionally consistent

Let's check that the equation makes sense by substituting some test values:

If $\theta = 0\degree$, the inclined plane should not move and the block should not move at all.

$$\ddot{X}(\theta = 0\degree) = \left( \frac{m \cdot 1 \cdot 0}{M + m \cdot 0} \right) g = 0$$
$$\ddot{q}(\theta = 0\degree) = \left( \frac{M + m}{M + m \cdot 0} \right) g \cdot 0 = 0$$

If $\theta = 90\degree$, the inclined plane should not move either, but the block should accelerate downwards with a magnitude of $g$ as there is no contact with the inclined plane.

$$\ddot{X}(\theta = 90\degree) = \frac{m \cdot 0 \cdot 1}{M + m \cdot 1}g = 0$$
$$\ddot{q}(\theta = 90\degree) = \left( \frac{M + m}{M + m \cdot 1} \right) g \cdot 1 = g$$

Let's put in our original $\theta$ of 45&deg;:
$$\left(\frac{m\cos{45\degree}\sin{45\degree}}{M+m\sin^2{45\degree}}\right)g = \left(\frac{m\cdot\frac{1}{2}}{M+\frac{m}{2}}\right)g = \left(\frac{m}{m + 2M}\right)g$$

So the answer is E.

