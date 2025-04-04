# YouTube Thumbnail Automator

Automatically updates a YouTube video's thumbnail based on view count milestones using Google Apps Script.

Originally developed for a youtube video for my channel. Here's the video: https://www.youtube.com/watch?v=1rfAGjxN29U


## 🛠 Setup

1. **Install dependencies**
   ```bash
   npm install

2. **Develop your script**
   Edit the logic in `src/index.ts`.

3. **Bundle the script**
   ```bash
   npm run build
   ```

4. **Upload images**
   Upload your thumbnail images to Google Drive.

5. **Push to Google Apps Script**
   Use [Clasp](https://github.com/google/clasp) to deploy:
   ```bash
   npx clasp push
   ```

6. **Set up Triggers**
   Use the Apps Script UI to create a trigger for `checkAndUpdateThumbnail`.
