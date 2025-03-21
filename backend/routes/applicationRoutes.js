const router = require('express').Router();
const auth = require('../middleware/auth');
const Application = require('../models/Application');
const Job = require('../models/Job');
const User = require('../models/User');

// Submit application
router.post('/', auth, async (req, res) => {
  try {
    const { jobId, resume, coverLetter } = req.body;
    
    // Check if job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Check if user has already applied
    const existingApplication = await Application.findOne({
      job: jobId,
      candidate: req.userId
    });

    if (existingApplication) {
      return res.status(400).json({ message: 'Already applied to this job' });
    }

    const application = new Application({
      job: jobId,
      candidate: req.userId,
      resume,
      coverLetter
    });

    await application.save();
    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get candidate's applications
router.get('/my-applications', auth, async (req, res) => {
  try {
    const applications = await Application.find({ candidate: req.userId })
      .populate('job')
      .sort('-createdAt');
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get applications for recruiter's jobs
router.get('/job-applications', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (user.role !== 'recruiter') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const jobs = await Job.find({ recruiter: req.userId });
    const jobIds = jobs.map(job => job._id);

    const applications = await Application.find({ job: { $in: jobIds } })
      .populate('job')
      .populate('candidate', 'fullName email')
      .sort('-createdAt');

    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update application status
router.patch('/:id/status', auth, async (req, res) => {
  try {
    const { status } = req.body;
    const application = await Application.findById(req.params.id)
      .populate('job');

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    // Verify recruiter owns the job
    if (application.job.recruiter.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    application.status = status;
    await application.save();

    res.json(application);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Schedule interview
router.patch('/:id/interview', auth, async (req, res) => {
  try {
    const { dateTime, location, type, notes } = req.body;
    const application = await Application.findById(req.params.id)
      .populate('job');

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    // Verify recruiter owns the job
    if (application.job.recruiter.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    application.interview = {
      scheduled: true,
      dateTime,
      location,
      type,
      notes
    };
    application.status = 'shortlisted';
    await application.save();

    res.json(application);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router; 