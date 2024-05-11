const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('not enough arguments, please provide the password as an argument: node mongo.js <password> <name> <number>')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://miguelgutierrezcn:${password}@cluster0.qxxwpep.mongodb.net/testNoteApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
  content: "Nota de prueba para entorno test",
  important: true
})

note.save().then(result => {
  console.log('note saved!')
  console.log(result)
  mongoose.connection.close()
})

/*Note.find({important: true}).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})*/