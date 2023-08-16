const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { v4: uuidv4 } = require("uuid");

const RoleSchema = new Schema({
  roleId: {
    type: String,
    required: true,
    unique: true,
  },
  projectId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Project",
  },
  roleName: {
    type: String,
    required: true,
  },
  internalRoleName: String,
  roleTypes: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "RoleType",
  },
  intendToPublishRole: {
    type: Boolean,
    default: true,
  },
  releaseRoleToBillbord: {
    type: Boolean,
    default: false,
  },
  payingRole: {
    type: Boolean,
    default: true,
  },
  roleRate: String,
  roleAgeInYear: {
    type: Boolean,
    default: true,
  },
  roleAgeFrom: Number,
  roleAgeTo: Number,
  roleGenderSpecified: {
    type: Boolean,
    default: false,
  },
  roleEthnicAppearanceSpecified: {
    type: Boolean,
    default: false,
  },
  roleEthnicity: String,
  noOfTalent: Number,
  roleDescription: String,
  slidesUrl: String,
  involveSexualSituations: {
    type: Boolean,
    default: false,
  },
  involveNudity: Boolean,
  showAuditionLocationToTalent: {
    type: Boolean,
    default: false,
  },
  auditionDateInRange: Boolean,
  additionalAuditionNotes: String,
  showWorkLocation: {
    type: Boolean,
    default: false,
  },
  workDateInRange: Boolean,
  workRequirements: String,
  submissionDueBy: Date,
  submissionNotes: String,
  askPhoto: Number,
  askVideo: Number,
  askAudio: Number,
});

RoleSchema.pre("save", function () {
  this.roleId = uuidv4();
});
module.exports = mongoose.model("Role", RoleSchema);
