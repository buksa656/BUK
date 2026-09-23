# FlowForma Email Template Editor V3.1

A static, client-side editor for FlowForma HTML email templates. Designed to run on GitHub Pages or any static web server.

## V3.1 changes

- No PHP and no server-side API.
- Works as a fully static GitHub Pages site.
- **Save Draft** stores the current template in the browser's local storage.
- **Reset** restores the original template file and removes the local draft.
- **Download HTML** exports the current template as an `.html` file.
- **Copy HTML** copies the current HTML to the clipboard.
- Visual editor and HTML source remain synchronized.
- Desktop/mobile preview.
- Basic formatting toolbar, links, undo/redo.
- FlowForma `fftoken` elements are protected in the visual editor.
- Token insertion clones a valid token already present in the current template rather than inventing token markup.
- Includes all 22 HTML templates supplied in the V3.0 package.

## GitHub Pages setup

1. Create a GitHub repository, preferably **private** if the templates contain internal/company information.
2. Upload the contents of this folder to the repository root.
3. In GitHub open **Settings → Pages**.
4. Under **Build and deployment**, select **Deploy from a branch**.
5. Select the branch containing these files (normally `main`) and folder `/ (root)`.
6. Save. GitHub will publish the site at the Pages URL shown there.

The repository must contain `index.html` at the published root. `.nojekyll` is included so GitHub Pages serves the files as-is.

## Adding templates

Put additional HTML files in `templates/` and add an entry to `templates.json`, for example:

```json
[
  {
    "id": "action-assigned",
    "name": "Action Assigned",
    "file": "templates/action-assigned.html"
  },
  {
    "id": "another-template",
    "name": "Another Template",
    "file": "templates/another-template.html"
  }
]
```

## Important: FlowForma tokens

Keep existing FlowForma token `<img class="fftoken" ...>` elements intact. The editor protects them in visual mode, but the HTML source view is intentionally editable, so users can still change markup manually.

The `[FormLink]` placeholder is treated as text.

## Important: browser drafts

**Save Draft** does not modify GitHub or any server file. It stores the current HTML in the browser's local storage on the device/browser being used. Use **Download HTML** if you need an actual file.

## Logo / external assets

The supplied template currently references the AC Immune logo using a FlowForma/SharePoint-style absolute path. On GitHub Pages that path may not resolve. For a self-contained preview, place a permitted copy of the logo in `assets/` and change the template image `src` to a relative path such as `assets/logo.jpg`.

## Security / confidentiality

GitHub Pages is hosting the static application and the template files. If the repository is public, the template HTML and embedded FlowForma token data may be publicly accessible. Use a private repository if the templates are company-confidential, subject to your organization's GitHub policy.

No credentials or server-side write endpoint are included in V3.
