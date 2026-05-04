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
```

## How To Update Content

Edit `data.json` to update the business name, tagline, phone number, address, Instagram link, services, founder details, and gallery images.

You do not need to edit `index.html`, `style.css`, or `script.js` for normal content changes.

## Where To Add Images

Place all website images inside the `images/` folder.

Recommended file names:

- `images/hero.jpg` for the full-screen hero background
- `images/founder.jpg` for Jyothi Yarramilli's founder photo
- `images/sample1.jpg`, `images/sample2.jpg`, `images/sample3.jpg` for gallery images

After adding a new gallery image, add it to `data.json` like this:

```json
{
  "src": "images/sample3.jpg",
  "alt": "Maggam work blouse design"
}
```

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
