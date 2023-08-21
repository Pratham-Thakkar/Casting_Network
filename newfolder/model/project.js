const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectSchema = new Schema(
  {
    projectId: {
      type: String,
      required: true,
      unique: true,
    },
    createdBy: {
      type: String,
      required: true,
    },
    projectName: {
      type: String,
      required: true,
    },
    internalProjectName: String,
    projectType: {
      type: String,
      required: true,
    },
    union: {
      type: String,
      required: true,
    },
    projectDescription: String,
    showContactInfo: {
      type: Boolean,
      default: true,
    },
    showNetworkToTalent: {
      type: Boolean,
      default: true,
    },
    showCastingAssociateToTalent: {
      type: Boolean,
      default: true,
    },
    showCastingAssistantToTalent: {
      type: Boolean,
      default: true,
    },
    showContactNumberToTalent: {
      type: Boolean,
      default: true,
    },
    showContantEmailToTalent: {
      type: Boolean,
      default: true,
    },
    cdNameContactInfo: String,
    castingAssociateContactInfo: String,
    castingAssistantContactInfo: String,
    castingPhoneNumberContactInfo: String,
    castingEmailContactInfo: String,
    networkCreativeTeam: String,
    castingAssociateCreativeTeam: String,
    castingAssistantCreativeTeam: String,
    contactPhoneNumberCreativeTeam: String,
    contactEmailCreativeTeam: String,
    showAuditionLocationToTalent: {
      type: Boolean,
      default: false,
    },
    auditionDateInRange: Boolean,
    showWorkLocation: {
      type: Boolean,
      default: false,
    },
    workDateInRange: Boolean,
    projectSynopsis: String,
    projectAdditionalDetails: String,
    additionalFileLink: [String],
    published: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Project", ProjectSchema);
