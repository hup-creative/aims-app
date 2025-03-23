const mongoose = require('mongoose');

const MeetingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a meeting title'],
      trim: true,
      maxlength: [100, 'Title cannot be more than 100 characters']
    },
    date: {
      type: Date,
      required: [true, 'Please provide a meeting date'],
      default: Date.now
    },
    duration: {
      type: Number, // Duration in seconds
      default: 0
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    audioFile: {
      key: String, // S3 object key
      url: String,
      originalName: String,
      mimeType: String
    },
    status: {
      type: String,
      enum: ['pending', 'transcribing', 'summarizing', 'completed', 'failed'],
      default: 'pending'
    },
    transcription: {
      text: String,
      speakers: [
        {
          id: String,
          segments: [
            {
              start: Number,
              end: Number,
              text: String
            }
          ]
        }
      ],
      language: String,
      completedAt: Date
    },
    summary: {
      html: String,
      text: String,
      keyPoints: [String],
      actionItems: [String],
      completedAt: Date
    },
    sharedWith: [
      {
        email: String,
        sharedAt: {
          type: Date,
          default: Date.now
        }
      }
    ],
    tags: [String],
    processingError: String
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Create index for improved query performance
MeetingSchema.index({ user: 1, date: -1 });
MeetingSchema.index({ status: 1 });

module.exports = mongoose.model('Meeting', MeetingSchema);