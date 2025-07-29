import fs from 'fs';
import path from 'path';
import unzip from 'unzipper';

async function merge(zipFolder) {
    const output = fs.createWriteStream('merged.csv', { flags: 'a' });
    const files = fs.readdirSync(zipFolder).filter(f => f.endsWith('.zip'));

    let content, zippath, zip, csv;
    for (const file of files) {
        zippath = path.join(zipFolder, file);
        zip = await unzip.Open.file(zippath);
        csv = zip.files.find(f => f.path.endsWith('.csv'));

        if (!csv) continue;
        
        content = await csv.buffer();
        output.write(content.toString());
    }

    output.end();
}

let datapath = './data';