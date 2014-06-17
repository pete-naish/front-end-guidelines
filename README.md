#About this project
This project introduces a comprehensive new style guide (CSS only, at the moment - HTML and JS to follow) and CSS architecture that **front-end devs should use in all projects going forwards**.

####Key benefits:####

Allows for mobile-first, component-based development, using the CSS cascade to full effect via the logical import order of CSS partials. This approach is backend-agnostic, which is great for company-wide consistency.

Inline media queries are favoured, as this keeps components truly modular and far easier to maintain than defining separate stylesheets for each breakpoint.

This readme explains the key components of the new architecture and style guide. This guide is intended to be easy to modify, scale, evolve, and adapt, so your thoughts, concerns, and recommendations are appreciated (and requested). I don't want anyone to feel forced to use this, but it should be immediately apparent that this is a great way to work.

This process will work with Sass, Less, or even plain CSS (if you're mental). I've used Sass (and .scss) in the information below.

##Contents
1. [Asset folder structure](#asset-folder-structure)
    1. [General](#general)
    2. [CSS](#css)
    3. [Images](#images)
    4. [JavaScript](#javascript)
    5. [Type](#type)

2. [CSS architecture](#css-architecture)
    1. [CSS folder structure](#css-folder-structure)
    2. [CSS source order](#css-source-order)
    3. [CSS style guide](#css-style-guide)

## <a name="asset-folder-structure"></a>Asset folder structure
    assets
    |
    +-- css
    |   |
    |   +-- sass
    |   |   |
    |   |   +-- settings
    |   |   |   |
    |   |   |   +-- _all.scss
    |   |   |   +-- _color.scss
    |   |   |   +-- _type.scss
    |   |   |   +-- _vars.scss
    |   |   |
    |   |   +-- tools
    |   |   |   |
    |   |   |   +-- helpers
    |   |   |   |   |
    |   |   |   |   +-- _clearfix.scss
    |   |   |   |   +-- _hide-text.scss
    |   |   |   |   +-- _image-replacement.scss
    |   |   |   |   +-- _image-retina.scss
    |   |   |   |   +-- _prefixer.scss
    |   |   |   |
    |   |   |   +-- mixins
    |   |   |   |   |
    |   |   |   |   +-- _font-face.scss
    |   |   |   |   +-- _media-query--hidpi.scss
    |   |   |   |   +-- _media-query.scss
    |   |   |   |   +-- _prefix.scss
    |   |   |   |   +-- _transform.scss
    |   |   |   |   +-- _transition.scss
    |   |   |   |
    |   |   |   +-- functions
    |   |   |   |   |
    |   |   |   |   +-- _em-calc.scss
    |   |   |   |   +-- _grid-flex.scss
    |   |   |   |   +-- _percentage.scss
    |   |   |   |   +-- _strip-units.scss
    |   |   |   |
    |   |   |   +-- _all.scss
    |   |   |
    |   |   +-- generic
    |   |   |   |
    |   |   |   +-- _all.scss
    |   |   |   +-- _normalize.scss
    |   |   |   +-- _reset.scss
    |   |   |
    |   |   +-- base
    |   |   |   |
    |   |   |   +-- _all.scss
    |   |   |   +-- _form-elements.scss
    |   |   |   +-- _headings.scss
    |   |   |   +-- _links.scss
    |   |   |   +-- _page.scss
    |   |   |
    |   |   +-- objects
    |   |   |   |
    |   |   |   +-- _all.scss
    |   |   |   +-- _accordion.scss
    |   |   |   +-- _buttons.scss
    |   |   |
    |   |   +-- components
    |   |   |   |
    |   |   |   +-- _all.scss
    |   |   |
    |   |   +-- trumps
    |   |   |   |
    |   |   |   +-- _all.scss
    |   |   |   +-- _helpers.scss
    |   |   |   +-- _print.scss
    |   |   |
    |   |   +-- app.scss
    |   |
    |   +-- app.css
    |   +-- app.min.css
    |
    +-- img
    |   |
    |   +-- frame
    |   |   |
    |   |   +-- logo--brand.png
    |   |
    |   +-- content
    |   |   |
    |   |   +-- placeholder-image--carousel--primary.jpg
    |
    +-- js
    |   |
    |   +-- vendor
    |   |   |
    |   |   +-- jquery--1.11.0.min.js
    |   |   +-- jquery__bxslider--4.1.2.min.js
    |   |
    |   +-- .jshintrc
    |   +-- app.js
    |   +-- app.min.js
    |
    +-- type
    |   |
    |   +-- project-icons.eot
    |   +-- project-icons.svg
    |   +-- project-icons.ttf
    |   +-- project-icons.woff
    |   +-- selection.json
    |

### <a name="general"></a>General
All folder names should be lowercase, and use hyphens, underscores, or periods instead of spaces.

If you're using Mixture, converted HTML should be added to `.gitignore`.

Compiled CSS and custom, minified JavaScript should also be added to `.gitignore`. This is to avoid potential merge conflicts and large diffs.

#### Naming
All assets and classes should be lowercase (no camelCase), and use a [BEM](http://bem.info/) (ish) naming convention which goes from general to specific:

`block__element--modifier`

`__element` is used to show that the element is inside, or 'dives down' into, a block, e.g.:

    <nav class="nav">
        <ul>
            <li class="nav__item"><a href="#">Float me left</a></li>
            <li class="nav__item"><a href="#">Float me left</a></li>
            <li class="nav__item--alt"><a href="#">Float me right</a></li>
        </ul>
    </nav>

`--modifier` can be applied to a block or an element, e.g.:

    <nav class="nav--secondary">
        <ul>
            <li class="nav--secondary__item"><a href="#">Float me left</a></li>
            <li class="nav--secondary__item"><a href="#">Float me left</a></li>
            <li class="nav--secondary__item--alt"><a href="#">I've got a border</a></li>
        </ul>
    </nav>

Double `--` and `__` are used so that single `-` or `_` can be used when naming a block, element, or modifier, e.g.:

`social-links--small`

The class name given to a component or object should be as general as possible, but it should still make sense to a developer. You should be able to tell which component you are editing, and what that component does, just by looking at the HTML or CSS (and not the page in browser). Keeping the name general means that a component can be placed anywhere on a site, and its name is not affected by the context.

`home-slider` is bad because if the same slider is used somewhere other than the home page, the name no longer makes sense.

`carousel--primary` is better. You can then use secondary, tertiary, alpha, beta, etc to name similar components.

### <a name="css"></a>CSS
Jump to the [CSS Architecture](#css-architecture) section for detailed information on the CSS folder structure and style guide.

### <a name="images"></a>Images
Any images that are not suitable for packaging into the project icon font (see [Type](#type) below), that are used primarily in your CSS (such as the logo, or custom map markers), should be placed within `/assets/img/frame`.

Content image placeholders should be placed within `/assets/img/content`.

Images should be compressed. Saving `.jpg` images using Photoshop's *Save for web and devices* option at 60% works well in most cases.

`.png` images can be compressed losslessy using a program like [PNGGauntlet](http://pnggauntlet.com/) for Windows, or [ImageOptim](http://imageoptim.com/) for Mac.

#### Naming
`image-type--image-name.ext`

e.g.

`logo--project.png`

`icon--map-pin.png`

`placeholder-image--profile-card.jpg`

### <a name="javascript"></a>JavaScript
Third-party JavaScript files should be minified and placed inside `/assets/js/vendor`.

Custom JavaScript is written in `/assets/js/app.js`, which is minified as `/assets/js/app.min.js` (add this to `.gitignore`, remember).

Custom JavaScript should be checked with [JSHint](http://www.jshint.com/install/) or similar. [Sublime Text](http://www.sublimetext.com/) has a JSHint plugin available, which allows you to create a per-project `.jshintrc` configuration file that should be added to your project's `.gitignore`.

#### Naming
`library__plugin--v.e.r.min.js`

e.g.

`modernizr--2.8.1.min.js` - A pure JavaScript file that doesn't require a library like jQuery.

`jquery__bxslider--4.1.2.min.js` - JavaScript files that require libraries should be prefixed with the library name e.g. `jquery__`.

### <a name="type"></a>Type
Web fonts should be placed inside `/assets/type`.

Suitable icons (i.e. vector) should be packaged into an icon font using [IcoMoon](icomoon.io). This app can be used to generate a `selection.json` file (that is placed within `/assets/type` and added to Git). This file contains all the settings and info necessary to make it easy for developers to add, remove, or edit icons used in the project.

#### Naming
`font-name--font-variant.ext`

e.g.

`freight-sans--medium.ttf`

## <a name="css-architecture"></a>CSS architecture

### <a name="css-folder-structure"></a>CSS folder structure
The folder structure for CSS is based on [Harry Roberts'](http://csswizardry.com/) CSS Architecture for Big Front Ends. I attended his workshop at the [Future of Web Design 2014](http://futureofwebdesign.com/london-2014/) conference, and it was outstanding. This is a key part of the new style guide, and requires a solid explanation. Please let me know if anything is confusing or doesn't make sense.

Here's the folder structure again, with notes on key elements:

    +-- css // contains all sass and compiled CSS files
    |   |
    |   +-- sass
    |   |   |
    |   |   +-- settings // project variables
    |   |   |   |
    |   |   |   +-- _all.scss // _all.scss files import the others in the same folder, so this one file can be imported into the main app.scss file
    |   |   |   +-- _color.scss
    |   |   |   +-- _type.scss
    |   |   |   +-- _vars.scss
    |   |   |
    |   |   +-- tools // the Precedent mixin library
    |   |   |   |
    |   |   |   +-- helpers // helper mixins for common tasks
    |   |   |   |   |
    |   |   |   |   +-- _clearfix.scss
    |   |   |   |   +-- _hide-text.scss
    |   |   |   |   +-- _image-replacement.scss
    |   |   |   |   +-- _image-retina.scss
    |   |   |   |   +-- _prefixer.scss
    |   |   |   |
    |   |   |   +-- mixins // mixins for CSS3 features
    |   |   |   |   |
    |   |   |   |   +-- _font-face.scss
    |   |   |   |   +-- _media-query--hidpi.scss
    |   |   |   |   +-- _media-query.scss
    |   |   |   |   +-- _prefix.scss
    |   |   |   |   +-- _transform.scss
    |   |   |   |   +-- _transition.scss
    |   |   |   |
    |   |   |   +-- functions // handy functions
    |   |   |   |   |
    |   |   |   |   +-- _em-calc.scss
    |   |   |   |   +-- _grid-flex.scss
    |   |   |   |   +-- _percentage.scss
    |   |   |   |   +-- _strip-units.scss
    |   |   |   |
    |   |   |   +-- _all.scss // this file imports all tools
    |   |   |
    |   |   +-- generic // resets and normalize
    |   |   |   |
    |   |   |   +-- _all.scss
    |   |   |   +-- _normalize.scss
    |   |   |   +-- _reset.scss
    |   |   |
    |   |   +-- base // styling that targets plain HTML elements (usually no classes in here)
    |   |   |   |
    |   |   |   +-- _all.scss
    |   |   |   +-- _form-elements.scss
    |   |   |   +-- _headings.scss
    |   |   |   +-- _links.scss
    |   |   |   +-- _page.scss
    |   |   |
    |   |   +-- objects // basic design patterns and re-usable abstractions
    |   |   |   |
    |   |   |   +-- _all.scss
    |   |   |   +-- _accordion.scss
    |   |   |   +-- _buttons.scss
    |   |   |
    |   |   +-- components // styled components and modules
    |   |   |   |
    |   |   |   +-- _all.scss
    |   |   |   +-- _accordion--primary.scss
    |   |   |
    |   |   +-- trumps // overrides - these usually have !important rules, and that's okay. They come last, and they're designed to take precedence over all other styles
    |   |   |   |
    |   |   |   +-- _all.scss
    |   |   |   +-- _helpers.scss // float-right, mobile-only, etc.
    |   |   |   +-- _print.scss // print styles are typically overriding everything that came befroe
    |   |   |
    |   |   +-- app.scss // this file imports every _all.scss partial listed above, in the order shown (very important)
    |   |
    |   +-- app.css // this is the expanded compiled CSS, with comments
    |   +-- app.min.css // this is the minified compiled CSS (Mixture handles these two). This is the only CSS file that should be delivered for back-end integration
    |

### <a name="css-source-order"></a>CSS source order
The CSS structure and import order is important, and goes from general (affecting many elements), to specific (affecting just one element in one circumstance, for example).

1. `settings` - Variables, feature switches and other project specific settings. These are defined first and will be picked up and used by the framework later on.
2. `tools` - Mixins and functions to make tasks easier. These appear early on so that they can be utilised in the main body of the codebase.
3. `generic` - Resets, global box-sizing. These styles are really far reaching; they underpin every element we place on the page.
4. `base` - Base elements, unclassed h1, ol, etc. These are semantic HTML elements that require some base styling for when they exist outside of a component context (e.g. a regular, bulleted list in some body copy).
5. `objects` - Design patterns, objects, abstractions, and constructs.
6. `components` - Styled components and modules. These build on top of semantic HTML elements and are referred to mainly through class selectors.
7. `trumps` - Style trumps, helper classes, and overrides. These need to override any other styles, and thus come last. It is common for these styles to be `!important`

The idea is that CSS is imported and parsed in the browser in a logical order, from general styles to very specific, so you're typically adding style rules instead of taking them away.

### <a name="css-style-guide"></a>CSS style guide

#### General
Sass partials should be prefixed with an underscore.

Object and Component partials should match the main class name that they reference, e.g `_nav--primary.scss`.

Compiled CSS files should be added to `.gitignore`.

#### Writing rules
- **Write CSS mobile-first!**
- Do not use IDs (unless you're overriding something a CMS has spat out, and you can't add a class to the element). 
- One selector per line
- Put a single space before `{`
- Put a single space after `:`
- No space before `;`
- Use `;` after every declaration
- Separate rules by new lines, except when rules are nested
- Use (short) hex color codes `#000` or rgba
- Use shorthand notation where possible
- Use `//` for comments
- Use `'single quotes'` instead of `"double quotes"`
- Use `::before` and `::after`
- Put a single space after commas
- Omit the 0 when entering decimals between 0 and 1
- Omit units after 0 values
- Omit units from `line-height`
- Avoid qualifying class names with an element selector e.g. `div.primary`
- Do not use quotes in URLs
- Use 4 spaces for indentation


- Use `em` for font sizes
- Set body font size to the standard paragraph size (from the PSD), not `62.5%`
- Use the Sass `em-calc` function to set `px` font sizes that are converted to `em` once compiled


- Use `box-sizing: border-box` (globally, if possible)
- Use `%` for widths
- Use `px` for padding and margins


- Use `bottom: 100%` or `top: 100%` instead of magic numbers (e.g. `top: 177px`)


- Place 'active' classes for navigation on the `li`, not the `a`


- Nest media queries within the parent (or top level) selector

#### Declaration order
Declare styles in this order

1. Extends
2. Includes (mixins)
3. Standard rules
4. Media queries

#### <a name="example"></a>Full example
    .example,
    .example--large {
        @extend %heading;
        @include clearfix();
        border: 1px solid #000;
        color: rgba(0, 0, 0, .5);
        background: url(/assets/img/placeholder-image--example.jpg) no-repeat center;
        padding: 0; // remove padding
        font-size: em(20px);
        p {
            color: #f00;
        }
        @media-query(desktop) {
            font-size: em(22px);
        }
    }

    .example--special {
        border: 1px solid #f00;
    }

#### Nesting
Nesting should be kept to a minimum. It's fine to nest component CSS where it makes sense, but think about the compiled CSS, and only nest as deep as you'd be comfortable with if you were to write out the full selector in plain CSS.

i.e. Don't do this:

    .nav--primary {
        .nav--primary__menu {
            .nav--primary__item {
                color: red;
            }
        }
        // or
        ul {
            li {
                color: pink;
            }
        }
    }

Which compiles to the overly-specific

    .nav--primary .nav--primary__menu .nav--primary__item {
        color: red;
    }
    // or
    .nav--primary ul li {
        color: pink
    }

You wouldn't write plain CSS like that, and it would be hard to override.

Do this instead:

    .nav--primary {
        // styles
    }

    .nav--primary__menu {
        // styles   
    }

    .nav--primary__item {
        // styles
    }

Separating all components into individual partials will keep CSS grouped and easy to navigate. Looking at the compiled CSS in dev tools and trying to work out where the style is declared should no longer be a problem.

Having sensible classes on every possible element within a component allows you to avoid over-nesting, and means in many cases selectors are only a single class. This is great, and easy to override if necessary. Additionally, styling based on classes (instead of elements like `li` or `a`) means that the HTML element can change and the styling will still apply.

It may not always be possible to have that level of control, however, so you can fall back to targeting a parent class and plain HTML elements, e.g.:

    .nav--primary li {
        
    }

Writing your CSS in this way, though, will naturally result in more nested styles.