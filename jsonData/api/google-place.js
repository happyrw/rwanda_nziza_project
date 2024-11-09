// // pages/api/google-place.js

// import fs from 'fs';
// import path from 'path';

// export default async function handler(req, res) {
//     const { query, location, radius } = req.query;

//     // Check if the required query params are available
//     if (!query || !location || !radius) {
//         return res.status(400).json({ error: "Missing required parameters" });
//     }

//     try {
//         // Path to the JSON file
//         const filePath = path.join(process.cwd(), 'data', 'places.json');

//         // Read the JSON file
//         const fileContent = fs.readFileSync(filePath, 'utf8');
//         const placesData = JSON.parse(fileContent); // Assuming the JSON contains places data

//         // Here you can filter or process the data as needed based on query parameters
//         const filteredPlaces = placesData.filter(place =>
//             place.name.toLowerCase().includes(query.toLowerCase())
//         );

//         // Send the filtered data as a response
//         res.status(200).json({ results: filteredPlaces });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }
