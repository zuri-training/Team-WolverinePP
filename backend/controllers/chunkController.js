const chunkModel = require('../models/chunkSchema');
const fs = require('fs');
const csv = require('csv-parser');
const fastcsv = require('fast-csv');

exports.createList = async() => {
    const processedJson = [];
    const csvToJsonParsing = new Promise(function(resolve, reject) {
        fs.createReadStream('trades.csv')
            .pipe(csv({separator: ','}))
            .on('data', (data) => {
                processedJson.push(data);
            })
            .on('end', () => {
                resolve();
            });
    });

await csvToJsonParsing;
    return processedJson;
}

    exports.fileSplitter = async(processedJson) => {
    console.log('Splitting original file...');
    let startingPoint = 0;
    let linesWritten = 0;
    const chunkSize = 5000;
    console.log(processedJson.length);

   // this represents the number of files the original file will be broken into
    numChunks = Math.ceil(processedJson.length/chunkSize);

 for (let i = 0; i < numChunks; i++) {
        if (linesWritten >= processedJson.length) {
            break;
        }

        // the data that will get written into the current smaller file
        const jsonChunk = [];

    for (let j = startingPoint; j < startingPoint + chunkSize; j++) {
            jsonChunk.push(processedJson[j]);
            if (j < processedJson.length) {
                linesWritten++;
                // if we've reached the chunk increment, increase the starting point to the next increment
                if (j == startingPoint + chunkSize - 1) {
                    startingPoint = j + 1;

        // file chunk to be written
                    const writeStream = await fs.createWriteStream('file-'+ i +'.csv');
                    const options = {headers: true};
                    const generateCsv = fastcsv.write(jsonChunk, options);
                    generateCsv.pipe(writeStream);
                    const jsonToCsv = new Promise(function(resolve, reject) {
                        generateCsv
                            .on('error', function(err) {
                                reject(err);
                            })
                            .on('end', function() {
                                resolve();
                            });
                    });
                    await jsonToCsv;
                    break;
                }
            }
        }
    }
    console.log('File split complete ...');
}
                    
exports.split = async() => {
    console.log('**** FILE SPLITTER ****');

    // get JSON Array of all lines in original file
    const fileLines = await createList();

    // split into multiple smaller files with original list of lines
    await fileSplitter(fileLines);

    console.log('**** FILE SPLITTER COMPLETE ****');
}

split();


















