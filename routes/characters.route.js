const router = require('express').Router()
const { findByIdAndUpdate } = require('../models/Character.model')
const Character = require('../models/Character.model')

/**
 * !All the routes here are prefixed with /api/characters
 */

/**
 * ? This route should respond with all the characters
 */
router.get('/', async (req, res, next) => {
	/**Your code goes here */
	try {
		const allCharacter = await Character.find()
		res.status(200).json(allCharacter)
	} catch (error) {
		next(error)
	}
})

/**
 * ? This route should create one character and respond with
 * ? the created character
 */
router.post('/character', async (req, res, next) => {
	/**Your code goes here */
	try {
		const { name, occupation, cartoon, weapon } = req.body;
		const createdCharacter = await Character.create({ name, occupation, cartoon, weapon })
		res.status(200).json(createdCharacter)
	} catch (error) {
		next(error)
	}
})

/**
 * ? This route should respond with one character
 */
router.get('/character/:id', async (req, res, next) => {
	try {
		const oneCharacter = await Character.findById(req.params.id);
		res.json(oneCharacter)
	} catch (error) {
		next(error)
	}
})
/**Your code goes here */


/**
 * ? This route should update a character and respond with
 * ? the updated character
 */
router.patch("/:id", async (req, res, next) => {
	/**Your code goes here */
	const { id } = req.params;
	const characterUpdate = { ...req.body };
	try {
		if (!characterUpdate) {
			res.json({ errorMessage: "Character not found" });
			const characterActuallyUpdated = await Character.findByIdAndUpdate(
				characterUpdate,
				id,
				{ new: true }
			);
			res.json(characterActuallyUpdated);
		}
	} catch (error) {
		next(error);
	}
});

/**Your code goes here */




/**
 * ? Should delete a character and respond with a success or
 * ? error message
 */
router.delete('/:id', async (req, res, next) => {
	const { id } = req.params;
	try {
		await Character.findByIdAndDelete(id)
		res.json({ message: `Character with id: ${id} was deleted` })
	} catch (error) {
		next(error)
	}
})
/**Your code goes here */

module.exports = router
