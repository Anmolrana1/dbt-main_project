const mongoose=require("mongoose");

//skills Schema
const addSkillSchema=new mongoose.Schema(
    {
        skillName:{type: String, required: true,unique:true}
    }
)

const skillSchema=new mongoose.Schema(
    {
        Empid: { type: String, required: true},
        skillName:{type: String, required: true},
        Proficiency:{type:String,required: true}
    }
)

//projec Schema
const projectExperienceSchema = new mongoose.Schema({
    Empid: { type: String, required: true},
    projectName: {
        type: String,
        required: true
    },
    projectType: {
        type: String,
        required: true
    },
    Tech_stack: [{
        type: String,
        required: true
    }],
    startDate: {
        type: String,
        required: true
    },
    endDate: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    Status:{type:String,required: true}
});


//certificate Schema
const certificateSchema = new mongoose.Schema({
    Empid: { type: String, required: true },
    certificateName: {
        type: String,
        required: true
    },
    issuingOrganization: {
        type: String,
        required: true
    },
    issueDate: {
        type: String,
        required: true
    }
    ,
    ExpireDate: {
        type: String,
        required: true
    },
    credentialID: {type:String,required: true},
    Status:{type:String,required: true}

});

skillSchema.index({ Empid: 1, skillName: 1 }, { unique: true });
const ProjectExperience = mongoose.model('ProjectExperience', projectExperienceSchema);
const skillDetails = mongoose.model("skillDetails", skillSchema);
const Certificate = mongoose.model('Certificate', certificateSchema);
const addSkill = mongoose.model('addSkill', addSkillSchema);
exports.modules = { skillDetails,ProjectExperience,Certificate,addSkill};

