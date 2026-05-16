# Paste Pal

Paste Pal is a lightweight React + Vite application for creating, editing, viewing, searching, copying, sharing, and deleting text snippets. It stores paste data in browser localStorage, so you can manage your own notes and snippets without a backend.

## Features

- Create and save new text snippets with titles
- Edit existing pastes directly from the home screen
- Search saved pastes by title
- View each paste on its own details page
- Copy paste content to clipboard
- Share paste content using the Web Share API or clipboard fallback
- Delete pastes and keep the list synced in localStorage

## Tech stack

- React 19
- Vite
- Redux Toolkit
- React Router DOM
- Tailwind CSS
- react-hot-toast

## Project structure

- `src/App.jsx` — app routes and navigation
- `src/components/Home.jsx` — create/update paste form
- `src/components/Paste.jsx` — paste list, search, and actions
- `src/components/ViewPaste.jsx` — read-only paste detail view
- `src/redux/pasteSlice.js` — paste state, localStorage persistence, and toast notifications

## Getting started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Notes

- Pastes are saved in the browser's `localStorage` under the key `pastes`
- The app uses client-side routing with `/` for home and `/pastes` for the paste list
- Individual paste details are available at `/pastes/:id`
