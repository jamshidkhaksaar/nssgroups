import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function getFiles(dir) {
  const subdirs = await fs.promises.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    subdirs.map((subdir) => {
      const res = path.resolve(dir, subdir.name);
      return subdir.isDirectory() ? getFiles(res) : res;
    })
  );
  return files.flat();
}

async function optimizeImages() {
  console.log('Starting in-memory image compression...');
  let totalOriginal = 0;
  let totalCompressed = 0;
  let count = 0;

  const allFiles = await getFiles('public');
  const imageFiles = allFiles.filter((f) => /\.(png|jpg|jpeg)$/i.test(f));

  for (const filePath of imageFiles) {
    const fileBuffer = await fs.promises.readFile(filePath);
    const origSize = fileBuffer.length;
    const ext = path.extname(filePath).toLowerCase();

    try {
      let pipeline = sharp(fileBuffer);
      const metadata = await pipeline.metadata();

      if (metadata.width > 1920 || metadata.height > 1920) {
        pipeline = pipeline.resize({
          width: metadata.width > metadata.height ? 1920 : undefined,
          height: metadata.height >= metadata.width ? 1920 : undefined,
          fit: 'inside',
          withoutEnlargement: true,
        });
      }

      let outBuffer;
      if (ext === '.png') {
        outBuffer = await pipeline
          .png({ quality: 82, compressionLevel: 9, palette: true })
          .toBuffer();
      } else if (ext === '.jpg' || ext === '.jpeg') {
        outBuffer = await pipeline
          .jpeg({ quality: 80, mozjpeg: true })
          .toBuffer();
      }

      if (outBuffer && outBuffer.length < origSize) {
        await fs.promises.writeFile(filePath, outBuffer);
        const saved = origSize - outBuffer.length;
        console.log(
          `✓ Compressed ${path.relative('public', filePath)}: ${(origSize / 1024 / 1024).toFixed(2)} MB → ${(outBuffer.length / 1024 / 1024).toFixed(2)} MB (-${((saved / origSize) * 100).toFixed(1)}%)`
        );
        totalOriginal += origSize;
        totalCompressed += outBuffer.length;
        count++;
      } else {
        console.log(`- Skipped ${path.relative('public', filePath)} (already optimal)`);
        totalOriginal += origSize;
        totalCompressed += origSize;
      }
    } catch (err) {
      console.error(`Error compressing ${filePath}:`, err.message);
      totalOriginal += origSize;
      totalCompressed += origSize;
    }
  }

  console.log('\n===================================');
  console.log(`Compressed ${count} images!`);
  console.log(`Original total: ${(totalOriginal / 1024 / 1024).toFixed(2)} MB`);
  console.log(`New total: ${(totalCompressed / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Saved: ${((totalOriginal - totalCompressed) / 1024 / 1024).toFixed(2)} MB (-${(((totalOriginal - totalCompressed) / totalOriginal) * 100).toFixed(1)}%)`);
  console.log('===================================\n');
}

optimizeImages();
