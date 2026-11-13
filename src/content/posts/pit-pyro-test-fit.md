---
title: 'Pit-pyro: test-fitting the enclosure'
description: 'A friend printed the first full enclosure. I fitted every part into it, broke the menu button holder, and fixed five things in the model.'
date: 2026-11-12
tags: ['pit-pyro', 'hardware', '3d-printing']
---

A friend printed the first full enclosure for pit-pyro, the v0.4 design from [measuring the real parts](/log/pit-pyro-measuring/), and pressed in the five brass inserts. Shoutout to Spencer! This is the test fit: I put every part in, and whatever didn't fit got fixed in the model.

## What fit

The halves didn't close at first, so I filed around the inserts. After that they closed with a thin, even seam.

<figure>
  <img src="/images/log/pit-pyro-test-fit/halves-open.webp" alt="Two white 3D-printed halves of a pistol-grip enclosure lying open, one with brass inserts in its screw posts" />
  <figcaption>The two printed halves. The one on the right has the brass inserts.</figcaption>
</figure>

The Feather sits in its rails with the USB-C port square in its opening. The battery, the clock, the buzzer and the screen went into their places with no changes.

## The menu button

The button didn't fit between the case wall and the bar behind it. I forced it, and the bar broke off.

<figure>
  <img src="/images/log/pit-pyro-test-fit/button-holder-broken.webp" alt="A corner of the printed half with a broken holder, the snapped-off piece and a small tactile button with bent legs beside it" />
  <figcaption>The button holder, the bar that broke off and the button.</figcaption>
</figure>

When I measured the parts I wrote down 2.70 mm for the button's body. I measured it again and it's 3.6 mm, so the 3.0 mm slot was too short. The plunger also stands only 0.45 mm above the body, not the 1.5 mm in the model, so the cap never reached it.

The bar was too weak anyway, and I didn't like any version of it. The button is now soldered to a 13.45 × 20 mm piece of perfboard that slides into two rails, the same way the sensor is held. The cap got a small nub that reaches the plunger.

I didn't want to reprint the whole case to try it, so there's a new test print with just that corner. I printed it at the library on a Prusa MK4. The fit is perfect: the board slides into the rails and the button clicks.

<figure>
  <img src="/images/log/pit-pyro-test-fit/test-button-fit.webp" alt="A small orange test print holding a green perfboard square in two rails, with a tactile button on the board and a round printed cap against it" />
  <figcaption>The test print: the button on its perfboard in the rails, with the cap in front of it.</figcaption>
</figure>

## The trigger

The trigger didn't spring back. The stop below it wrapped around the trigger's ear with no clearance, and the ear got stuck in it. I filed the ear's edges. In the model the stop is now shorter than the ear, so it can't wrap around it.

<figure>
  <img src="/images/log/pit-pyro-test-fit/trigger-stuck.webp" alt="Inside the printed half: a white trigger on a black screw above a green microswitch, the trigger's lower corner sitting in a slot in the case" />
  <figcaption>The trigger on its hinge screw, above the switch.</figcaption>
</figure>

The M3 × 30 hinge screw didn't reach its nut. By the model's own numbers it only went 0.7 mm into the nut, about one thread, with the halves fully closed. I put the nut on a spare screw and pushed it about 2 mm deeper into the plastic with the soldering iron at 220 °C. The screw reaches it now.

It was the only screw that was too short. In the model its nut pocket went from 2.6 to 4.5 mm deep. The depth of each nut pocket now comes from the length of its screw, and the model gives an error if any screw has less than 2 mm of thread.

## The laser and the sensor

The laser's two wires come straight out of its back end, and the model had no way out for them. I filed a notch for this print and added a 5 mm channel to the model.

The sensor in this build is the perfboard one from [day two](/log/pit-pyro-desk-test-day-two/). The one on the [custom board](/log/pit-pyro-carrier-build/) sits tilted, so it's the spare for now.

Each half held the sensor's board by one edge, so the board tipped over every time I tried to close the case. Blu Tack held it for this print. In the model the rails now run along the board's top and bottom edges, so it stands on its own in one half.

## Closing it

With the hand fixes, every part is in and the case closes with its five M3 × 20 screws. It's surprisingly sturdy, and the trigger clicks the switch and springs back.

<figure>
  <img src="/images/log/pit-pyro-test-fit/closed-screwed.webp" alt="The closed white enclosure lying on its side, five black screw heads in its face and the trigger showing at the front of the grip" />
  <figcaption>The enclosure closed with its case screws.</figcaption>
</figure>

<figure>
  <img src="/images/log/pit-pyro-test-fit/front-closed-sensor.webp" alt="The front of the closed enclosure: the sensor's lens in a round hole, a larger empty hole for the laser and the trigger behind them" />
  <figcaption>The front: the sensor's lens centered in its hole, with the laser's hole next to it.</figcaption>
</figure>

## Next

- Reprint the halves, the button cap and the trigger, and check each fix in plastic.

The screen was the last part to test. That's in [the screen test](/log/pit-pyro-screen-test/).

The fixes are in [PR #11](https://github.com/jaimebuildsthings/pit-pyro/pull/11), and the model is [enclosure.scad](https://github.com/jaimebuildsthings/pit-pyro/blob/main/hardware/enclosure/enclosure.scad).
