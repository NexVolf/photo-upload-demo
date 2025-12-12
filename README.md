# PhotoGallery

A modern, clean, and responsive photo upload application. Upload your favorite moments, view them in a beautiful grid, and click to see details in a stunning preview mode.

## Features

- **Modern UI/UX**: Clean interface with a focus on aesthetics and usability.
- **Photo Upload**: Easily upload photos with date and description.
- **Gallery View**: View all your uploaded photos in a responsive grid.
- **Preview Mode**: Click on any photo to view it in full size with details.
- **Smart Layout**: The preview page adapts to the image orientation, featuring a blurred background for portrait images to ensure a polished look.

## Technologies Used

- **Frontend**: HTML5, CSS3 (Modern features like Grid, Flexbox, Variables), JavaScript (Vanilla)
- **Backend**: Node.js, Express
- **Storage**: Local file system (uploads directory)

## Setup & Running

1.  **Clone the repository** (or download the source code).
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Start the server**:
    ```bash
    node server.js
    ```
4.  **Open in Browser**:
    Navigate to `http://localhost:3000`

## Project Structure

- `public/`: Contains frontend files (HTML, CSS, JS).
- `uploads/`: Stores uploaded images.
- `server.js`: Express server handling uploads and serving files.
