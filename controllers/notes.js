const notesRouter = require('express').Router()
const Note = require('../models/note')

notesRouter.get('/', async (request, response) => {
  await Note.find({}).then(notes => {
    response.json(notes)
  })
})

notesRouter.get('/:id', async (request, response, next) => {
  /*Note.findById(request.params.id)
    .then(note => {
      if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))*/

    try {
      const note = await Note.findById(request.params.id)
      if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
    } catch(exception) {
      next(exception)
    }
})

notesRouter.post('/', async (request, response, next) => {
  const body = request.body

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  /*note.save()
    .then(savedNote => {
      response.status(201).json(savedNote)
    })
    .catch(error => next(error))*/
    try {
      const savedNote = await note.save();
      response.status(201).json(savedNote)
    } catch (exception) {
      next(exception)
    }
})

notesRouter.delete('/:id', async (request, response, next) => {
  /*Note.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))*/
    try {
      await Note.findByIdAndDelete(request.params.id)
      response.status(204).end()
    } catch(exception) {
      next(exception)
    }
})

notesRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const note = {
    content: body.content,
    important: body.important,
  }

  /*Note.findByIdAndUpdate(request.params.id, note, { new: true })
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => next(error))*/
  try {
    const updatedNote = await Note.findByIdAndUpdate(request.params.id, note, {new: true});
    response.status(200).json(updatedNote);
  } catch (exception){
    next(exception)
  }
})

module.exports = notesRouter