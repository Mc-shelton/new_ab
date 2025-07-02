import * as ftp from "basic-ftp";
import fs from "fs";
import path from "path";
import Logger from "../../startup/logger";

type ftpIType = {
  remoteFileName: string;
  remoteFolder: string;
  localPath: string;
};
const logger = new Logger('FTP Loader')
/**
 * Upload a file to an FTP server
 * @param {string} host - FTP server hostname
 * @param {string} user - FTP username
 * @param {string} password - FTP password
 * @param {string} localFilePath - Path to the local file
 * @param {string} remoteFolder - Path on the FTP server to upload to
 */
async function uploadToFtp(input: ftpIType) {
  const { localPath, remoteFileName, remoteFolder } = input;
  const host = "adventband.org";
  const user = "bucket@adventband.org";
  const password = "mAjiMot00";
  const client = new ftp.Client();
  client.ftp.verbose = false;

  try {
    await client.access({
      host,
      user,
      password,
      secure: false, 
    });

    const remotePath = path.posix.join(remoteFolder, remoteFileName);

    logger.genLog(`Uploading ${remoteFileName} to ${host}${remoteFolder}...`);
    await client.uploadFrom(localPath, remotePath);
    logger.genLog("Upload complete");

    return {
      success: true,
      url: `ftp://${host}${remotePath}`,
    };
  } catch (err: any) {
    console.error("FTP upload failed:", err.message);
    return {
      success: false,
      error: err.message,
    };
  } finally {
    client.close();
  }
}

export { uploadToFtp };
