import path from 'path'
import ffmpeg from 'fluent-ffmpeg'
function convertMp4ToMp3(inputPath:string, outputPath:string) {
  return new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .toFormat('mp3')
      .on('error', (err) => {
        console.error('Error: ' + err.message);
        reject(err);
      })
      .on('end', () => {
        console.log('Conversion finished!');
        resolve(outputPath);
      })
      .save(outputPath);
  });
}

const inputVideo = path.join(__dirname, 'a_major.mp4');
const outputAudio = path.join(__dirname, 'a_major.mp3');
console.log(inputVideo, outputAudio)
convertMp4ToMp3(inputVideo, outputAudio)
  .then(() => console.log('MP3 file created at:', outputAudio))
  .catch((err) => console.error('Conversion failed:', err));
console.log("all that happened")