---
title: 'Pit-pyro: the screen test'
description: 'The screen was the last part I had not seen working. It now shows what the thermal sensor sees, with the hottest, average and coldest temperatures next to it.'
date: 2026-11-12T12:00:00Z
tags: ['pit-pyro', 'firmware', 'electronics']
---

After the [test fit](/log/pit-pyro-test-fit/), the screen was the one part I hadn't seen working. The firmware could detect it but didn't draw anything on it yet.

## On the desk

The screen is a 0.96" OLED, 128 × 64 pixels. It plugs into the Feather's first STEMMA QT socket with a short cable.

<figure>
  <img src="/images/log/pit-pyro-screen-test/oled-bench.webp" alt="A FeatherS3 board on a grey mat with a USB-C cable, connected by a short four-wire cable to a small OLED screen board" />
  <figcaption>The screen on its STEMMA QT cable to the Feather.</figcaption>
</figure>

My Mac didn't see the Feather at all. I tried another cable, another port, flipping the plug and resetting the board. Great troubleshooting, except I was plugging it into my work laptop. There are two Macs on the same desk, and I'm a goofball.

Turns out it helps to plug it into the right computer. It connected straight away, and the firmware found the screen at address 0x3D.

## What it shows

The plan was a test pattern, but I wanted to see the sensor's readings on it instead. The firmware now draws three things: a line around the edge of the panel, the sensor's image, and the hottest, average and coldest temperatures in it (H, A and L).

Like on [day one](/log/pit-pyro-desk-test/), the first image I took was of myself.

<figure>
  <img src="/images/log/pit-pyro-screen-test/oled-selfie.webp" alt="A small OLED screen showing a grainy head-and-shoulders shape in a heat map on the left and H 35.0, A 26.8, L 23.7 on the right" />
  <figcaption>A thermal selfie on the screen: 35.0 °C hottest, 26.8 average, 23.7 coldest.</figcaption>
</figure>

The sensor doesn't take a picture. It reports 768 temperatures, 32 across and 24 down. Each one becomes a 2 × 2 block on the screen. The screen's pixels are only on or off, so warmer blocks get more lit dots and colder ones get fewer. The brightness is scaled between each image's own coldest and hottest reading. It updates about twice a second.

The line around the edge is for checking how the lit area sits in the enclosure's window.

As a kid I used to read Popular Mechanics even though I couldn't understand it, and I dreamed of building my own stuff like this. It's crazy that we can do this now. I would have never been able to do this without AI.

## Next

- Check the screen in the enclosure's window.
- Firmware for the trigger, the menu button, the buzzer and the laser.
- A camera mode in the menu, so I can show people at autocross what the sensor sees.

The code is in [PR #12](https://github.com/jaimebuildsthings/pit-pyro/pull/12).
