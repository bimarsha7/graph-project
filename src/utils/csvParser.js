import Papa from 'papaparse';

const URL = process.env.PUBLIC_URL || 'http://localhost:3000'
const CSV_FILE_PATH = `${URL}/CompressorMap_data.csv`;
export const csvData = [];

/*
** Loads the csv using the fetch through PUBLIC_URL
*/
export const loadCSV = async () => {
  const response = await fetch(CSV_FILE_PATH);
  const csvText = await response.text();
  // return the promise handler to process csv asynchronously
  return new Promise((resolve, reject) => {
    Papa.parse(csvText, {
      header: true,
      delimiter: ',',
      skipEmptyLines: true,
      complete: (results) => {
        resolve(results.data);
      },
      error: (error) => reject(error),
    })
  });
};
