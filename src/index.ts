const VIDEO_ID = 'some-video-id';
const THUMBNAILS_BY_MILESTONE = Object.fromEntries(
    Array.from({ length: 10 }, (_, i) => {
        const level = (i + 1) * 1000;
        return [level, `${i + 1}.png`];
    }),
);

function getViewCount(): number {
    if (YouTube.Videos === undefined) {
        Logger.log('YouTube API is not available.');
        return 0;
    }

    const { items } = YouTube.Videos.list('statistics', { id: VIDEO_ID });

    if (!items || items.length === 0) {
        Logger.log(`No items found for video ID: ${VIDEO_ID}`);
        return 0;
    }

    if (!items[0].statistics) {
        Logger.log(`No statistics found for video ID: ${VIDEO_ID}`);
        return 0;
    }

    return Number(items[0].statistics.viewCount);
}

function getImageBlobFromDrive(fileName: string): GoogleAppsScript.Base.Blob {
    const file = DriveApp.getFilesByName(fileName).next();

    return file.getBlob();
}

function updateThumbnail(url: string): void {
    if (YouTube.Thumbnails === undefined) {
        Logger.log('YouTube API is not available.');
        return;
    }

    const blob = getImageBlobFromDrive(url);
    if (!blob) {
        Logger.log(`Blob not found for ${url}`);
        return;
    }

    YouTube.Thumbnails.set(VIDEO_ID, blob);

    Logger.log(`Thumbnail updated to ${url}`);
}

function getNextMilestone(
    currentViews: number,
    lastMilestone: number,
): number | undefined {
    const milestones = Object.keys(THUMBNAILS_BY_MILESTONE)
        .map(Number)
        .sort((a, b) => a - b);

    const milestone = milestones.find(
        (milestone) => currentViews >= milestone && milestone > lastMilestone,
    );

    if (milestone) {
        return milestone;
    }

    return;
}

function checkAndUpdateThumbnail(): void {
    const props = PropertiesService.getScriptProperties();
    const lastMilestone = parseInt(
        props.getProperty('lastMilestone') || '0',
        10,
    );
    Logger.log(`Last milestone: ${lastMilestone}`);
    const currentViews = getViewCount();

    const nextMilestone = getNextMilestone(currentViews, lastMilestone);
    if (nextMilestone === undefined) {
        Logger.log(`No new milestone. Views: ${currentViews}`);
        return;
    }

    const fileName = THUMBNAILS_BY_MILESTONE[nextMilestone];
    if (!fileName) {
        Logger.log(
            `No thumbnail image defined for milestone ${nextMilestone}. This should not happen.`,
        );
        return;
    }

    updateThumbnail(fileName);
    props.setProperty('lastMilestone', nextMilestone.toString());
    Logger.log(`Thumbnail updated to level ${nextMilestone}`);
}

checkAndUpdateThumbnail();
