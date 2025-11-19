const Contact = require('../models/Contact');
const AppError = require('../utils/errorHandler');
const { createContactSchema, updateContactSchema, addActivitySchema } = require('../validators/contactValidator');

class ContactController {
    static async create(req, res, next) {
        try {
            const { error, value } = createContactSchema.validate(req.body);
            if (error) throw new AppError(error.details[0].message, 400);

            const owner = req.user ? req.user.id : undefined;
            const contact = new Contact({ ...value, owner });
            await contact.save();

            res.status(201).json(contact);
        } catch (err) {
            next(err);
        }
    }

    static async list(req, res, next) {
        try {
            let query = {};

            if (req.user && req.user.id) {
                query = { owner: req.user.id };
            } else {
                query = { owner: null };
            }

            const contacts = await Contact.find(query).sort({ updatedAt: -1 })

            res.json(contacts);
        } catch (err) {
            next(err);
        }
    }

    static async get(req, res, next) {
        try {
            const owner = req.user ? req.user.id : undefined;
            const contact = await Contact.findById(req.params.id);
            if (!contact) throw new AppError('Contact not found', 404);
            if (owner && String(contact.owner) !== String(owner)) throw new AppError('Not authorized', 403);
            res.json(contact);
        } catch (err) {
            next(err);
        }
    }

    static async update(req, res, next) {
        try {
            const { error, value } = updateContactSchema.validate(req.body);
            if (error) throw new AppError(error.details[0].message, 400);

            const contact = await Contact.findById(req.params.id);
            if (!contact) throw new AppError('Contact not found', 404);
            const owner = req.user ? req.user.id : undefined;
            if (owner && String(contact.owner) !== String(owner)) throw new AppError('Not authorized', 403);

            Object.assign(contact, value);
            await contact.save();
            res.json(contact);
        } catch (err) {
            next(err);
        }
    }

    static async addActivity(req, res, next) {
        try {
            const { error, value } = addActivitySchema.validate(req.body);
            if (error) throw new AppError(error.details[0].message, 400);

            const contact = await Contact.findById(req.params.id);
            if (!contact) throw new AppError('Contact not found', 404);
            const owner = req.user ? req.user.id : undefined;
            if (owner && String(contact.owner) !== String(owner)) throw new AppError('Not authorized', 403);

            contact.activities.push({
                type: value.type,
                notes: value.notes,
                timestamp: value.timestamp || Date.now()
            });
            await contact.save();
            res.json(contact);
        } catch (err) {
            next(err);
        }
    }

    static async search(req, res, next) {
        try {
            const q = req.query.q || '';
            const owner = req.user ? req.user.id : undefined;
            const results = await Contact.search(q, owner);
            res.json(results);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = ContactController;