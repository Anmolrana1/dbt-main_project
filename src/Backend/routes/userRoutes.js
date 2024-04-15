const express=require('express')
const router = express.Router();
const {GetUser,setSkill,getSkill,addProjectExperience,getProjectExperiences
,addCertificate,getCertificates,updateUser}=require('../controllers/userController')
const {approveCertificate,approveProject,getEmail,AddSkill,getAddedSkill}=require('../controllers/approverController')


router.post('/userprofile',GetUser)
router.post('/setSkill',setSkill)
router.post('/getSkill',getSkill)
router.post('/addProjectExperience',addProjectExperience)
router.post('/getProjectExperiences',getProjectExperiences)
router.post('/addCertificate',addCertificate)
router.post('/getCertificates',getCertificates)
router.post('/approveProject',approveProject)
router.post('/approveCertificate',approveCertificate)
router.post('/getEmail',getEmail)
router.post('/addSkill',AddSkill)
router.post('/getAddedSkill',getAddedSkill)
router.put('/updateUserProfile',updateUser)
module.exports = router;