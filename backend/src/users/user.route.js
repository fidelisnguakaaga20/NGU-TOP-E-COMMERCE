// const express = require('express');
// const User = require('./user.model');
// const generateToken = require('../middleware/generateToken'); /// use correct path/name
// const router = express.Router();

// // Register
// router.post('/register', async (req, res) => {
//   try {
//     const { username, email, password } = req.body;

//     /// basic guard
//     if (!username || !email || !password) {
//       return res.status(400).json({ error: 'username, email, password required' });
//     }

//     /// prevent duplicates
//     const exists = await User.findOne({ $or: [{ email }, { username }] });
//     if (exists) {
//       return res.status(409).json({ error: 'Email or username already exists' });
//     }

//     const user = new User({ username, email, password });
//     await user.save();

//     return res.status(201).json({ message: 'User registered successfully!' });
//   } catch (error) {
//     /// handle unique index error just in case
//     if (error?.code === 11000) {
//       return res.status(409).json({ error: 'Duplicate key (email/username)' });
//     }
//     console.error('REGISTER ERROR:', error);
//     return res.status(500).json({ error: error.message || 'Server error' });
//   }
// });

// // Login
// router.post('/login', async (req, res) => {
//   try {
//     console.log('LOGIN headers:', req.headers);   // debug
//     console.log('LOGIN body:', req.body);         // debug

//     const { email, password } = req.body || {};
//     if (!email || !password) {
//       return res.status(400).json({ message: 'email and password required' });
//     }

//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     const isMatch = await user.comparePassword(password);
//     if (!isMatch) return res.status(401).json({ message: 'Password not match' });

//     const token = await generateToken(user._id);
//     res.cookie('token', token, { httpOnly: true, secure: false, sameSite: 'Lax' });

//     return res.status(200).json({
//       message: 'Logged in successfully',
//       token,
//       user: {
//         _id: user._id,
//         email: user.email,
//         username: user.username,
//         role: user.role,
//         profileImage: user.profileImage,
//         bio: user.bio,
//         profession: user.profession,
//       },
//     });
//   } catch (error) {
//     console.error('LOGIN ERROR:', error);
//     return res.status(500).json({ error: error.message || 'Server error' });
//   }
// });


// // logout endpoint
// router.post('/logout', (req, res) => {
//   res.clearCookie('token');
//   res.status(200).send({message: 'Logged out successfully'})
// })

// // delete a user
// router.delete('/users/:id', async (req, res) => {
//   try {
//     const {id} = req.params;
//     const user = await User.findByIdAndDelete(id);
//     if(!user) {
//       return res.status(400).send({message: 'User not found'})
//     }
//     res.status(200).send({message: 'User deleted successfully'})
//   } catch (error) {
//     console.error('DELETING USER:', error);
//     return res.status(500).json({ error: error.message || 'Server error' });
//   }
// })

// // get all users
// router.get(`/users`, async (req, res) => {
//   try {
//     const users = await User.find({}, 'id email role').sort({createdAt: -1})
//     res.status(200).send(users)
//   } catch (error) {
//     console.error('FETCHING USERS:', error);
//     return res.status(500).json({ error: error.message || 'Server error' });
//   }
// })

// // update user role
// router.put('/users/:id', async (req, res) => {
//   try {
//     const {id} = req.params;
//     const {role} = req.body;
//     const user =await User.findByIdAndUpdate(id, {role}, {new: true});
//     if(!user) {
//       return res.status(404).send({message: 'User not found'})
//     }
//     res.status(200).send({message: 'User role updated successfully', user})

//   } catch (error) {
//     console.error('UPDATING USER ROLE:', error);
//     return res.status(500).json({ error: error.message || 'Updating user role' });
//   }
// })

// // edit or update profile
// router.patch('/edit-profile', async (req, res) => {
//   try {
//     const {userId, username, profileImage, bio, profession} = req.body;
//     if(!userId) {
//      return res.status(400).send({message: 'User ID is required'}) 
//     }
//     const user = await User.findById(userId);
//     if(!user){
//       return res.status(400).send({message: 'User not found'}) 
//     }
//     // update profile
//     if(username !== undefined) user.username = username;
    
//     if(profileImage !== undefined) user.profileImage = profileImage;

//     if(bio !== undefined) user.bio = bio;

//     if(profession !== undefined) user.profession = profession;

//     await user.save();
//     res.status(200).send({message: 'Profile updated successfully', user: {
//       _id: user._id,
//       email: user.email,
//       username: user.username,
//       role: user.role,
//       profileImage: user.profileImage,
//       bio: user.bio,
//       profession: user.profession
//     },
//   });

//   } catch (error) {
//      console.error('UPDATING USER PROFILE:', error);
//     return res.status(500).json({ error: error.message || 'Updating user profile' });
//   }
// })

// module.exports = router;

const express = require('express');
const User = require('./user.model');
const generateToken = require('../middleware/generateToken');
const router = express.Router();

const isProd = process.env.NODE_ENV === 'production';
const cookieOptions = {
  httpOnly: true,
  secure: isProd,                 // true on Render (HTTPS)
  sameSite: isProd ? 'None' : 'Lax', // cross-site requires 'None'
  path: '/',                      // important so clearCookie matches
  // maxAge: 7 * 24 * 60 * 60 * 1000, // optional
};

// -------- Register --------
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'username, email, password required' });
    }
    const exists = await User.findOne({ $or: [{ email }, { username }] });
    if (exists) return res.status(409).json({ error: 'Email or username already exists' });

    const user = new User({ username, email, password });
    await user.save();
    return res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    if (error?.code === 11000) return res.status(409).json({ error: 'Duplicate key (email/username)' });
    console.error('REGISTER ERROR:', error);
    return res.status(500).json({ error: error.message || 'Server error' });
  }
});

// -------- Login --------
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ message: 'email and password required' });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ message: 'Password not match' });

    const token = await generateToken(user._id);
    res.cookie('token', token, cookieOptions);

    return res.status(200).json({
      message: 'Logged in successfully',
      token, // optional to return
      user: {
        _id: user._id,
        email: user.email,
        username: user.username,
        role: user.role,
        profileImage: user.profileImage,
        bio: user.bio,
        profession: user.profession,
      },
    });
  } catch (error) {
    console.error('LOGIN ERROR:', error);
    return res.status(500).json({ error: error.message || 'Server error' });
  }
});

// -------- Logout --------
router.post('/logout', (_req, res) => {
  res.clearCookie('token', {
    path: '/',
    sameSite: cookieOptions.sameSite,
    secure: cookieOptions.secure,
    httpOnly: true,
  });
  res.status(200).json({ message: 'Logged out successfully' });
});

// -------- Admin/Profile utilities (unchanged) --------
router.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) return res.status(400).send({ message: 'User not found' });
    res.status(200).send({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('DELETING USER:', error);
    return res.status(500).json({ error: error.message || 'Server error' });
  }
});

router.get('/users', async (_req, res) => {
  try {
    const users = await User.find({}, 'id email role').sort({ createdAt: -1 });
    res.status(200).send(users);
  } catch (error) {
    console.error('FETCHING USERS:', error);
    return res.status(500).json({ error: error.message || 'Server error' });
  }
});

router.put('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    const user = await User.findByIdAndUpdate(id, { role }, { new: true });
    if (!user) return res.status(404).send({ message: 'User not found' });
    res.status(200).send({ message: 'User role updated successfully', user });
  } catch (error) {
    console.error('UPDATING USER ROLE:', error);
    return res.status(500).json({ error: error.message || 'Updating user role' });
  }
});

router.patch('/edit-profile', async (req, res) => {
  try {
    const { userId, username, profileImage, bio, profession } = req.body;
    if (!userId) return res.status(400).send({ message: 'User ID is required' });

    const user = await User.findById(userId);
    if (!user) return res.status(400).send({ message: 'User not found' });

    if (username !== undefined) user.username = username;
    if (profileImage !== undefined) user.profileImage = profileImage;
    if (bio !== undefined) user.bio = bio;
    if (profession !== undefined) user.profession = profession;

    await user.save();

    res.status(200).send({
      message: 'Profile updated successfully',
      user: {
        _id: user._id,
        email: user.email,
        username: user.username,
        role: user.role,
        profileImage: user.profileImage,
        bio: user.bio,
        profession: user.profession,
      },
    });
  } catch (error) {
    console.error('UPDATING USER PROFILE:', error);
    return res.status(500).json({ error: error.message || 'Updating user profile' });
  }
});

module.exports = router;
