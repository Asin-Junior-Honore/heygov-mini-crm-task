const mongoose = require('mongoose');


const activitySchema = new mongoose.Schema({
    type: { type: String, enum: ['call', 'email', 'meeting', 'note'], default: 'note' },
    notes: String,
    timestamp: { type: Date, default: Date.now }
});


const contactSchema = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    name: { type: String, index: true, default: '' },
    email: { type: String, index: true, default: '' },
    phone: { type: String, default: '' },
    notes: { type: String, default: '' },
    activities: { type: [activitySchema], default: [] },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});



contactSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});


// Static search helper
contactSchema.statics.search = async function (q, owner) {
    const criteria = [];
    if (!q) return this.find(owner ? { owner } : {}).sort({ updatedAt: -1 }).limit(50);


    const regex = new RegExp(q, 'i');
    criteria.push({ name: regex });
    criteria.push({ email: regex });
    criteria.push({ phone: regex });
    criteria.push({ notes: regex });
    criteria.push({ 'activities.notes': regex });


    const query = { $or: criteria };
    if (owner) query.owner = owner;


    return this.find(query).sort({ updatedAt: -1 }).limit(100);
};


module.exports = mongoose.model('Contact', contactSchema);