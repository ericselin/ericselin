---
title: Container media queries with `clamp`
date: 2022-09-07
---

While we wait for [CSS container queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Container_Queries), let me introduce a nice tool in the fluid web development toolset: `clamp()` ([MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/clamp)). Clamp takes three values, a minimum, a preferred value, and a maximum. A'la `clamp(1rem, 5vw, 3rem)`. If the "preferred" (middle) value is less than the minimum, the minimum is applied, if more than the maximum, the maximum.

Using this, we can create basic "if-then" statements in CSS. Today I had a scenario where I needed to i) wrap a flexbox layout when the container is particularly narrow (easy, just use `flex-basis` and so on), but *also* ii) add an extra margin to the elements when this happens (hard!). Because designers, ammarite?

Anyway, this should be possible with as little fiddling with the HTML structure as possible (HTML is not for styling). Let's solve ii) from above first. Let's say we want a margin of 1rem if the surrounding box is less than 200px wide, 2rem if it is more. Remember clamp limits a value between min and max:

- `IF container < 200px THEN 1rem ELSE 2rem` =>
- `1rem + IF container < 200px THEN 0rem ELSE 1rem` =>
- `1rem + clamp(0rem, IF container < 200px THEN something < 0rem ELSE something > 1rem, 1rem)`

Let's stop here for a moment. That middle part of the clamp is interesting. Let's call the container width `w`:

- `w - 200px < 0` which means `w - 200px < 1rem` when `w < 200px`
- `w - 200px > 1rem` when `w > 200px + 1rem`
- `(w - 200px) * 10000 > 1rem` when `w > 200px + 1rem / 10000` or usually `w > 200.0016`

That last part satifies the above `IF container < 200px THEN something < 0rem ELSE something > 1rem` to a reasonably high precision. Given that container width `w = 100%` in CSS when dealing with the inline axis, we have:

FINAL CSS:

```css
margin-right: calc(1rem + clamp(0rem, (100% - 200px) * 10000, 1rem));
```

Note! If you want to have a larger margin when the element is smaller, just reverse the subtraction to `200px - 100%`!
