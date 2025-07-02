const axios = require('axios');
const mm = require('music-metadata');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

function formatDuration(seconds) {
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (hours > 0) {
        return `${hours}hr${hours > 1 ? 's' : ''} ${remainingMinutes}min${remainingMinutes > 1 ? 's' : ''}`;
    } else {
    }
}

async function processMp3s(inputFile, outputFile) {
    const mp3List = JSON.parse(fs.readFileSync(inputFile, 'utf8'));
    const result = [];

    for (const mp3 of mp3List) {
        try {
            console.log(`Fetching: ${mp3.file_link}`);
            const response = await axios.get(mp3.file_link, { responseType: 'arraybuffer' });
            const metadata = await mm.parseBuffer(response.data, 'audio/mpeg');

            const durationFormatted = formatDuration(metadata.format.duration);

            result.push({
                id: uuidv4(),
                file_link: mp3.file_link,
                title: mp3.title,
                preacher: mp3.preacher,
                duration: durationFormatted
            });

        } catch (error) {
            console.error(`❌ Failed to process ${mp3.file_link}:`, error.message);
        }
    }

    fs.writeFileSync(outputFile, JSON.stringify(result, null, 2));
    console.log(`✅ Finished. Output saved to ${outputFile}`);
}

// Usage:
processMp3s('sermons.json', 'output_with_durations.json');
