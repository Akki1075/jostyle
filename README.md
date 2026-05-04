# JO'STYLE Static Website

Premium static business website for JO'STYLE, built with only HTML, CSS, JavaScript, and one editable `data.json` file.

## Folder Structure

```text
JO'STYLE/
  index.html
  style.css
  script.js
  data.json
  favicon.ico
  images/
    hero.jpg
    founder.jpg
    sample1.jpg
    sample2.jpg
    sarees/
      silk-1.jpg
      silk-2.jpg
      cotton-1.jpg
      cotton-2.jpg
      designer-1.jpg
      designer-2.jpg
```

## How To Update Content

Edit `data.json` to update the business name, tagline, phone number, address, Instagram link, services, founder details, gallery images, and saree sales content.

You do not need to edit `index.html`, `style.css`, or `script.js` for normal content changes.

## Where To Add Images

Place all website images inside the `images/` folder.

Recommended file names:

- `images/hero.jpg` for the full-screen hero background
- `images/founder.jpg` for Jyothi Yarramilli's founder photo
- `images/sample1.jpg`, `images/sample2.jpg`, `images/sample3.jpg` for gallery images
- `images/sarees/silk-1.jpg`, `images/sarees/silk-2.jpg` for silk saree examples
- `images/sarees/cotton-1.jpg`, `images/sarees/cotton-2.jpg` for cotton saree examples
- `images/sarees/designer-1.jpg`, `images/sarees/designer-2.jpg` for designer saree examples

After adding a new gallery image, add it to `data.json` like this:

```json
{
  "src": "images/sample3.jpg",
  "alt": "Maggam work blouse design"
}
```

## How To Update Saree Sales

The Saree Sales page is `sarees.html`. It is linked from the main website navbar and hero button.

To replace saree photos:

1. Open the `images/sarees/` folder.
2. Replace any file with a new photo using the same file name, for example replace `silk-1.jpg` with a new silk saree photo named exactly `silk-1.jpg`.
3. Commit and push the changed image.

To add a new saree type, edit the `sareeSales.types` list in `data.json`:

```json
{
  "name": "Fancy Sarees",
  "description": "Fancy sarees for parties and small functions.",
  "priceNote": "Contact for latest stock and pricing",
  "images": [
    {
      "src": "images/sarees/fancy-1.jpg",
      "alt": "Fancy saree example 1"
    },
    {
      "src": "images/sarees/fancy-2.jpg",
      "alt": "Fancy saree example 2"
    }
  ]
}
```

Then add the matching files:

```text
images/sarees/fancy-1.jpg
images/sarees/fancy-2.jpg
```

Each saree type automatically scrolls through its images and also has manual `Prev` and `Next` buttons. The WhatsApp button automatically includes the selected saree type name.

## How To Preview Locally

Because this site uses `fetch("data.json")`, preview it through a local server instead of double-clicking `index.html`.

Run:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Deploy To GitHub Pages

1. Create a GitHub repository, for example `jostyle`.
2. Upload all files and folders from this project into the repository.
3. Go to the repository on GitHub.
4. Open `Settings`.
5. Open `Pages`.
6. Under `Build and deployment`, choose `Deploy from a branch`.
7. Select branch `main` and folder `/root`.
8. Click `Save`.
9. GitHub will show the live website URL after the first deployment finishes.

Your site will usually be available at:

```text
https://YOUR-GITHUB-USERNAME.github.io/jostyle/
```
