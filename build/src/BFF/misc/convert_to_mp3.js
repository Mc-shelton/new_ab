"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fluent_ffmpeg_1 = __importDefault(require("fluent-ffmpeg"));
function convertMp4ToMp3(inputPath, outputPath) {
    return new Promise((resolve, reject) => {
        (0, fluent_ffmpeg_1.default)(inputPath)
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
const inputVideo = path_1.default.join(__dirname, 'a_major.mp4');
const outputAudio = path_1.default.join(__dirname, 'a_major.mp3');
console.log(inputVideo, outputAudio);
convertMp4ToMp3(inputVideo, outputAudio)
    .then(() => console.log('MP3 file created at:', outputAudio))
    .catch((err) => console.error('Conversion failed:', err));
console.log("all that happened");
