# Colors
This project was created as an exercise to test my skills in JavaScript and Sass. You can generate pseudo-random colors, check color contrasts, and create gradients.
I learned how to use classes and APIs. I need to work on the structure of the styles and try to write more concise JavaScript code to make it more readable.

## Contents
- [Inspirations](#Inspirations)
- [Used API](#Used-API)
- [Technology](#Technology)
- [Problems](#Problems)
- [Future](#Future)

## Inspirations
* https://coolors.co/
* https://colorffy.com/

## Used API
* [The Color API](https://www.thecolorapi.com/) - generating color names and color conversion.
* [DummyJSON](https://dummyjson.com/) - to check color contrast.


## Technology
* HTML
* Sass
* JavaScript
* Figma

## Problems
1. In the color generator, I had to make sure that the text does not blend with the background. You could put the text and button under the color as done on the website https://colorffy.com/random-color, but I didn't want to ruin the design. So I decided to check if the generated color is light or dark and automatically change the text color to the opposite. On the website https://dev.to/apisurfer/relative-color-luminance-1ef0 it was very well explained how to solve this problem and I created my own version:
```javascript
function checkLuminance(red, green, blue) {
  let luminance =
    0.299 * parseInt(red.toString(10)) + 0.587 * parseInt(green.toString(10)) + 0.114 * parseInt(blue.toString(10));
  return luminance > 128 ? true : false;
}
```
If the result is above 128, the color is dark, and if it's below or equal to 128, it's light.

2. In Color contrast, I had to write a function to calculate relative luminance and while searching the internet for a formula to calculate, I was mostly referred to ready-made websites that calculate it. It was only on the website https://www.w3.org/TR/WCAG21/#dfn-contrast-ratio that I got an answer to my question and learned about levels AA and AAA. According to this formula, I managed to write the function:
```javascript
function calcLuminance() {
  let rgb = [0, 0, 0];

  for (let i = 0; i < 2; i++) {
    let color = document.querySelectorAll("input[type='color']")[i].value.replace(/^#/, "");
    for (let j = 0; j < 3; j++) {
      rgb[j] = parseInt(parseInt(color.substring(2 * j, 2 * j + 2), 16)) / 255;
      if (rgb[j] <= 0.03928) {
        rgb[j] = rgb[j] / 12.92;
      } else {
        rgb[j] = Math.pow((rgb[j] + 0.055) / 1.055, 2.4);
      }
    }
    luminance[i] = 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
  }
  //Lighter > darker
  if (luminance[1] > luminance[0]) {
    return parseFloat((luminance[1] + 0.05) / (luminance[0] + 0.05))
      .toFixed(1)
      .endsWith(".0")
      ? Math.round((luminance[1] + 0.05) / (luminance[0] + 0.05))
      : parseFloat((luminance[1] + 0.05) / (luminance[0] + 0.05)).toFixed(1);
  } else {
    return parseFloat((luminance[0] + 0.05) / (luminance[1] + 0.05))
      .toFixed(1)
      .endsWith(".0")
      ? Math.round((luminance[0] + 0.05) / (luminance[1] + 0.05))
      : parseFloat((luminance[0] + 0.05) / (luminance[1] + 0.05)).toFixed(1);
  }
}
```

## Future
I plan to migrate this page to React, adding a color palette generator along with how people with color blindness see these colors.
