# Elias Getaneh — Portfolio Pro V4

A responsive personal driver portfolio built with React 19, Vite, JavaScript, CSS3, and Lucide icons.

## Start locally
1. Install Node.js 20+.
2. Open this folder in a terminal.
3. Run `npm install`.
4. Run `npm run dev` and open the address shown.
5. Run `npm run build` to create the production `dist/` folder.

## Publish
Upload the `dist/` folder to Netlify or deploy the repository to Vercel. Configure your own domain if desired.

## Personalize
Click the gear icon to edit your profile in the browser. These edits are stored in that browser's localStorage **only** and do not change your deployed site. For permanent public updates, edit the `defaults` object in `src/main.jsx`, then rebuild and redeploy. Add public phone, email, WhatsApp, CV URL, and a hosted photo URL when ready. Use only a general public location, not your precise residential address.

## Notes
- The car is an original vector illustration, not an external stock photo.
- Google Fonts require an internet connection; system fonts are used as fallback.
- No backend is included; this is a static portfolio. There is no contact-form server or database.
- The experience figure is an editable draft; verify it against your CV before publishing.
- Sharing uses the browser's share sheet when available, otherwise attempts to copy the URL.
