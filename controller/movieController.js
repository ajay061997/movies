const fs = require('fs');
const { promisify } = require('util');
const { randomBytes } = require('crypto');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

exports.getAllMovies = async (req, res) => {
    try {
        const data = await readFile('sample.json', 'utf8');

        res.status(200).send(JSON.parse(data))
    } catch (error) {
        res.send(error)
    }

}

exports.addMovie = async (req, res) => {
    try {
        const data = await readFile('sample.json', 'utf8');
        const data2 = JSON.parse(data);

        const movieData = data2;

        if (movieData.length > 0) {
            movieData.map(e => {
                if (e.Title == req.body.Title) {
                    return res.status(400).json({
                        status: false,
                        message: "movie Title already exits"
                    })
                }
            })
        }

        data2.push(req.body)

        await writeFile('sample.json', JSON.stringify(data2), 'utf8');

        return res.status(201).json({
            status: true,
            message: "Data added successfully"
        });
    } catch (error) {
        console.log(error)
    }
}


exports.getOneMovie = async (req, res) => {
    try {
        const { Title } = req.body;

        const data = await readFile('sample.json', 'utf8');
        const data2 = JSON.parse(data);

        const movieData = data2;

        movieData.map(e => {
            if (e.Title == req.body.Title) {
                return res.status(200).json({
                    status: true,
                    message: "Data fetched successfully",
                    data: [e]
                })
            } else {
                return res.status(400).json({
                    status: false,
                    message: "No data found"
                })
            }
        })

    } catch (error) {
        res.send(error)
    }
}

exports.updatedOneMovie = async (req, res) => {
    try {
        const { Title } = req.body;

        const data = await readFile('sample.json', 'utf8');
        const data2 = JSON.parse(data);

        let movieData = data2;

        let movieIndex = movieData.findIndex((obj => obj.Title == Title));

        if (!movieData) {
            return res.status(400).json({
                status: false,
                message: "No data found"
            })
        }

        movieData[movieIndex] = req.body

        await writeFile('sample.json', JSON.stringify(movieData), 'utf8');

        res.status(200).json({
            status: true,
            message: "Data updated success"
        })

    } catch (error) {
        res.send(error)
    }
}

exports.deleteOneMovie = async (req, res) => {
    try {
        const { Title } = req.body;

        const data = await readFile('sample.json', 'utf8');
        const data2 = JSON.parse(data);

        const movieData = data2.data;

        const filteredData = movieData.filter((movie) => movie.Title != Title);

        await writeFile('sample.json', JSON.stringify(filteredData), 'utf8');

        res.status(200).json({
            status: true,
            message: "Data deleted success"
        })

    } catch (error) {
        res.send(error)
    }
}

