import mongoose, { Schema, Document } from 'mongoose';

interface IReaction {
    reactionId: mongoose.Types.ObjectId;
    reactionBody: string;
    username: string;
    createdAt: Date;
}

interface IThought extends Document {
    thoughtText: string;
    createdAt: Date;
    username: string;
    reactions: IReaction[];
    reactionCount: number;
}

const ReactionSchema = new Schema<IReaction>({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp: Date) => timestamp.toLocaleString(),
    },
}, {
    toJSON: {
        getters: true,
    },
    id: false,
});

const ThoughtSchema = new Schema<IThought>({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp: Date) => timestamp.toLocaleString(),
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [ReactionSchema],
}, {
    toJSON: {
        virtuals: true,
        getters: true,
    },
    id: false,
});

// Virtual for reaction count
ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

export default mongoose.model<IThought>('Thought', ThoughtSchema);
