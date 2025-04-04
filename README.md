Automatically updates a YouTube video's thumbnail based on view count milestones using Google Apps Script.

Originally developed for a youtube video for my channel. Here's the video: https://www.youtube.com/watch?v=1rfAGjxN29U


## 🛠 Setup

1. **Clone the repo**
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   ```

2. **Install dependencies**
   ```bash
   npm install

3. **Bundle the script**
   ```bash
   npm run build
   ```

4. **Push to Google Apps Script**
   Use [Clasp](https://github.com/google/clasp) to deploy:
   ```bash
   npx clasp push
   ```

5. **Set up Triggers**
   Use the Apps Script UI to create a trigger for `checkAndUpdateThumbnail`.
