# Image licences

Every photo in `site/assets/img/` is listed here with where it came from and
under what licence. Nothing on the site loads an image from anywhere else:
these are files in this repository, served from nordverify.com, which is the
same rule the third-party check in core/test_income_site.py enforces.

All of them are **CC0**, which places them in the public domain worldwide. No
attribution is legally required, and none is printed on the pages. This file
exists anyway, because being able to prove where a picture came from is
worth more than the two minutes it took to write down.

Source metadata was read from the Wikimedia Commons API on 19 August 2026,
not copied from a search page: the licence field below is the one the API
returned for that exact file.

## workspace-window.jpg

- **Used for:** the front page, beside the section about writing directly to the person doing the work
- **Commons title:** Winter Workspace 2 (Unsplash).jpg
- **Author:** Norbert Levajsics levajsics
- **Licence:** CC0 (http://creativecommons.org/publicdomain/zero/1.0/deed.en)
- **Source:** https://commons.wikimedia.org/wiki/File:Winter_Workspace_2_(Unsplash).jpg
- **In this repo:** `site/assets/img/workspace-window.jpg`, 1400x933, 73 kB, re-encoded and stripped of metadata

## green-bicycle.jpg

- **Used for:** the website refresh demo, the rebuilt page's own hero
- **Commons title:** Green bicycle leaning on the wall.jpg
- **Author:** www.Pixel.la Free Stock Photos
- **Licence:** CC0 (http://creativecommons.org/publicdomain/zero/1.0/deed.en)
- **Source:** https://commons.wikimedia.org/wiki/File:Green_bicycle_leaning_on_the_wall.jpg
- **In this repo:** `site/assets/img/green-bicycle.jpg`, 1400x934, 214 kB, re-encoded and stripped of metadata

## bike-rainy-street.jpg

- **Used for:** the website refresh demo, the quiet band under the comparison
- **Commons title:** Bike on rainy street (Unsplash).jpg
- **Author:** ORNELLA BINNI ornellabinni
- **Licence:** CC0 (http://creativecommons.org/publicdomain/zero/1.0/deed.en)
- **Source:** https://commons.wikimedia.org/wiki/File:Bike_on_rainy_street_(Unsplash).jpg
- **In this repo:** `site/assets/img/bike-rainy-street.jpg`, 1200x1800, 222 kB, re-encoded and stripped of metadata

## What these photographs are, and are not

The desk is a photograph of a desk. The two bicycle pictures belong to the
website refresh demo, where the thing being shown is a website for a made-up
bicycle shop, so a bicycle is the subject rather than a decoration.

None of them is a customer, my premises or my work, and no caption on the
site says otherwise.

## Typefaces

Both are self-hosted as woff2 files in `site/assets/fonts/`. No page on this
site requests a font from Google, Adobe or anywhere else: the @font-face
rules point at these files and nothing more.

### Fraunces, used for headings

- **Files:** `fraunces-400.woff2`, `fraunces-600.woff2` (latin subset)
- **Licence:** SIL Open Font License 1.1, copied verbatim to `OFL-Fraunces.txt`
- **Copyright:** 2018 The Fraunces Project Authors, https://github.com/undercasetype/Fraunces
- **Why:** it has a face. Inter, the system sans and the usual grotesques are
  what a page defaults to when nobody chose, and a page that sells design
  cannot look like nobody chose.

### Public Sans, used for body text

- **Files:** `publicsans-400.woff2`, `publicsans-600.woff2` (latin subset)
- **Licence:** SIL Open Font License 1.1, copied verbatim to `OFL-PublicSans.txt`
- **Copyright:** US Web Design System, a fork of Libre Franklin
- **Why:** running text should be quiet. The character belongs in the headings.

## Removed 19 August, and why

Five photographs were taken out again the same evening they went in: a cafe
corner, a workbench of tools, a timber workshop, a bright yellow shop front,
and a bike shop facade.

They were all correctly licensed and all correctly credited, and that was not
the problem. On a page whose whole argument is that it invents no customers,
a photograph of somebody else's shop reads as a customer, or as my premises.
It is neither. The licence made them legal to use; it did not make them true
here, and a picture that has to be explained is doing damage rather than work.

What is left is one photograph of a desk, which claims nothing, and the
demo's own pictures, which are pictures of the thing being demonstrated.
The rest of the page is carried by type, space and colour, which is how the
sites worth copying carry theirs.
