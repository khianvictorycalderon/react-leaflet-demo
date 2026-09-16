# React Leaflet Demo
An open source map API library.

## Preview
![Preview](preview.png)

## Setup Installation:
1. Run `npm install`
2. Create an `.env` file that contains:
    ```env
    VITE_LEAFLET_API_KEY=<your-carto-api-key>
    ```
2. Run `npm run dev`

---

## Prerequisites
- NodeJS

---

## Dependencies & Configuration
The following is a list of installed dependencies and configuration settings used in this project.
You don’t need to install anything manually, as all dependencies are already managed through `package.json`.
This section is provided for reference only, to give you insight into how the project was set up.

## Dependencies
- `npm install tailwindcss @tailwindcss/vite leaflet react-leaflet`
- `npm install @types/leaflet --save-dev`

## Configuration Dependencies
- Update `vite.config.ts`:
  ```ts
  import tailwindcss from '@tailwindcss/vite'

  export default defineConfig({
    plugins: [
      tailwindcss(),
    ],
  })
  ```